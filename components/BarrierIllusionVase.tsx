"use client";

import { useEffect, useRef, useState } from "react";

const STRIPE_WIDTH = 16;

export default function BarrierIllusionVase() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    const update = () => {
      frameRef.current = null;
      setScrollTop(node.scrollTop);
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    node.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      node.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const travel = scrollTop % (STRIPE_WIDTH * 2);

  return (
    <div
      ref={scrollRef}
      className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-[#f9f9f9]"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="relative min-h-[190vh] px-6">
        <section className="sticky top-0 flex min-h-screen items-center justify-center">
          <div className="relative flex h-[420px] w-full max-w-xl items-center justify-center">
            <div className="absolute inset-x-0 top-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                barrier
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-tighter text-zinc-950 sm:text-7xl">
                illusion
              </h1>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-44 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden border-x border-zinc-950/20 sm:h-56 sm:w-44"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(249,249,249,0.99) 0 11px, rgba(24,24,27,0.9) 11px 16px)",
                transform: `translate(-50%, -50%) translateX(${
                  STRIPE_WIDTH - travel
                }px)`,
              }}
            />

            <div className="absolute bottom-8 left-1/2 h-20 w-px -translate-x-1/2 bg-zinc-200" />
          </div>
        </section>
      </div>
    </div>
  );
}
