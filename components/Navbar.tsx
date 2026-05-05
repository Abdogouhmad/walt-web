"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Walt</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="#privacy" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Privacy</Link>
          <Link href="#screenshots" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Screenshots</Link>
          <Link
            href="#download"
            className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
          >
            Download
          </Link>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
