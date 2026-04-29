import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full flex flex-col md:flex-row justify-between px-4 sm:px-8 md:px-12 py-6 md:py-10 bg-transparent z-50 gap-4">
      <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600">
        © 2026 || ZZ
      </div>
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10">
        <Link
          href="#"
          className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-all opacity-80 hover:opacity-100"
        >
          Privacy
        </Link>
        <Link
          href="#"
          className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-all opacity-80 hover:opacity-100"
        >
          Terms
        </Link>
        <Link
          href="#"
          className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-all opacity-80 hover:opacity-100"
        >
          Archive
        </Link>
      </div>
    </footer>
  );
}
