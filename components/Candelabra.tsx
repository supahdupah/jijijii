'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CollectibleVase from './CollectibleVase';

interface FlameButtonConfig {
  id: number;
  label: string;
  left: string;
  top: string;
  large: boolean;
  href: string;
}

const flameButtons: FlameButtonConfig[] = [
  { id: 0, label: 'Origin',  left: '6.9%',  top: '41.8%', large: false, href: '/distortion' },
  { id: 1, label: 'MAGS',    left: '14%',   top: '44.8%', large: false, href: '#' },
  { id: 2, label: 'Legacy',  left: '16.8%', top: '28.8%', large: true,  href: '#' },
  { id: 3, label: 'SHOOTS',  left: '18.9%', top: '41.8%', large: false, href: '/photoshoots' },
  { id: 4, label: 'CLOTHES', left: '26.1%', top: '42.8%', large: false, href: '#' },
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
      <CollectibleVase
        id="home-flame-vase"
        size={38}
        className="left-[36%] top-[58%] md:left-[34%] md:top-[61%] rotate-[-8deg]"
      />
      {/* Interactive Star Buttons — positioned over chndlr.png candle heads */}
      {flameButtons.map((btn) => {
        const buttonClass = "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center flame-btn cursor-pointer transition-all duration-500 z-20";
        const buttonContent = (
          <>
            <Image
              src="/main/star-button.png"
              alt=""
              width={btn.large ? 56 : 40}
              height={btn.large ? 56 : 40}
              className="flame-icon transition-all duration-500"
            />
            <span className="flame-label opacity-0 text-[8px] sm:text-[10px] tracking-[0.2em] uppercase mt-2 transition-all duration-500">
              {btn.label}
            </span>
          </>
        );

        if (btn.href !== '#') {
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
      <div className="absolute bottom-8 md:bottom-12 w-full px-4 text-center z-20">
        <h1 className="display-sm font-light tracking-tight text-xs sm:text-sm md:text-base text-zinc-900">
          {}(o){`{|| || || || || || |||| || || || || || |}`}(o){}
        </h1>
        <p className="text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-zinc-400 mt-2 md:mt-4">
          ilumina tu camino ProteGE tu fortuna
        </p>
      </div>
    </main>
  );
}
