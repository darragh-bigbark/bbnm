"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

function ToolBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        padding: "0.25rem 0.55rem",
        background: active ? "var(--navy)" : "transparent",
        color: active ? "#fff" : "var(--navy)",
        border: "1px solid var(--border)",
        borderRadius: "0.35rem",
        cursor: "pointer",
        fontSize: "0.8rem",
        fontWeight: 700,
        lineHeight: 1.4,
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          flexWrap: "wrap",
          padding: "0.5rem 0.6rem",
          borderBottom: "1px solid var(--border)",
          background: "#f9fafb",
        }}
      >
        <ToolBtn
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </ToolBtn>
        <ToolBtn
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <em>I</em>
        </ToolBtn>
        <ToolBtn
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <s>S</s>
        </ToolBtn>
        <span style={{ width: "1px", background: "var(--border)", margin: "0 0.2rem" }} />
        <ToolBtn
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </ToolBtn>
        <ToolBtn
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          H3
        </ToolBtn>
        <span style={{ width: "1px", background: "var(--border)", margin: "0 0.2rem" }} />
        <ToolBtn
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          • List
        </ToolBtn>
        <ToolBtn
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          1. List
        </ToolBtn>
        <ToolBtn
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          ❝ Quote
        </ToolBtn>
        <ToolBtn
          title="Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          — HR
        </ToolBtn>
        <span style={{ width: "1px", background: "var(--border)", margin: "0 0.2rem" }} />
        <ToolBtn
          title="Add Link"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        >
          🔗 Link
        </ToolBtn>
        {editor.isActive("link") && (
          <ToolBtn
            title="Remove Link"
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            Unlink
          </ToolBtn>
        )}
        <span style={{ width: "1px", background: "var(--border)", margin: "0 0.2rem" }} />
        <ToolBtn
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↩
        </ToolBtn>
        <ToolBtn
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↪
        </ToolBtn>
      </div>

      {/* Editor */}
      <div style={{ background: "#fff", padding: "0.75rem 1rem" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
