import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const { name, email, subject, service, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const serviceRow = service
    ? `<tr><td style="padding:6px 0;color:#888;width:140px;vertical-align:top">Service of Interest</td><td style="padding:6px 0;color:#1a1a1a;font-weight:600">${service}</td></tr>`
    : "";
  const serviceText = service ? `Service of Interest: ${service}\n` : "";

  try {
    // Confirmation to the sender
    await sendEmail({
      to: email,
      subject: `Thanks for getting in touch — Big Bark News & Media`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#1B3A6B;padding:32px 24px;text-align:center;border-radius:8px 8px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">Big Bark News &amp; Media</h1>
          </div>
          <div style="background:#fff;padding:32px 24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <h2 style="color:#1B3A6B;margin:0 0 16px">Thanks for getting in touch, ${name}!</h2>
            <p style="color:#555;line-height:1.6;margin:0 0 24px">
              We've received your message and will get back to you as soon as possible.
              Here's a summary of what you sent us:
            </p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#888;width:140px;border-bottom:1px solid #e5e7eb">Subject</td>
                <td style="padding:10px 14px;color:#1a1a1a;font-weight:600;border-bottom:1px solid #e5e7eb">${subject}</td>
              </tr>
              ${service ? `<tr><td style="padding:10px 14px;color:#888;width:140px;border-bottom:1px solid #e5e7eb">Service</td><td style="padding:10px 14px;color:#1a1a1a;font-weight:600;border-bottom:1px solid #e5e7eb">${service}</td></tr>` : ""}
              <tr>
                <td style="padding:10px 14px;color:#888;vertical-align:top">Message</td>
                <td style="padding:10px 14px;color:#1a1a1a;white-space:pre-wrap">${message}</td>
              </tr>
            </table>
            <p style="color:#555;font-size:14px;margin:0 0 8px">In the meantime, you can explore our content at <a href="https://bbnm.ie" style="color:#1B3A6B;font-weight:600">bbnm.ie</a>.</p>
            <p style="color:#999;font-size:12px;margin:24px 0 0;border-top:1px solid #e5e7eb;padding-top:16px">
              Big Bark News &amp; Media · Ireland&apos;s Canine Media Platform · <a href="https://bbnm.ie" style="color:#999">bbnm.ie</a>
            </p>
          </div>
        </div>
      `,
      text: `Hi ${name},\n\nThanks for getting in touch with Big Bark News & Media. We've received your message and will get back to you shortly.\n\nYour submission:\nSubject: ${subject}\n${serviceText}Message:\n${message}\n\n— Big Bark News & Media\nhttps://bbnm.ie`,
    });

    // Notification to the team
    await sendEmail({
      to: "hello@bbnm.ie",
      subject: `New contact form submission: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#1B3A6B;padding:24px;border-radius:8px 8px 0 0">
            <h2 style="color:#fff;margin:0;font-size:18px">New Contact Form Submission</h2>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden">
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#888;width:140px;border-bottom:1px solid #e5e7eb">From</td>
                <td style="padding:10px 14px;color:#1a1a1a;font-weight:600;border-bottom:1px solid #e5e7eb">${name}</td>
              </tr>
              <tr style="background:#fff">
                <td style="padding:10px 14px;color:#888;border-bottom:1px solid #e5e7eb">Email</td>
                <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb"><a href="mailto:${email}" style="color:#1B3A6B;font-weight:600">${email}</a></td>
              </tr>
              <tr style="background:#f9fafb">
                <td style="padding:10px 14px;color:#888;border-bottom:1px solid #e5e7eb">Subject</td>
                <td style="padding:10px 14px;color:#1a1a1a;font-weight:600;border-bottom:1px solid #e5e7eb">${subject}</td>
              </tr>
              ${serviceRow}
              <tr style="background:#fff">
                <td style="padding:10px 14px;color:#888;vertical-align:top">Message</td>
                <td style="padding:10px 14px;color:#1a1a1a;white-space:pre-wrap">${message}</td>
              </tr>
            </table>
            <p style="margin:16px 0 0"><a href="mailto:${email}" style="background:#1B3A6B;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;display:inline-block;font-size:14px">Reply to ${name}</a></p>
          </div>
        </div>
      `,
      text: `New contact form submission\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n${serviceText}\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form email error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
