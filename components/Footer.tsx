import { LuWallet } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <LuWallet className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Walt
            </span>
          </div>

          <div className="flex gap-8">
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex gap-6">
            <Link
              href="https://x.com/a3bdor7man"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com/Abdogouhmad"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </Link>
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
