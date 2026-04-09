"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  List,
  Link,
  Quote,
  Image as ImageIcon,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading2,
  Heading3,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

interface BlogPayload {
  formData: FormData;
  token: string;
}

const createBlog = async ({ formData, token }: BlogPayload) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/apply-blog/submit-blog-idea`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create blog");
  }

  return data;
};

// ─── Toolbar ────────────────────────────────────────────────────────────────
const ToolbarButton = ({
  onClick,
  title,
  children,
  active = false,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${
      active ? "bg-slate-200 text-[#004242]" : "text-slate-600"
    }`}
  >
    {children}
  </button>
);

const ToolbarDivider = () => (
  <div className="w-px h-5 bg-slate-200 mx-1 self-center" />
);

// ─── Rich Text Editor ───────────────────────────────────────────────────────
interface RichEditorProps {
  onChange: (html: string) => void;
  onImageFilesChange: (files: File[]) => void;
}

const RichTextEditor = ({ onChange, onImageFilesChange }: RichEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageFilesRef = useRef<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exec = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    // eslint-disable-next-line react-hooks/immutability
    triggerChange();
  }, []);

  const triggerChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      exec(
        "insertHTML",
        `<img src="${base64}" alt="blog-image" class="max-w-full rounded-lg my-2" data-filename="${file.name}" />`,
      );
    };
    reader.readAsDataURL(file);
    imageFilesRef.current = [...imageFilesRef.current, file];
    onImageFilesChange(imageFilesRef.current);
    e.target.value = "";
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const insertBlockquote = () => {
    exec("formatBlock", "<blockquote>");
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-slate-50 border-b border-slate-200">
        {/* Text style */}
        <ToolbarButton onClick={() => exec("bold")} title="Bold">
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="Italic">
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} title="Underline">
          <Underline size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("strikeThrough")}
          title="Strikethrough"
        >
          <Strikethrough size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => exec("formatBlock", "<h2>")}
          title="Heading 2"
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("formatBlock", "<h3>")}
          title="Heading 3"
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => exec("insertUnorderedList")}
          title="Bullet List"
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Alignment */}
        <ToolbarButton onClick={() => exec("justifyLeft")} title="Align Left">
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("justifyCenter")}
          title="Align Center"
        >
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} title="Align Right">
          <AlignRight size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link & Quote */}
        <ToolbarButton onClick={insertLink} title="Insert Link">
          <Link size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={insertBlockquote} title="Blockquote">
          <Quote size={15} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Image Upload */}
        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          title="Insert Image"
        >
          <ImageIcon size={15} />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={triggerChange}
        className="min-h-[200px] p-4 text-sm text-slate-700 focus:outline-none
          prose prose-sm max-w-none
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#004242] [&_h2]:mt-4 [&_h2]:mb-2
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#004242] [&_h3]:mt-3 [&_h3]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#004242] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_a]:text-[#004242] [&_a]:underline
          [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2
        "
        data-placeholder="Write your blog content here..."
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

// ─── CreateBlogModal ─────────────────────────────────────────────────────────
const CreateBlogModal = ({ isOpen, setOpen }: Props) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [_contentImages, setContentImages] = useState<File[]>([]);

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      toast.success(data.message || "Blog created successfully");
      setOpen(false);
      setTitle("");
      setCategory("");
      setContent("");
      setThumbnail(null);
      setThumbnailPreview(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create blog");
    },
  });

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    if (!title.trim()) {
      toast.error("Blog title is required");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (!content.trim() || content === "<br>") {
      toast.error("Blog content is required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("isPublished", "true");

    if (thumbnail) {
      formData.append("thumbnailImage", thumbnail);
    }

    mutation.mutate({ formData, token });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-0 border-none">
        <div className="p-8 text-center border-b border-slate-50">
          <DialogTitle className="text-[#004242] text-3xl font-normal mb-2">
            Create a Blog
          </DialogTitle>
          <DialogDescription className="text-[#729094] text-sm font-medium">
            Share your thoughts and insights on climate change and
            sustainability.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6 p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-[#004242] text-xs font-medium">
                Blog Title *
              </Label>
              <Input
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <Label className="text-[#004242] text-xs font-medium">
                  Category *
                </Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="rounded-lg w-full border-slate-200">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Expert Insights">
                      Expert Insights
                    </SelectItem>
                    <SelectItem value="Climate Careers">
                      Climate Careers
                    </SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Toolkit">Toolkit</SelectItem>
                    <SelectItem value="Renewable Energy">
                      Renewable Energy
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label className="text-[#004242] text-xs font-medium">
                  Thumbnail Image
                </Label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="border border-dashed border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-500 hover:border-[#004242] hover:text-[#004242] transition-colors text-center">
                      {thumbnail ? thumbnail.name : "Click to upload image"}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnail}
                      className="hidden"
                    />
                  </label>
                  {thumbnailPreview && (
                    <Image
                      width={40}
                      height={40}
                      src={thumbnailPreview}
                      alt="thumbnail preview"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-4 p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-[#004242] text-sm font-medium">
                Blog Content *
              </h3>
              <span className="text-xs text-slate-400">
                Use the toolbar to format text and insert images
              </span>
            </div>

            <RichTextEditor
              onChange={setContent}
              onImageFilesChange={setContentImages}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg transition-colors"
            >
              {mutation.isPending ? "Submitting..." : "Publish Blog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;
