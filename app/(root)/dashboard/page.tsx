import PageWrapper from "@/components/common/PageWrapper";
import DashboardCards from "@/components/layout/DashboardCards";
import Header from "@/components/layout/Header";
import { Sparkles } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-6 mt-10 rounded-3xl border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-xl md:mx-20 lg:mx-36">
          <div className="flex justify-center">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-50 to-cyan-50 px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-slate-900">
                Resume Management Hub
              </span>
            </div>
          </div>

          <h1 className="text-center text-4xl font-black text-slate-900 md:text-5xl">
            Your Resume
            <span className="block bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-600">
            Create, manage, and share professional resumes with AI-powered
            assistance. Everything you need is organized in one place.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-10 px-6 md:px-16 lg:px-32 xl:px-48">
        <DashboardCards />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;