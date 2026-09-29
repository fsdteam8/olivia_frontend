"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PartnerCourse } from "./types";

interface DeleteCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: PartnerCourse | null;
  onDeleted: (courseId: string) => void;
  token?: string;
}

export default function DeleteCourseDialog({
  isOpen,
  onClose,
  course,
  onDeleted,
  token,
}: DeleteCourseDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!course) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/education-partner/courses/${course._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete course");
      }

      toast.success(data.message || "Course deleted successfully");
      onDeleted(course._id);
      onClose();
    } catch (err: any) {
      console.error("Delete course error:", err);
      toast.error(err.message || "Something went wrong while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[460px] p-6 rounded-2xl bg-white">
        <DialogHeader className="text-left space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#181919]">
            Delete Course Listing?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-gray-900">&quot;{course.title}&quot;</span>?
            This action cannot be undone and will remove the course from the directory.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-row items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
            className="rounded-xl px-5 h-11 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="rounded-xl px-5 h-11 bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-sm"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete Course"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
