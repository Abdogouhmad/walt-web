"use client";

import React from "react";
import { motion } from "framer-motion";
import { Apple, PlayCircle } from "lucide-react";
import Pixel9Mockup from "./Pixel9Mockup";

const Download = () => {
  return (
    <section id="download" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Download Walt
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Take control of your finances. Privately. <br className="hidden md:block" />
                Available now for Android.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/apks/walt.apk" 
                  download
                  className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors shadow-xl"
                >
                  <PlayCircle className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-60">Direct Download</p>
                    <p className="text-lg leading-tight">Install APK</p>
                  </div>
                </a>
                <div className="bg-zinc-800/50 text-gray-500 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border border-white/5 shadow-xl cursor-not-allowed">
                  <PlayCircle className="w-6 h-6 opacity-40" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-40">Coming Soon to</p>
                    <p className="text-lg leading-tight">Google Play</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <Pixel9Mockup screenshot="/screenshots/add_tx.png" className="max-w-[320px]" />
            </motion.div>
          </div>

          {/* Decorative Glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Download;
