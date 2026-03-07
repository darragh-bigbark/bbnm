"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useState } from "react";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

// ── SVG icons ────────────────────────────────────────────────────────────────
const icons = {
  bold: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>,
  italic: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><line x1="19" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="20" x2="5" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="15" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  underline: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>,
  strike: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><path d="M16 6C16 6 14.5 4 12 4C9.5 4 7 5.5 7 8C7 11 10 12 12 12C14 12 17 13 17 16C17 18.5 14.5 20 12 20C9.5 20 8 18 8 18"/></svg>,
  bulletList: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>,
  orderedList: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold">1</text><text x="2" y="14" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold">2</text><text x="2" y="20" fill="currentColor" stroke="none" fontSize="7" fontWeight="bold">3</text></svg>,
  blockquote: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>,
  hr: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>,
  link: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  unlink: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="3" y1="3" x2="21" y2="21"/></svg>,
  alignLeft: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="15" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="15" y2="18"/></svg>,
  alignCenter: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="10" x2="18" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="6" y1="18" x2="18" y2="18"/></svg>,
  alignRight: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="9" y1="18" x2="21" y2="18"/></svg>,
  undo: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>,
  redo: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>,
  chevron: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
};

// ── Shared button style helpers ───────────────────────────────────────────────
const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  padding: "4px 7px",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: "3px",
  cursor: "pointer",
  color: "#374151",
  lineHeight: 1,
  transition: "background 0.1s, border-color 0.1s",
};
const btnActive: React.CSSProperties = {
  ...btnBase,
  background: "#dbeafe",
  borderColor: "#93c5fd",
  color: "#1d4ed8",
};

function Btn({ onClick, active, title, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button type="button" title={title} onClick={onClick} style={active ? btnActive : btnBase}
      onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.borderColor = "#d1d5db"; } }}
      onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: "1px", alignSelf: "stretch", background: "#d1d5db", margin: "2px 3px" }} />;
}

// ── Format dropdown ───────────────────────────────────────────────────────────
function FormatDropdown({ editor }: { editor: ReturnType<typeof useEditor> }) {
  const [open, setOpen] = useState(false);
  if (!editor) return null;

  const formats = [
    { label: "Paragraph", action: () => editor.chain().focus().setParagraph().run(), isActive: () => editor.isActive("paragraph") },
    { label: "Heading 1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.isActive("heading", { level: 1 }) },
    { label: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.isActive("heading", { level: 2 }) },
    { label: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => editor.isActive("heading", { level: 3 }) },
    { label: "Heading 4", action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), isActive: () => editor.isActive("heading", { level: 4 }) },
  ];

  const current = formats.find((f) => f.isActive())?.label ?? "Paragraph";

  const labelStyles: Record<string, React.CSSProperties> = {
    "Paragraph": { fontSize: "13px" },
    "Heading 1": { fontSize: "18px", fontWeight: 800 },
    "Heading 2": { fontSize: "16px", fontWeight: 700 },
    "Heading 3": { fontSize: "14px", fontWeight: 700 },
    "Heading 4": { fontSize: "13px", fontWeight: 700 },
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ ...btnBase, gap: "6px", minWidth: "120px", justifyContent: "space-between", border: "1px solid #d1d5db", background: "#fff", padding: "4px 8px" }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{current}</span>
        {icons.chevron}
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "2px", background: "#fff", border: "1px solid #d1d5db", borderRadius: "4px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "150px", overflow: "hidden" }}>
          {formats.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => { f.action(); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", background: f.isActive() ? "#eff6ff" : "transparent", border: "none", cursor: "pointer", color: f.isActive() ? "#1d4ed8" : "#374151", ...labelStyles[f.label] }}
              onMouseEnter={(e) => { if (!f.isActive()) e.currentTarget.style.background = "#f9fafb"; }}
              onMouseLeave={(e) => { if (!f.isActive()) e.currentTarget.style.background = "transparent"; }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: "6px", overflow: "hidden", background: "#fff" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px", padding: "6px 8px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>

        {/* Format dropdown */}
        <FormatDropdown editor={editor} />
        <Sep />

        {/* Inline formatting */}
        <Btn title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><strong style={{ fontSize: "13px" }}>B</strong></Btn>
        <Btn title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><em style={{ fontSize: "13px" }}>I</em></Btn>
        <Btn title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><span style={{ fontSize: "13px", textDecoration: "underline" }}>U</span></Btn>
        <Btn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><s style={{ fontSize: "13px" }}>S</s></Btn>
        <Sep />

        {/* Alignment */}
        <Btn title="Align Left" onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })}>{icons.alignLeft}</Btn>
        <Btn title="Align Center" onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })}>{icons.alignCenter}</Btn>
        <Btn title="Align Right" onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })}>{icons.alignRight}</Btn>
        <Sep />

        {/* Lists */}
        <Btn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>{icons.bulletList}</Btn>
        <Btn title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>{icons.orderedList}</Btn>
        <Btn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>{icons.blockquote}</Btn>
        <Btn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>{icons.hr}</Btn>
        <Sep />

        {/* Link */}
        <Btn
          title="Insert Link"
          active={editor.isActive("link")}
          onClick={() => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = prompt("Enter URL:", prev ?? "https://");
            if (url === null) return;
            if (url === "") { editor.chain().focus().unsetLink().run(); return; }
            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          {icons.link}
          <span style={{ fontSize: "12px" }}>Link</span>
        </Btn>
        {editor.isActive("link") && (
          <Btn title="Remove Link" onClick={() => editor.chain().focus().unsetLink().run()}>
            {icons.unlink}
            <span style={{ fontSize: "12px" }}>Unlink</span>
          </Btn>
        )}
        <Sep />

        {/* History */}
        <Btn title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}>{icons.undo}</Btn>
        <Btn title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()}>{icons.redo}</Btn>
      </div>

      {/* Editor area */}
      <div style={{ background: "#fff", padding: "12px 16px", minHeight: "220px" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
