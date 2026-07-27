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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create-blog`,
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
  const [authorName, setAuthorName] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");
  const [authorProfileImage, setAuthorProfileImage] = useState<File | null>(null);
  const [authorProfilePreview, setAuthorProfilePreview] = useState<string | null>(null);
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
      setAuthorName("");
      setAuthorDescription("");
      setAuthorProfileImage(null);
      setAuthorProfilePreview(null);
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

  const handleAuthorProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAuthorProfileImage(file);
    setAuthorProfilePreview(URL.createObjectURL(file));
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

    formData.append(
      "data",
      JSON.stringify({
        title,
        category,
        content,
        author: {
          name: authorName,
          description: authorDescription,
        },
      }),
    );

    if (thumbnail) {
      formData.append("thumbnailImage", thumbnail);
    }

    if (authorProfileImage) {
      formData.append("profileImage", authorProfileImage);
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

        <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <div>
              <p className="text-sm font-semibold text-[#004242]">Post details</p>
              <p className="mt-1 text-xs text-slate-500">Give your story a clear title, category, and cover image.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-700">Blog title <span className="text-red-500">*</span></Label>
              <Input placeholder="e.g. The Future of Solar" value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-[#004242]" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Category <span className="text-red-500">*</span></Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white shadow-sm focus:ring-[#004242]"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Expert Insights">Expert Insights</SelectItem>
                    <SelectItem value="Climate Careers">Climate Careers</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Toolkit">Toolkit</SelectItem>
                    <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Cover image</Label>
                <label className="group flex h-11 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-3 transition hover:border-[#004242] hover:bg-teal-50/40">
                  <ImageIcon className="h-4 w-4 text-[#004242]" />
                  <span className="min-w-0 flex-1 truncate text-xs text-slate-500 group-hover:text-[#004242]">{thumbnail?.name ?? "Upload a thumbnail"}</span>
                  <span className="text-xs font-semibold text-[#004242]">Browse</span>
                  <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
                </label>
              </div>
            </div>

            {thumbnailPreview && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2"><span className="text-xs font-medium text-slate-600">Cover preview</span><span className="text-xs text-slate-400">{thumbnail?.name}</span></div>
                <Image width={1200} height={675} src={thumbnailPreview} alt="Blog cover preview" className="aspect-[16/7] w-full object-cover" unoptimized />
              </div>
            )}
          </section>

          {/* Rich Text Editor */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
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
          </section>

          <section className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5 sm:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#004242]">Author details</p>
              <p className="mt-1 text-xs text-slate-500">Help readers know who wrote this article.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_180px]">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Author name</Label>
                <Input placeholder="e.g. John Doe" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="h-11 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-[#004242]" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Author description</Label>
                <Input placeholder="e.g. Climate researcher" value={authorDescription} onChange={(e) => setAuthorDescription(e.target.value)} className="h-11 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-[#004242]" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-700">Profile photo</Label>
                <label className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#7ca9a9] bg-white px-3 text-xs font-semibold text-[#004242] transition hover:bg-teal-50">
                  {authorProfileImage ? "Change photo" : "Upload photo"}
                  <input type="file" accept="image/*" onChange={handleAuthorProfileImage} className="hidden" />
                </label>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-xl border border-white bg-white/80 p-3">
              {authorProfilePreview ? (
                <Image width={112} height={112} src={authorProfilePreview} alt="Author profile preview" className="h-14 w-14 rounded-full border-2 border-teal-100 object-cover" unoptimized />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#004242] text-lg font-semibold text-white">{authorName.trim().slice(0, 1).toUpperCase() || "A"}</div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{authorName || "Author name"}</p>
                <p className="truncate text-xs text-slate-500">{authorDescription || "Author description"}</p>
              </div>
            </div>
          </section>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#004242] hover:bg-[#003333] text-white py-6 rounded-lg transition-colors"
            >
              {mutation.isPending ? "Submitting..." : "Submit Blog for Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;
