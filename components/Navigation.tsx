'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-xl flex items-center px-4 sm:px-8 md:px-12 py-4 md:py-5 z-50">
        {/* Candelabra home link */}
        {/* Centered brand name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-2xl font-black tracking-tighter text-zinc-900">
          j i j i jii
        </div>

        <Link href="/" aria-label="Home" className="flex items-center group">
          <svg
            viewBox="0 0 600 500"
            className="w-14 h-14 md:w-16 md:h-16 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
            aria-hidden="true"
          >
            <path d="M300 480 L300 350" stroke="#1a1c1c" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M100 250 Q100 380 300 380 Q500 380 500 250" stroke="#1a1c1c" strokeWidth="4" fill="none" />
            <path d="M200 220 Q200 320 300 320 Q400 320 400 220" stroke="#1a1c1c" strokeWidth="4" fill="none" />
            <line x1="100" y1="250" x2="100" y2="220" stroke="#1a1c1c" strokeWidth="4" strokeLinecap="round" />
            <line x1="200" y1="220" x2="200" y2="190" stroke="#1a1c1c" strokeWidth="4" strokeLinecap="round" />
            <line x1="300" y1="350" x2="300" y2="140" stroke="#1a1c1c" strokeWidth="4" strokeLinecap="round" />
            <line x1="400" y1="220" x2="400" y2="190" stroke="#1a1c1c" strokeWidth="4" strokeLinecap="round" />
            <line x1="500" y1="250" x2="500" y2="220" stroke="#1a1c1c" strokeWidth="4" strokeLinecap="round" />
            {/* Flame tips — filled teardrop shapes */}
            <ellipse cx="100" cy="208" rx="7" ry="11" fill="#1a1c1c" />
            <ellipse cx="200" cy="178" rx="7" ry="11" fill="#1a1c1c" />
            <ellipse cx="300" cy="128" rx="9" ry="14" fill="#1a1c1c" />
            <ellipse cx="400" cy="178" rx="7" ry="11" fill="#1a1c1c" />
            <ellipse cx="500" cy="208" rx="7" ry="11" fill="#1a1c1c" />
          </svg>
        </Link>
        <div className="hidden md:flex gap-6 md:gap-12 absolute right-12">
          <Link
            href="/"
            className="font-inter tracking-tighter text-xs md:text-sm uppercase text-zinc-900 dark:text-zinc-100 font-bold underline underline-offset-8 transition-colors duration-300"
          >
            The Flame
          </Link>
          <Link
            href="#"
            className="font-inter tracking-tighter text-xs md:text-sm uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300"
          >
            WAX
          </Link>
          <Link
            href="#"
            className="font-inter tracking-tighter text-xs md:text-sm uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300"
          >
            WICK
          </Link>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden material-symbols-outlined text-zinc-900 dark:text-zinc-100 scale-95 duration-200 absolute right-4"
        >
          menu
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} fixed top-16 left-0 right-0 bg-white dark:bg-zinc-800 md:hidden z-40 border-b border-zinc-200 dark:border-zinc-700`}>
        <div className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              className="font-inter tracking-tighter text-sm uppercase text-zinc-900 dark:text-zinc-100 font-bold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Flame
            </Link>
            <Link
              href="#"
              className="font-inter tracking-tighter text-sm uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              WAX
            </Link>
            <Link
              href="#"
              className="font-inter tracking-tighter text-sm uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              WICK
            </Link>
          </div>
        </div>
    </>
  );
}
