'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FlameButtonConfig {
  id: number;
  label: string;
  left: string;
  top: string;
  large: boolean;
  href: string;
}

const flameButtons: FlameButtonConfig[] = [
  { id: 0, label: 'Origin', left: '16.67%', top: '38%', large: false, href: '#' },
  { id: 1, label: 'MAGS', left: '33.33%', top: '32%', large: false, href: '#' },
  { id: 2, label: 'Legacy', left: '50%', top: '22%', large: true, href: '#' },
  { id: 3, label: 'SHOOTS', left: '66.67%', top: '32%', large: false, href: '/photoshoots' },
  { id: 4, label: 'CLOTHES', left: '83.33%', top: '38%', large: false, href: '#' },
];

export default function Candelabra() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const buttons = containerRef.current?.querySelectorAll('.flame-btn');
    if (!buttons) return;

    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        const label = btn.querySelector('.flame-label');
        const icon = btn.querySelector('.flame-icon');
        label?.classList.remove('opacity-0');
        label?.classList.add('opacity-100');
        icon?.classList.add('scale-125');
      });

      btn.addEventListener('mouseleave', () => {
        const label = btn.querySelector('.flame-label');
        const icon = btn.querySelector('.flame-icon');
        label?.classList.add('opacity-0');
        label?.classList.remove('opacity-100');
        icon?.classList.remove('scale-125');
      });
    });
  }, []);

  return (
    <main className="relative w-full min-h-screen flex items-center justify-center bg-surface pt-32 md:pt-0 pb-32 md:pb-0" ref={containerRef}>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/main/video10s.mp4" type="video/mp4" />
      </video>

      {/* Left side image (PNG with transparency, above video) */}
      <Image
        src="/main/chndlr.png"
        alt=""
        width={400}
        height={600}
        className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-auto object-contain pointer-events-none z-10"
      />
      <div className="relative w-full max-w-4xl aspect-[6/5] flex flex-col items-center justify-end px-4 sm:px-8 pb-16 md:pb-24">
        {/* SVG Candelabra Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base stem */}
          <path className="candelabra-line" d="M300 480 L300 350" />
          {/* Wide Arch for outer candles */}
          <path className="candelabra-line" d="M100 250 Q100 380 300 380 Q500 380 500 250" />
          {/* Inner Arch for middle candles */}
          <path className="candelabra-line" d="M200 220 Q200 320 300 320 Q400 320 400 220" />
          {/* Individual Candle Holders */}
          <line className="candelabra-line" x1="100" x2="100" y1="250" y2="230" />
          <line className="candelabra-line" x1="200" x2="200" y1="220" y2="200" />
          <line className="candelabra-line" x1="300" x2="300" y1="350" y2="150" />
          <line className="candelabra-line" x1="400" x2="400" y1="220" y2="200" />
          <line className="candelabra-line" x1="500" x2="500" y1="250" y2="230" />
        </svg>

        {/* Interactive Flame Buttons */}
        {flameButtons.map((btn) => {
          const buttonClass = "absolute -translate-x-1/2 flex flex-col items-center flame-btn cursor-pointer transition-all duration-500";
          const buttonContent = (
            <>
              <span className="flame-label opacity-0 text-[8px] sm:text-[10px] tracking-[0.2em] uppercase mb-2 sm:mb-4 transition-all duration-500">
                {btn.label}
              </span>
              <Image
                src="/main/star-button.png"
                alt=""
                width={btn.large ? 56 : 40}
                height={btn.large ? 56 : 40}
                className="flame-icon transition-all duration-500"
              />
            </>
          );

          if (btn.id === 3) {
            return (
              <Link
                key={btn.id}
                href={btn.href}
                className={buttonClass}
                style={{ left: btn.left, top: btn.top }}
              >
                {buttonContent}
              </Link>
            );
          }

          return (
            <div
              key={btn.id}
              className={buttonClass}
              style={{ left: btn.left, top: btn.top }}
            >
              {buttonContent}
            </div>
          );
        })}

        {/* Descriptive Text */}
        <div className="absolute -bottom-8 md:-bottom-12 w-full px-4 text-center">
          <h1 className="display-sm font-light tracking-tight text-xs sm:text-sm md:text-base text-zinc-900">
            {}(o){`{|| || || || || || |||| || || || || || |}`}(o){}
          </h1>
          <p className="text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-zinc-400 mt-2 md:mt-4">
            ilumina tu camino ProteGE tu fortuna
          </p>
        </div>
      </div>
    </main>
  );
}
