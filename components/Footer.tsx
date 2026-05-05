import React from "react";
import { Wallet, Github, X, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Wallet className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Walt</span>
          </div>

          <div className="flex gap-8">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          © 2026 Walt. All rights reserved. Built with privacy in mind.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
