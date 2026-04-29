"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { useVases } from "@/context/VaseContext";

const WHEEL_SPEED = 0.3;
const DRAG_SPEED = 1;
const FRICTION = 0.965;
const BAR_START_OFFSET = -150;

export default function RotatingVaseIllusion() {
  const dragRef = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startOffset: BAR_START_OFFSET,
  });
  const velocityRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [barOffset, setBarOffset] = useState(BAR_START_OFFSET);

  const { collectVase, collected } = useVases();
  const vaseId = "illusion-vase";
  const isCollected = collected.includes(vaseId);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX / window.innerWidth - 0.5;
      const mouseY = event.clientY / window.innerHeight - 0.5;

      setTilt({
        x: mouseY * -7,
        y: mouseX * 7,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const stopAnimation = () => {
      if (animationRef.current === null) return;
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };

    const animate = () => {
      setBarOffset((current) => current + velocityRef.current);
      velocityRef.current *= FRICTION;

      if (Math.abs(velocityRef.current) < 0.04) {
        velocityRef.current = 0;
        animationRef.current = null;
        return;
      }

      animationRef.current = window.requestAnimationFrame(animate);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      velocityRef.current += event.deltaY * WHEEL_SPEED;

      if (animationRef.current === null) {
        animationRef.current = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      stopAnimation();
    };
  }, []);

  const handleClick = () => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }

    if (!isCollected) {
      collectVase(vaseId);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    velocityRef.current = 0;
    if (animationRef.current !== null) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: barOffset,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 3) {
      drag.moved = true;
    }

    setBarOffset(drag.startOffset + distance * DRAG_SPEED);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId === event.pointerId) {
      drag.active = false;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#f9f9f9]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: "grab", touchAction: "none" }}
    >
      <section className="flex min-h-screen items-center justify-center px-6">
          <button
            type="button"
            aria-label="Collect wheel kinegram illusion"
            onClick={handleClick}
            className="relative block overflow-hidden border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40"
            style={{
              width: "min(82vw, 760px)",
              aspectRatio: "1 / 1",
              cursor: "inherit",
              transform: `rotateX(${7 + tilt.x}deg) rotateY(${
                -5 + tilt.y
              }deg)`,
              transformStyle: "preserve-3d",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
              transition: "transform 120ms ease-out",
            }}
          >
            <img
              src="/main/kinegram-frames.png"
              alt=""
              className="relative z-10 block h-full w-full select-none object-cover"
              draggable={false}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 bg-repeat-x"
              style={{
                backgroundImage: "url('/main/kinegram-bars.png')",
                backgroundSize: "auto 100%",
                backgroundPosition: `${barOffset}px top`,
                willChange: "background-position",
              }}
            />
          </button>
      </section>
    </div>
  );
}
