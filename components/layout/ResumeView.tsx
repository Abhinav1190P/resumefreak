"use client";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { FormProvider, useFormContext } from "@/lib/context/FormProvider";
import { RWebShare } from "react-web-share";
import React from "react";
import ResumePreview from "@/components/layout/my-resume/ResumePreview";
import { usePathname } from "next/navigation";
import PageWrapper from "@/components/common/PageWrapper";
import { DownloadIcon, Share2Icon } from "lucide-react";

const FinalResumeView = ({ params, isOwnerView }: { params: { id: string }; isOwnerView: boolean }) => {
  const path = usePathname();
  const { formData } = useFormContext();

  const handleDownload = () => { window.print(); };

  return (
    <PageWrapper>
      <FormProvider params={params}>
        <div id="no-print" className="bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/30 min-h-screen">
          <Header />
          <div className="my-10 mx-6 md:mx-20 lg:mx-36 text-center">
            {isOwnerView ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">Your resume is ready! 🎉</h2>
                <p className="text-gray-500 mt-2">Download it as PDF or share the link directly with recruiters.</p>
                <p className="text-xs text-gray-400 mt-1">Tip: Set margins to none and enable background graphics when printing.</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                <p className="text-gray-500 mt-2">You are viewing someone's shared resume.</p>
              </>
            )}
            <div className="flex max-sm:flex-col justify-center gap-4 my-8">
              <Button
                className="flex px-10 py-5 gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={handleDownload}
              >
                <DownloadIcon className="size-5" /> Download PDF
              </Button>
              <RWebShare
                data={{ text: "Check out my resume!", url: `${process.env.BASE_URL}/${path}`, title: `${formData?.firstName} ${formData?.lastName}'s Resume` }}
                onClick={() => console.log("Shared!")}
              >
                <Button className="flex px-10 py-5 gap-2 rounded-xl bg-white border border-violet-200 hover:bg-violet-50 text-violet-700 shadow-sm transition-all">
                  <Share2Icon className="size-5" /> Share Link
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="px-10 pt-4 pb-16 max-sm:px-5 max-sm:pb-8 print:p-0">
          <div id="print-area"><ResumePreview /></div>
        </div>
      </FormProvider>
    </PageWrapper>
  );
};

export default FinalResumeView;
