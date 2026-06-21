"use client";

import React, { useState } from "react";
import { analyzeJDMatch, JDMatchResult } from "@/lib/actions/jd-match.actions";
import { Loader2, CheckCircle2, XCircle, AlertCircle, ChevronRight } from "lucide-react";

export default function JDMatchScorer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<JDMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please paste both your resume and the job description.");
      return;
    }
    setError("");
    setIsLoading(true);
    setResult(null);
    try {
      const data = await analyzeJDMatch(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-green-50 border-green-200";
    if (score >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong Match";
    if (score >= 50) return "Moderate Match";
    return "Weak Match";
  };

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-400";
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Your Resume
          </label>
          <p className="text-xs text-gray-400 -mt-1">Paste the full text of your resume</p>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here...

Example:
Full Stack Engineer with 2 years experience...
Skills: React.js, Node.js, TypeScript, MongoDB...
Experience: Software Engineer at Harman..."
            className="flex-1 min-h-[320px] p-4 rounded-xl border border-violet-100 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-gray-700 resize-none bg-white shadow-sm transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Job Description
          </label>
          <p className="text-xs text-gray-400 -mt-1">Paste the full JD from the job posting</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here...

Example:
We are looking for a Full Stack Developer with:
- 2+ years of React.js experience
- Strong Node.js and TypeScript skills
- Experience with cloud platforms (AWS/GCP)..."
            className="flex-1 min-h-[320px] p-4 rounded-xl border border-violet-100 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-gray-700 resize-none bg-white shadow-sm transition-all"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-10 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing your resume...</>
          ) : (
            <>✦ Analyze Match</>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-in">

          {/* Score Card */}
          <div className={`rounded-2xl border p-8 flex flex-col md:flex-row items-center gap-8 ${getScoreBg(result.score)}`}>
            <div className="flex flex-col items-center">
              <div className={`text-7xl font-black ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
              <div className={`text-sm font-semibold mt-1 ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Overall Assessment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>

              {/* Section scores */}
              <div className="mt-4 space-y-2">
                {Object.entries(result.sections).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 capitalize">{key}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${getBarColor(val)}`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold w-8 text-right ${getScoreColor(val)}`}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-gray-900">Matched Keywords</h3>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  {result.matchedKeywords.length} found
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.length > 0 ? (
                  result.matchedKeywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">
                      ✓ {kw}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No matched keywords found.</p>
                )}
              </div>
            </div>

            {/* Missing */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-gray-900">Missing Keywords</h3>
                <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  {result.missingKeywords.length} missing
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.length > 0 ? (
                  result.missingKeywords.map((kw, i) => (
                    <span key={i} className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full font-medium">
                      ✗ {kw}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No missing keywords — great match!</p>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-gray-900">Actionable Suggestions</h3>
            </div>
            <div className="space-y-3">
              {result.suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl">
                  <ChevronRight className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Re-analyze */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setResult(null)}
              className="text-sm text-gray-400 hover:text-violet-600 underline transition-colors"
            >
              Start over with a different JD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}