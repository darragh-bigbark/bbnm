import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("document") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const fileName = file.name.toLowerCase();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 20MB" }, { status: 400 });
  }

  try {
    if (fileName.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.convertToHtml({ buffer });

      // Clean up mammoth output — remove empty paragraphs
      const content = result.value
        .replace(/<p><\/p>/g, "")
        .replace(/<p>\s*<\/p>/g, "")
        .trim();

      // Try to extract a title from the first <h1> if present
      const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const suggestedTitle = titleMatch
        ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
        : null;

      return NextResponse.json({ content, suggestedTitle });
    }

    if (fileName.endsWith(".pdf")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse/dist/pdf-parse/cjs/index.cjs");
      const data = await pdfParse(buffer);

      // Convert extracted plain text into HTML paragraphs
      const content = data.text
        .split(/\n{2,}/)
        .map((para: string) => para.replace(/\n/g, " ").trim())
        .filter((para: string) => para.length > 2)
        .map((para: string) => `<p>${para}</p>`)
        .join("\n");

      // Use the first non-empty line as a suggested title
      const firstLine = data.text
        .split("\n")
        .map((l: string) => l.trim())
        .find((l: string) => l.length > 3 && l.length < 150);

      return NextResponse.json({ content, suggestedTitle: firstLine ?? null });
    }

    return NextResponse.json(
      { error: "Only .docx and .pdf files are supported" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Document extraction error:", err);
    return NextResponse.json(
      { error: "Failed to extract content from the document. Please check the file and try again." },
      { status: 500 }
    );
  }
}
