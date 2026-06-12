"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Pixel9Mockup from "./Pixel9Mockup";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple-600/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Privacy-First Tracking
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Track. Understand. <br />
            <span className="gradient-text">Grow. Walt.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Take control of your finances with zero compromise on privacy.
            Everything stays on your device, exactly where it belongs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://github.com/Abdogouhmad/walt/releases/latest/download/walt.apk"
              download
              className="gradient-bg text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-purple-500/20"
            >
              Download Walt (APK) <Download className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              See Features <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative hidden md:block w-full max-w-2xl lg:max-w-none"
        >
          <div className="relative z-10 grid grid-cols-3 gap-4 items-center">
            {/* Phone Mockup 1 */}
            <div className="col-span-1 translate-y-8">
              <Pixel9Mockup screenshot="/screenshots/tx_app.png" className="w-full" />
            </div>
            {/* Phone Mockup 2 (Main) */}
            <div className="col-span-1">
              <Pixel9Mockup screenshot="/screenshots/home.png" className="w-full scale-110" />
            </div>
            {/* Phone Mockup 3 */}
            <div className="col-span-1 translate-y-12">
              <Pixel9Mockup screenshot="/screenshots/add_tx.png" className="w-full" />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
