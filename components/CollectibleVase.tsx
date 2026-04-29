"use client";

import Image from "next/image";
import { useVases } from "@/context/VaseContext";

type CollectibleVaseProps = {
  id: string;
  className?: string;
  size?: number;
};

export default function CollectibleVase({
  id,
  className = "",
  size = 42,
}: CollectibleVaseProps) {
  const { collectVase, isCollected } = useVases();

  if (isCollected(id)) return null;

  return (
    <button
      type="button"
      aria-label="Collect vase"
      onClick={() => collectVase(id)}
      className={`group absolute z-40 flex items-center justify-center transition duration-500 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/main/vase.svg"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain opacity-55 drop-shadow-sm transition duration-500 group-hover:opacity-100"
      />
    </button>
  );
}
