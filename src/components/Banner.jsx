"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-bg-light)",
        fontFamily: "var(--font-outfit)",
        minHeight: "clamp(480px, 88vh, 720px)",
      }}
    >
      {/* ══════════════════════════════════════
          Background SVG blob — glass effect
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* main blob — right side, like image 2 */}
        <svg
          className="absolute -right-16 top-0 h-full w-[65%]"
          viewBox="0 0 700 720"
          preserveAspectRatio="xMaxYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#a78bfa" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.18" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
            {/* glass shimmer */}
            <linearGradient id="shimmer" x1="0%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* soft blurred base */}
          <path
            d="M80 0 C200 40 680 0 700 0 L700 720 L0 720 C0 600 -20 480 80 360 C160 260 -20 140 80 0Z"
            fill="url(#blobGrad)"
            filter="url(#blur)"
          />
          {/* crisp glass shape on top */}
          <path
            d="M120 0 C240 50 700 10 700 0 L700 720 L0 720 C20 580 -10 460 100 350 C200 240 20 120 120 0Z"
            fill="url(#shimmer)"
          />
          {/* inner edge highlight */}
          <path
            d="M120 0 C240 50 700 10 700 0"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
          />
          <path
            d="M0 720 C20 580 -10 460 100 350 C200 240 20 120 120 0"
            fill="none"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth="1"
          />
        </svg>

        {/* small accent circle — top left */}
        <div
          className="absolute -top-12 -left-12 w-56 h-56 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            filter: "blur(32px)",
          }}
        />

        {/* accent dot — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #22c55e 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════
          Content
      ══════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-0 py-14 lg:py-0" style={{ minHeight: "clamp(480px, 88vh, 720px)" }}>

          {/* ── LEFT: Text ── */}
          <div className="flex-1 flex flex-col items-start justify-center gap-6 lg:pr-8">

            {/* label pill */}
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#DDD6FE] rounded-full px-4 py-1.5 shadow-sm">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "var(--color-text-dark)" }}
              >
                The Leader in Online Tutoring
              </span>
            </div>

            {/* hook */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--color-text-dark)" }}
            >
              Beyond Books,{" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--color-primary)" }}
              >
                Beyond
                {/* underline accent */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5 Q50 0 100 4 Q150 8 200 3"
                    stroke="#22c55e"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Classrooms
            </h1>

            {/* subtitle */}
            <p
              className="text-base sm:text-lg leading-relaxed max-w-md"
              style={{ color: "#4B5563" }}
            >
              From academic excellence to real-world skills,{" "}
              <span className="font-semibold" style={{ color: "var(--color-text-dark)" }}>
                everything you need is here.
              </span>
            </p>

            {/* CTA */}
            <Link href="/tutors" className="mt-1">
              <Button
                className="h-12 px-8 rounded-xl font-semibold text-sm text-white shadow-lg transition-all"
                style={{
                  background: "var(--color-primary)",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.30)",
                }}
                endContent={<ArrowRight width={16} height={16} />}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-secondary)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-primary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book Session
              </Button>
            </Link>

            {/* social proof */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex -space-x-2.5">
                {[
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/68.jpg",
                  "https://randomuser.me/api/portraits/men/55.jpg",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="student"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  <span className="font-semibold text-gray-600">500+</span> happy students
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Hero Image ── */}
          {/* <div className="relative flex-1 flex items-end justify-center lg:justify-end self-end lg:self-auto">

            {/* floating card — top right */}
            <div
              className="absolute top-50 right-0 lg:right-17 z-5 bg-white/80 backdrop-blur-md border border-[#DDD6FE] rounded-2xl px-4 py-3 shadow-lg hidden sm:flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(124,58,237,0.10)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--color-text-dark)] leading-none">Expert Tutors</p>
                <p className="text-xs text-gray-400 mt-0.5">Verified & Certified</p>
              </div>
            </div>

            {/* floating card — bottom left */}
            <div
              className="absolute bottom-16 -left-100 lg: left-152 z-5 bg-white/80 backdrop-blur-md border border-[#DDD6FE] rounded-2xl px-4 py-3 shadow-lg hidden sm:flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(34,197,94,0.10)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--color-text-dark)] leading-none">Slots Available</p>
                <p className="text-xs text-gray-400 mt-0.5">Book anytime</p>
              </div>
            </div>

            {/* hero image */}
            <div className=" -mb-10">
               <Image 
            src="/assets/hero.png"
            alt="MediQueue tutor"
            width={1000}
            height={1000}
            className="relative z-10 w-full h-full mb-0  max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg object-contain object-bottom drop-shadow-xl border"
            // style={{ maxHeight: "clamp(500px, 90vh, 900px)" }}
            >


            </Image>
            </div>
           
           
          {/* </div> */} 

        </div>
      </div>
    </section>
  );
};

export default HeroSection;