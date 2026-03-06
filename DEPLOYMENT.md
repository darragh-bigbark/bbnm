# Deploying BBNM to a DigitalOcean Droplet

**Stack:** Next.js 16 · SQLite (Prisma 7 + better-sqlite3) · NextAuth v4 · Mailgun EU · Node.js · PM2 · Nginx · Certbot

---

## Table of Contents

1. [Create & configure the Droplet](#1-create--configure-the-droplet)
2. [Point your domain to the Droplet](#2-point-your-domain-to-the-droplet)
3. [Initial server setup](#3-initial-server-setup)
4. [Install Node.js](#4-install-nodejs)
5. [Clone the repo](#5-clone-the-repo)
6. [Configure environment variables](#6-configure-environment-variables)
7. [Install dependencies & build](#7-install-dependencies--build)
8. [Run database migrations](#8-run-database-migrations)
9. [Run the app with PM2](#9-run-the-app-with-pm2)
10. [Configure Nginx as a reverse proxy](#10-configure-nginx-as-a-reverse-proxy)
11. [Enable HTTPS with Certbot](#11-enable-https-with-certbot)
12. [Deploying updates](#12-deploying-updates)
13. [SQLite backups](#13-sqlite-backups)
14. [Firewall reference](#14-firewall-reference)

---

## 1. Create & configure the Droplet

1. Log in to [cloud.digitalocean.com](https://cloud.digitalocean.com).
2. Click **Create → Droplets**.
3. Choose the following settings:
   - **Image:** Ubuntu 24.04 LTS
   - **Plan:** Basic — at minimum the **$6/mo (1 GB RAM / 1 vCPU / 25 GB SSD)** plan. Recommend **$12/mo (2 GB / 1 vCPU)** for a comfortable Next.js build.
   - **Region:** Choose the one closest to your users (e.g. Amsterdam for Ireland).
   - **Authentication:** SSH keys (add your public key). Avoid password auth.
4. Click **Create Droplet** and note the public IP address.

---

## 2. Point your domain to the Droplet

In your domain registrar's DNS settings for **bbnm.ie**, add:

| Type | Name | Value               | TTL  |
|------|------|---------------------|------|
| A    | @    | `<your-droplet-ip>` | 3600 |
| A    | www  | `<your-droplet-ip>` | 3600 |

DNS propagation can take a few minutes to a few hours. Verify with:

```bash
dig bbnm.ie +short
```

---

## 3. Initial server setup

SSH into your Droplet as root:

```bash
ssh root@<your-droplet-ip>
```

Create a non-root user and grant sudo access:

```bash
adduser deploy
usermod -aG sudo deploy
```

Copy your SSH key to the new user:

```bash
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

Log out, then reconnect as `deploy` for all remaining steps:

```bash
ssh deploy@<your-droplet-ip>
```

Update the system and install essentials:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl unzip
```

---

## 4. Install Node.js

Install Node.js 20 LTS via NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node -v   # v20.x.x
npm -v
```

Install PM2 globally to manage the Next.js process:

```bash
sudo npm install -g pm2
```

---

## 5. Clone the repo

```bash
cd /home/deploy
git clone https://github.com/darragh-bigbark/bbnm.git bbnm-site
cd bbnm-site
```

---

## 6. Configure environment variables

Create the production `.env` file. **Never commit this file to git.**

```bash
nano .env
```

Paste the following, filling in every value:

```env
# App
NODE_ENV=production
NEXTAUTH_URL=https://bbnm.ie
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Database — absolute path to the SQLite file
DATABASE_URL=file:/home/deploy/bbnm-data/prod.db

# Mailgun (EU region)
MAILGUN_API_KEY=<your-mailgun-api-key>
MAILGUN_DOMAIN=<your-mailgun-sending-domain>
MAILGUN_FROM=<your-from-address>
```

Generate `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

Create the persistent data directory for the SQLite database:

```bash
mkdir -p /home/deploy/bbnm-data
```

> **Why a separate directory?** Keeping the database outside the app folder means you can delete and re-clone the repo without touching your production data.

---

## 7. Install dependencies & build

```bash
npm install
npm run build
```

This compiles TypeScript, generates the Prisma client, and bundles all assets. It can take a minute or two on a small Droplet.

---

## 8. Run database migrations

Apply all Prisma migrations to the production database:

```bash
npx prisma migrate deploy
```

This creates the SQLite file at the `DATABASE_URL` path (if it doesn't exist yet) and runs every migration in `prisma/migrations/` in order.

Verify the file was created:

```bash
ls -lh /home/deploy/bbnm-data/prod.db
```

> **Do not run `prisma migrate dev` in production.** Always use `prisma migrate deploy`.

---

## 9. Run the app with PM2

Start the Next.js production server on port 3000, managed by PM2:

```bash
pm2 start npm --name "bbnm" -- start
```

Check it's running:

```bash
pm2 status
pm2 logs bbnm --lines 50
```

Save the process list and configure PM2 to auto-start on reboot:

```bash
pm2 save
pm2 startup
```

The `pm2 startup` command will print a `sudo` command — copy and run it exactly as printed.

---

## 10. Configure Nginx as a reverse proxy

Create the Nginx site config:

```bash
sudo nano /etc/nginx/sites-available/bbnm.ie
```

Paste the following:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name bbnm.ie www.bbnm.ie;

    # Allow large uploads (e.g. images)
    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/bbnm.ie /etc/nginx/sites-enabled/
sudo nginx -t          # must say "syntax is ok"
sudo systemctl reload nginx
```

At this point `http://bbnm.ie` should serve your app. HTTPS comes next.

---

## 11. Enable HTTPS with Certbot

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain and install the SSL certificate. Certbot will also automatically update your Nginx config to handle HTTPS and the HTTP→HTTPS redirect:

```bash
sudo certbot --nginx -d bbnm.ie -d www.bbnm.ie
```

Follow the prompts. When asked about redirects, choose **option 2 (redirect all HTTP to HTTPS)**.

Certbot sets up auto-renewal via a systemd timer. Verify it:

```bash
sudo systemctl status certbot.timer
```

Test renewal without actually renewing:

```bash
sudo certbot renew --dry-run
```

Your site is now live and secured at **https://bbnm.ie**.

---

## 12. Deploying updates

Every time you push code changes and want to deploy:

```bash
ssh deploy@<your-droplet-ip>
cd /home/deploy/bbnm-site

git pull origin main
npm install                  # only if dependencies changed
npm run build
npx prisma migrate deploy    # only if there are new migrations
pm2 restart bbnm
```

PM2 restarts the process gracefully. Nginx keeps serving requests during the brief restart (usually under 2 seconds).

---

## 13. SQLite backups

The entire database is a single file. Back it up with a daily cron job.

```bash
crontab -e
```

Add this line to back up at 2am and keep only the last 14 daily backups:

```cron
0 2 * * * cp /home/deploy/bbnm-data/prod.db /home/deploy/bbnm-data/prod-$(date +\%Y\%m\%d).db && ls -t /home/deploy/bbnm-data/prod-*.db | tail -n +15 | xargs rm -f
```

For offsite backups, install `s3cmd` and sync to DigitalOcean Spaces or any S3-compatible bucket.

---

## 14. Firewall reference

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # opens ports 80 and 443
sudo ufw enable
sudo ufw status
```

Port 3000 (the Next.js process) is **not** opened publicly — all traffic goes through Nginx.

---

## Environment variable reference

| Variable          | Description                                 | Example                                  |
|-------------------|---------------------------------------------|------------------------------------------|
| `NODE_ENV`        | Must be `production`                        | `production`                             |
| `NEXTAUTH_URL`    | Full public URL of the site                 | `https://bbnm.ie`                        |
| `NEXTAUTH_SECRET` | Random secret for JWT signing (≥32 chars)   | output of `openssl rand -base64 32`      |
| `DATABASE_URL`    | Absolute path to the SQLite file            | `file:/home/deploy/bbnm-data/prod.db`    |
| `MAILGUN_API_KEY` | Mailgun API key                             | `key-...`                                |
| `MAILGUN_DOMAIN`  | Mailgun sending domain                      | `mg.bbnm.ie`                             |
| `MAILGUN_FROM`    | From address for outgoing mail              | `hello@bbnm.ie`                          |

---

## Quick-reference commands

```bash
pm2 status                   # check app status
pm2 logs bbnm                # tail live logs
pm2 restart bbnm             # restart after deployment
sudo systemctl reload nginx  # reload Nginx config
sudo nginx -t                # test Nginx config syntax
npx prisma migrate deploy    # apply pending DB migrations
```
