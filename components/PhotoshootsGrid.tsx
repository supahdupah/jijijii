'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Photoshoot {
  id: string;
  title: string;
  images: string[];
}

const photoshoots: Photoshoot[] = [
  { id: '01', title: 'I',    images: ['/photoshoots/01/jul1.jpeg', '/photoshoots/01/jul1.jpeg'] },
  { id: '02', title: 'II',   images: ['/photoshoots/02/chandlr.jpeg', '/photoshoots/02/chandlr.jpeg'] },
  { id: '03', title: 'III',  images: ['/photoshoots/03/orange.jpeg', '/photoshoots/03/orange.jpeg'] },
  { id: '04', title: 'IV',   images: [] },
  { id: '05', title: 'V',    images: [] },
  { id: '06', title: 'VI',   images: [] },
  { id: '07', title: 'VII',  images: [] },
  { id: '08', title: 'VIII', images: [] },
  { id: '09', title: 'IX',   images: [] },
  { id: '10', title: 'X',    images: [] },
  { id: '11', title: 'XI',   images: [] },
  { id: '12', title: 'XII',  images: [] },
  { id: '13', title: 'XIII', images: [] },
  { id: '14', title: 'XIV',  images: [] },
  { id: '15', title: 'XV',   images: [] },
  { id: '16', title: 'XVI',  images: [] },
];

export default function PhotoshootsGrid() {
  const [selected, setSelected] = useState<Photoshoot | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <>
      {/* Grid */}
      <div className="fixed inset-0 overflow-y-auto pt-20 pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200">
            {photoshoots.map((shoot) => (
              <button
                key={shoot.id}
                onClick={() => setSelected(shoot)}
                className="bg-surface aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:bg-zinc-100 group relative overflow-hidden"
              >
                {shoot.images.length > 0 ? (
                  <>
                    <Image
                      src={shoot.images[0]}
                      alt={shoot.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-surface/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-900">
                        {shoot.title}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-300 group-hover:text-zinc-400 transition-colors duration-500">
                      {shoot.title}
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Viewer Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-surface overflow-y-auto fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="min-h-full max-w-4xl mx-auto bg-surface">
            <div className="sticky top-0 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-8 py-6 border-b border-zinc-100 z-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-900">
                {selected.title}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="material-symbols-outlined text-zinc-400 hover:text-zinc-900 transition-colors duration-300 text-xl"
              >
                close
              </button>
            </div>

            <div className="flex flex-col gap-1 px-4 sm:px-8 py-4">
              {selected.images.length > 0 ? (
                selected.images.map((src, i) => (
                  <div key={i} className="relative w-full">
                    <Image
                      src={src}
                      alt={`${selected.title} — ${i + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-64">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-300">
                    No images yet
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
