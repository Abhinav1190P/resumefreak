"use client";

import Header from "@/components/layout/Header";
import { useUser } from "@clerk/nextjs";
import {
  AtomIcon,
  Edit,
  Share2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7c3aed30,transparent_50%)]" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

        <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-purple-500/20 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-semibold text-slate-900">
              AI Powered Resume Builder
            </span>
          </div>

          <h1 className="max-w-6xl text-5xl font-black leading-tight text-black drop-shadow-sm md:text-7xl">
          Build Professional
          <span className="block bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
            Resumes In Minutes
          </span>
        </h1>

          <p className="mt-8 max-w-2xl text-lg text-gray-400 md:text-xl">
            Create ATS-friendly resumes with AI assistance. Stand out from
            thousands of applicants and land more interviews.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-up"}
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
            >
              Start Building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#learn-more"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[1.5px] transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500" />

              <div className="relative rounded-xl bg-white px-8 py-4">
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600 bg-clip-text font-bold text-transparent">
                  Learn More
                </span>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-cyan-400">10K+</h3>
              <p className="text-gray-500">Resumes Created</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-fuchsia-400">95%</h3>
              <p className="text-gray-500">ATS Friendly</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-purple-400">24/7</h3>
              <p className="text-gray-500">AI Assistance</p>
            </div>
          </div>
        </div>
      </section>

    {/* FEATURES + CTA */}
<div className="relative mt-20 overflow-hidden bg-gradient-to-br from-[#080810] via-[#121225] to-[#1b103d]">
  {/* Glow Effects */}
  <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />
  <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

  {/* FEATURES */}
  <section
    id="learn-more"
    className="relative mx-auto max-w-7xl px-6 py-24"
  >
    <div className="text-center">
      <h2 className="text-5xl font-bold text-white">
        How It
        <span className="ml-3 bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          Works
        </span>
      </h2>

      <p className="mt-4 text-lg text-gray-300">
        Create a job-winning resume in three simple steps.
      </p>
    </div>

    <div className="mt-20 grid gap-8 lg:grid-cols-3">
      {/* Card 1 */}
      <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20">
          <AtomIcon className="h-7 w-7 text-purple-400" />
        </div>

        <h3 className="text-2xl font-bold text-white">
          Choose Your Style
        </h3>

        <p className="mt-4 text-gray-300">
          Select colors and customize the appearance of your resume with a
          clean professional design.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/20">
          <Edit className="h-7 w-7 text-cyan-400" />
        </div>

        <h3 className="text-2xl font-bold text-white">
          AI Assisted Writing
        </h3>

        <p className="mt-4 text-gray-300">
          Enter your details and let AI help generate professional content
          for experience, projects, and skills.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-fuchsia-500/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-fuchsia-500/20">
          <Share2 className="h-7 w-7 text-fuchsia-400" />
        </div>

        <h3 className="text-2xl font-bold text-white">
          Share & Download
        </h3>

        <p className="mt-4 text-gray-300">
          Generate a public link, download your resume, and update it whenever
          needed.
        </p>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="relative px-6 pb-24">
    <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
      <h2 className="text-4xl font-bold text-white">
        Ready To Build Your Dream Resume?
      </h2>

      <p className="mt-4 text-gray-300">
        Join thousands of professionals using ResumeFreak to accelerate
        their careers.
      </p>

      <Link
        href={isSignedIn ? "/dashboard" : "/sign-up"}
        className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
      >
        Get Started Free
      </Link>
    </div>
  </section>
</div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          © 2026 ResumeFreak. Built with ❤️ by Squad of Creators.
        </div>
      </footer>
    </div>
  );
};

export default Page;