"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, BarChart3, Moon, UserCircle, Sparkles, Fingerprint } from "lucide-react";

const features = [
  {
    icon: <Fingerprint className="w-8 h-8 text-purple-500" />,
    title: "Security with Biometrics",
    description: "Your financial data is protected by FaceID or Fingerprint authentication.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
    title: "AI Financial Insights",
    description: "Get personalized advice and deep insights into your spending habits powered by local AI.",
  },
  {
    icon: <Lock className="w-8 h-8 text-purple-500" />,
    title: "100% Local & Private",
    description: "No cloud storage. No data harvesting. Your data stays on your device.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
    title: "Reports & PDF Export",
    description: "Visualize your spending habits and export reports in high-quality PDF format.",
  },
  {
    icon: <Moon className="w-8 h-8 text-purple-500" />,
    title: "Dark Mode",
    description: "A beautiful dark interface designed for clarity and eye comfort.",
  },
  {
    icon: <UserCircle className="w-8 h-8 text-indigo-500" />,
    title: "Local Account",
    description: "Personalize your app with a local profile picture and name stored securely.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything you need. <br />
            <span className="text-gray-500">Nothing you don't.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Walt is built with a focus on simplicity and privacy. We provide powerful tools
            to manage your money without invading your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-purple-500/30 transition-all hover:bg-zinc-900 group"
            >
              <div className="mb-6 p-3 rounded-2xl bg-black/50 border border-white/5 inline-block group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
