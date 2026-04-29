import CollectibleVase from "@/components/CollectibleVase";

export const metadata = {
  title: "jijijii - Wick",
};

export default function WickPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f9f9f9] px-6">
      <CollectibleVase
        id="wick-vase"
        size={35}
        className="bottom-[24%] left-[22%] rotate-[16deg]"
      />
      <section className="w-full max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
          pec
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tighter text-zinc-950 sm:text-7xl">
          pec
        </h1>
        <div className="mx-auto mt-8 h-px w-44 bg-zinc-200" />
      </section>
    </main>
  );
}
