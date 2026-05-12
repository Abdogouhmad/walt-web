"use client";

import React from "react";
import { motion } from "framer-motion";
import Pixel9Mockup from "./Pixel9Mockup";

const screenshotImages = [
  { src: "/screenshots/tx_app.png", alt: "Transactions" },
  { src: "/screenshots/home.png", alt: "Home Dashboard" },
  { src: "/screenshots/report.png", alt: "Analytics" },
];

const Screenshots = () => {
  return (
    <section id="screenshots" className="py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            A beautiful interface. <br />
            <span className="text-indigo-500">For a better focus.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the app that&apos;s as easy to use as it is beautiful to look at.
            Designed with simplicity in mind.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {screenshotImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : (i === 0 ? -5 : 5) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`w-full max-w-[280px] ${
                i === 1 ? "z-10 scale-110" : "opacity-60 scale-95"
              }`}
            >
              <Pixel9Mockup screenshot={image.src} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
