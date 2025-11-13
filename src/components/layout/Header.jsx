import Navbar from "./Navbar";
import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <BookOpen className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              Free-Blog
            </h1>
            <p className="hidden sm:block text-xs sm:text-sm text-gray-500">
              La plateforme de blogs moderne
            </p>
          </div>
        </Link>

        {/* Menu navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
