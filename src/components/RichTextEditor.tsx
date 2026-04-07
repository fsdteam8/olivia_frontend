"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Quote,
  Image as ImageIcon,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Enter link");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-4 p-2 bg-slate-50 border-b border-slate-200">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </button>

        <button onClick={addLink}>
          <LinkIcon size={16} />
        </button>

        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </button>

        <button onClick={addImage}>
          <ImageIcon size={16} />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="p-4 min-h-[150px] focus:outline-none"
      />
    </div>
  );
}
