"use client";

import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { ResumeNameValidationSchema } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { createResume } from "@/lib/actions/resume.actions";
import { toast } from "../ui/use-toast";
import { useRouter } from "next-nprogress-bar";

const AddResume = ({ userId }: { userId: string | undefined }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ResumeNameValidationSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: z.infer<typeof ResumeNameValidationSchema>) => {
    if (userId === undefined) return;
    setIsLoading(true);
    const uuid = uuidv4();
    const result = await createResume({ resumeId: uuid, userId, title: values.name });
    if (result.success) {
      form.reset();
      const resume = JSON.parse(result.data!);
      router.push(`/my-resume/${resume.resumeId}/edit`);
    } else {
      setIsLoading(false);
      toast({ title: "Something went wrong.", description: result?.error, variant: "destructive", className: "bg-white" });
    }
  };

  return (
    <>
      <div
        className="relative aspect-[1/1.2] border-2 border-dashed border-violet-200 flex flex-col items-center justify-center gap-2 bg-violet-50/50 rounded-2xl hover:scale-105 hover:shadow-md hover:border-violet-400 hover:bg-violet-50 transition-all cursor-pointer group"
        onClick={() => userId && setOpenDialog(true)}
      >
        <div className="w-10 h-10 rounded-full bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-colors">
          <Plus className="text-violet-600 w-5 h-5" />
        </div>
        <p className="text-xs font-medium text-violet-500">New Resume</p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Name Your Resume</DialogTitle>
            <DialogDescription className="text-gray-500">
              Give your resume a title so you can find it easily later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="mt-2 mb-3 text-gray-700 font-semibold text-sm">Resume Title</p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Full Stack Developer Resume"
                        className="no-focus rounded-lg border-violet-200 focus:border-violet-400"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setOpenDialog(false)} className="btn-ghost" disabled={isLoading}>
                  Cancel
                </button>
                <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-lg">
                  {isLoading ? (<><Loader2 size={16} className="animate-spin" /> &nbsp; Creating</>) : "Create Resume"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddResume;
