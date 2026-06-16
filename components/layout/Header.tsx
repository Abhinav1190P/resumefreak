"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Sparkles } from "lucide-react";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/70 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-500 text-white shadow-lg">
              <Sparkles size={18} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  ResumeFreak
                </span>
              </h1>

              <p className="text-xs text-slate-500">
                AI Resume Builder
              </p>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isLoaded && !isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="hidden rounded-xl border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:bg-purple-50 md:block"
                >
                  Dashboard
                </Link>

                <div className="rounded-xl border border-slate-200 bg-white px-2 py-1 shadow-sm">
                  <div className="hidden md:block">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9",
                        },
                      }}
                      showName
                    />
                  </div>

                  <div className="md:hidden">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9",
                        },
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;