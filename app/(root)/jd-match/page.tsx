import Header from "@/components/layout/Header";
import JDMatchScorer from "@/components/layout/JDMatchScore";
import PageWrapper from "@/components/common/PageWrapper";

export default function JDMatchPage() {
  return (
    <PageWrapper>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              ✦ AI-Powered
            </div>
            <h1 className="text-3xl font-bold text-gray-900">JD Match Scorer</h1>
            <p className="text-gray-500 mt-2">
              Paste a job description and your resume to get an ATS match score, missing keywords, and actionable suggestions.
            </p>
          </div>
          <JDMatchScorer />
        </div>
      </div>
    </PageWrapper>
  );
}