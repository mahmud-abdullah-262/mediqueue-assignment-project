"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Separator, Chip } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

// ─── Data ────────────────────────────────────────────────────────────────────

const learningLinks = [
  { label: "Browse Tutors",   href: "/tutors" },
  { label: "Book a Session",  href: "/tutors" },
  { label: "My Tutors",       href: "/my-tutors" },
  { label: "My Booked Session",   href: "/my-booked-sessions" },
  { label: "Add a Tutor", href: "/add-tutor" },
];

const companyLinks = [
  { label: "Contact Us",   href: "#" },
  { label: "Technology",   href: "#" },
  { label: "Instructors",  href: "/tutors" },
  { label: "Pricing",      href: "#" },
  { label: "Support",      href: "#" },
];

const socialLinks = [
  { icon: <FaFacebookF size={14} />,  href: "https://facebook.com",  label: "Facebook" },
  { icon: <FaTwitter   size={14} />,  href: "https://twitter.com",   label: "Twitter" },
  { icon: <FaLinkedinIn size={14} />, href: "https://linkedin.com",  label: "LinkedIn" },
  { icon: <FaInstagram  size={14} />, href: "https://instagram.com", label: "Instagram" },
];

const bottomLinks = [
  { label: "Our Story",     href: "#" },
  { label: "Services",      href: "#" },
  { label: "Journals",      href: "#" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-white font-sans">

     
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/assets/medilogo.png"
              alt="MediQueue Logo"
              width={200}
              height={100}
              className="rounded-xl"
    
            />
          </Link>

          <p className="text-sm leading-relaxed" style={{ color: "#1e1b4b", opacity: 0.7 }}>
            From academic excellence to real-world skills, everything you need is here.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-full
                       border-2 text-sm font-semibold transition-all duration-200
                       hover:text-white hover:shadow-lg"
            style={{
              borderColor: "#7c3aed",
              color: "#7c3aed",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7c3aed";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#7c3aed";
            }}
          >
            Contact With Us <ArrowRight/>
          </Link>
        </div>

        {/* Learning Services Links */}
        <div>
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-5"
            style={{ color: "#1e1b4b" }}
          >
            Learning Services
          </h4>
          <ul className="flex flex-col gap-3">
            {learningLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-purple-700"
                  style={{ color: "#1e1b4b", opacity: 0.75 }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-5"
            style={{ color: "#1e1b4b" }}
          >
            Our Company
          </h4>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors duration-150 hover:text-purple-700"
                  style={{ color: "#1e1b4b", opacity: 0.75 }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-5"
            style={{ color: "#1e1b4b" }}
          >
            Get Contact
          </h4>
          <ul className="flex flex-col gap-3 mb-6">
            <li className="text-sm" style={{ color: "#1e1b4b", opacity: 0.75 }}>
              <span className="font-semibold" style={{ opacity: 1 }}>Phone:</span>{" "}
              +880 1700-000000
            </li>
            <li className="text-sm" style={{ color: "#1e1b4b", opacity: 0.75 }}>
              <span className="font-semibold" style={{ opacity: 1 }}>E-mail:</span>{" "}
              support@mediqueue.app
            </li>
            <li className="text-sm" style={{ color: "#1e1b4b", opacity: 0.75 }}>
              <span className="font-semibold" style={{ opacity: 1 }}>Location:</span>{" "}
              Dhaka, Bangladesh
            </li>
          </ul>

          {/* Social Icons via HeroUI Chip */}
          <div className="flex items-center gap-2 flex-wrap">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <Chip
                  size="sm"
                  variant="flat"
                  className="cursor-pointer transition-all duration-200
                             hover:scale-110 hover:shadow-md"
                  style={{
                    background: "#faf5ff",
                    color: "#7c3aed",
                    border: "1px solid #ede9fe",
                    padding: "0 8px",
                    height: "30px",
                  }}
                >
                  {s.icon}
                </Chip>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* ── CTA Band ────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "#1e1b4b" }}
      >
        {/* Decorative gradient blob */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#7c3aed" }}
        />

        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row
                        items-start md:items-center justify-between gap-8">
          <div className="text-center mx-auto">
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white/10 mb-3">
            Beyond Books, Beyond Classrooms
            </h2>
            
          </div>

        </div>

        {/* ── Bottom Bar ──────────────────────────────────────────── */}
        <div
          className="border-t px-6 py-4 flex flex-col sm:flex-row
                     items-center justify-between gap-3 max-w-7xl mx-auto w-full"
          style={{ borderColor: "rgba(124,58,237,0.25)" }}
        >
          <p className="text-xs" style={{ color: "#a78bfa" }}>
            Copyright 2025 MediQueue™ | Dhaka, Bangladesh
          </p>

          <div className="flex items-center gap-4">
            {bottomLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#a78bfa" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {["Instagram", "Facebook", "LinkedIn"].map((name) => (
              <a
                key={name}
                href={`https://${name.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#a78bfa" }}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
