"use client";

import { useEffect, useRef, useState } from "react";

const STRIPE_WIDTH = 14;

export default function WaxBarrierIllusion() {
  const scrollRef = useRef<HTMLElement | null>(null);
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
    <main
      ref={scrollRef}
      className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#f9f9f9] px-6"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="relative min-h-[185vh]">
        <section className="sticky top-0 flex min-h-screen items-center justify-center">
          <div className="relative flex w-full max-w-3xl flex-col items-center text-center">
            <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
              pec
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tighter text-zinc-950 sm:text-7xl">
              pec
            </h1>
            <div className="mx-auto mt-8 h-px w-44 bg-zinc-200" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-40 w-32 -translate-x-1/2 translate-y-16 overflow-hidden border-x border-zinc-950/20 sm:h-48 sm:w-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(249,249,249,0.98) 0 10px, rgba(26,28,28,0.88) 10px 14px)",
                transform: `translate(-50%, 4rem) translateX(${
                  STRIPE_WIDTH - travel
                }px)`,
              }}
            />
          </div>
        </section>
        <div className="absolute bottom-10 left-1/2 h-24 w-px -translate-x-1/2 bg-zinc-200" />
      </div>
    </main>
  );
}
