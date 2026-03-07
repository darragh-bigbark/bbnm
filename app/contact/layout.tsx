import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Big Bark News & Media — Ireland's dedicated canine news and media platform.",
  openGraph: { url: "https://bbnm.ie/contact" },
  alternates: { canonical: "https://bbnm.ie/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
