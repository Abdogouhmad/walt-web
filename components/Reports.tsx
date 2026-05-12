"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, PieChart, TrendingUp, Sparkles } from "lucide-react";
import Pixel9Mockup from "./Pixel9Mockup";

const Reports = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Visualize. <span className="text-purple-500">Analyze.</span> Export.
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Get a clear picture of where your money goes. Our beautiful charts
            help you identify spending patterns and find ways to save.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <PieChart className="text-purple-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Interactive Charts</h4>
                <p className="text-gray-400 text-sm">Deep dive into your expenses with category-wise breakdown.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="text-indigo-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Monthly Insights</h4>
                <p className="text-gray-400 text-sm">Track your progress over time with monthly trend analysis.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <FileText className="text-purple-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">PDF Reports</h4>
                <p className="text-gray-400 text-sm">Generate and share professional PDF reports in seconds.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Pixel 9 Mockup */}
          <Pixel9Mockup screenshot="/screenshots/report.png" className="max-w-[280px] z-10" />

          {/* AI Advice Card overlay */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-zinc-900/90 backdrop-blur-md p-5 rounded-2xl border border-purple-500/30 shadow-2xl flex flex-col gap-3 z-20 max-w-[220px]"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-500 w-5 h-5" />
              <p className="text-white font-bold text-xs">AI Financial Advice</p>
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              &quot;You&apos;ve spent 15% more on Dining Out this month. Consider setting a budget of $200 for next month to save $45.&quot;
            </p>
          </motion.div>

          {/* PDF Preview Card overlay */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -top-6 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20"
          >
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <FileText className="text-red-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-black font-bold text-[10px]">Monthly_Report.pdf</p>
              <p className="text-gray-500 text-[9px]">Generated just now</p>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/10 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Reports;
