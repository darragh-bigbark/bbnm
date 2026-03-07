import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Story",
  description: "Submit your news, press release or event to Big Bark News & Media — Ireland's dedicated canine news platform.",
  openGraph: { url: "https://bbnm.ie/submit" },
  alternates: { canonical: "https://bbnm.ie/submit" },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
