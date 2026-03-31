"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-3 bg-white">
      <div className="flex gap-2 mb-3 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded"
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 border rounded"
        >
          Numbered List
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[150px]" />
    </div>
  );
}