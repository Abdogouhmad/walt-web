"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Wallet, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Privacy", href: "#privacy" },
    { name: "Screenshots", href: "#screenshots" },
  ];

  return (
    <Disclosure as="nav" className="fixed top-0 w-full z-50">
      {({ open }) => (
        <div 
          className={`transition-all duration-300 ${
            scrolled || open
              ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-4"
              : "bg-transparent py-6"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group z-50">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <Wallet className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">Walt</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#download"
                  className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
                >
                  Download
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden flex items-center">
                <DisclosureButton className="text-white p-2 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Menu className="w-6 h-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {open && (
              <DisclosurePanel
                static
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                transition={{ duration: 0.3, ease: "easeInOut" } as any}
                className="md:hidden border-t border-white/5 mt-4"
              >
                <div className="px-6 py-8 flex flex-col gap-6 bg-black/40 backdrop-blur-xl">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-xl font-bold text-gray-300 hover:text-white transition-colors"
                    >
                      <DisclosureButton as="span" className="w-full block">
                        {link.name}
                      </DisclosureButton>
                    </Link>
                  ))}
                  <Link
                    href="#download"
                    className="bg-purple-600 text-white px-8 py-4 rounded-2xl text-center text-xl font-bold hover:bg-purple-700 transition-colors shadow-xl shadow-purple-500/20"
                  >
                    <DisclosureButton as="span" className="w-full block">
                      Download Now
                    </DisclosureButton>
                  </Link>
                </div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
