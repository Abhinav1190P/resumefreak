"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, MoreVertical, FileText } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { deleteResume } from "@/lib/actions/resume.actions";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";

const ResumeCard = ({ resume, refreshResumes }: { resume: any; refreshResumes: () => void }) => {
  if (!resume) {
    return (
      <div className="!bg-gray-100/60 relative aspect-[1/1.2] rounded-2xl shadow-sm flex flex-col hover:scale-105 transition-all skeleton">
        <div className="flex-1"></div>
        <div className="border-0 p-3 flex justify-between bg-white/40 rounded-b-2xl">‎ </div>
      </div>
    );
  }

  const router = useRouter();
  const pathname = usePathname();
  const myResume = JSON.parse(resume);
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    setIsLoading(true);
    const result = await deleteResume(myResume.resumeId, pathname);
    setIsLoading(false);
    setOpenAlert(false);
    if (result.success) {
      toast({ title: "Deleted.", description: "Resume deleted successfully.", className: "bg-white" });
      refreshResumes();
    } else {
      toast({ title: "Something went wrong.", description: result?.error, variant: "destructive", className: "bg-white" });
    }
  };

  return (
    <div className="relative aspect-[1/1.2] flex flex-col hover:scale-105 transition-all group">
      <Link href={"/my-resume/" + myResume.resumeId + "/view"} className="flex-grow">
        <div
          className="rounded-t-2xl border-t-4 h-full bg-gradient-to-b from-violet-50 via-indigo-50 to-purple-50 flex items-center justify-center"
          style={{ borderColor: myResume?.themeColor || "#7c3aed" }}
        >
          <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-60 transition-opacity">
            <FileText className="w-10 h-10 text-violet-400" />
          </div>
        </div>
      </Link>

      <div className="border border-t-0 p-3 flex justify-between items-center bg-white rounded-b-2xl shadow-sm">
        <h2 className="text-xs font-semibold text-gray-700 mr-2 block whitespace-nowrap overflow-hidden text-ellipsis">
          {myResume.title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-700" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl">
            <DropdownMenuItem onClick={() => router.push("/my-resume/" + myResume.resumeId + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/my-resume/" + myResume.resumeId + "/view")}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)} disabled={isLoading} className="no-focus rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={isLoading} className="bg-red-500 hover:bg-red-600 rounded-lg">
              {isLoading ? (<><Loader2 size={16} className="animate-spin" /> Deleting</>) : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeCard;
