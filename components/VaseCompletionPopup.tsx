"use client";

import { FormEvent, useEffect, useState } from "react";
import { TOTAL_VASES, useVases } from "@/context/VaseContext";

const EMAIL_KEY = "jijijii-session-vase-email";
const DISMISSED_KEY = "jijijii-session-vase-popup-dismissed";

export default function VaseCompletionPopup() {
  const { collected } = useVases();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const complete = collected.length >= TOTAL_VASES;

  useEffect(() => {
    setSubmitted(Boolean(window.sessionStorage.getItem(EMAIL_KEY)));
    setDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  if (!complete || dismissed || submitted) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    window.sessionStorage.setItem(EMAIL_KEY, email.trim());
    setSubmitted(true);
  };

  const onDismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-zinc-950/70 px-4 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-zinc-200 bg-[#f9f9f9] px-6 py-7 text-center shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onDismiss}
          className="material-symbols-outlined float-right -mr-2 -mt-2 text-xl text-zinc-400 transition hover:text-zinc-900"
        >
          close
        </button>
        <h2 className="clear-both text-3xl font-black tracking-tighter text-zinc-950">
          WALLY
        </h2>
        <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
          HOSTIA
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
          className="mt-6 w-full border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-300 focus:border-zinc-900"
        />
        <button
          type="submit"
          className="mt-3 w-full bg-zinc-950 px-4 py-3 text-[10px] uppercase tracking-[0.32em] text-white transition hover:bg-zinc-700"
        >
          submit
        </button>
      </form>
    </div>
  );
}
