"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Smartphone } from "lucide-react";
import Pixel9Mockup from "./Pixel9Mockup";
import { APK_VARIANTS } from "./downloads";

const Download = () => {
  const [variant, setVariant] = useState(APK_VARIANTS[0]);
  return (
    <section
      id="download"
      className="py-24 bg-zinc-950 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-linear-to-b from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
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
                Take control of your finances. Privately.{" "}
                <br className="hidden md:block" />
                Available now for Android.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={variant.url}
                  download
                  className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors shadow-xl"
                >
                  <PlayCircle className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-60">
                      Direct Download
                    </p>
                    <p className="text-lg leading-tight">Install APK</p>
                  </div>
                </a>
                <div className="bg-zinc-800/50 text-gray-500 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border border-white/5 shadow-xl cursor-not-allowed">
                  <PlayCircle className="w-6 h-6 opacity-40" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase leading-none opacity-40">
                      Coming Soon to
                    </p>
                    <p className="text-lg leading-tight">Google Play</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Select your device:
                </p>
                <div className="flex flex-wrap gap-3">
                  {APK_VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v)}
                      className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                        variant.id === v.id
                          ? "bg-purple-600/20 border-purple-500 text-white"
                          : "bg-zinc-900/60 border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                    >
                      <p className="font-semibold text-sm flex items-center gap-2">
                        {v.label}
                        {v.recommended && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase">
                            Recommended
                          </span>
                        )}
                      </p>
                      <p className="text-xs opacity-70">{v.description}</p>
                    </button>
                  ))}
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
              <Pixel9Mockup
                screenshot="/screenshots/add_tx.png"
                className="max-w-[320px]"
              />
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
