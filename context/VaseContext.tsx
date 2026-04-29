"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const COLLECTIBLE_VASE_IDS = [
  "home-flame-vase",
  "rotating-vase",
  "wick-vase",
] as const;

export const TOTAL_VASES = COLLECTIBLE_VASE_IDS.length;

type VaseContextValue = {
  collected: string[];
  collectVase: (id: string) => void;
  isCollected: (id: string) => boolean;
};

const STORAGE_KEY = "jijijii-session-collected-vases";
const validVaseIds = new Set<string>(COLLECTIBLE_VASE_IDS);

const VaseContext = createContext<VaseContextValue | null>(null);

export function VaseProvider({ children }: { children: ReactNode }) {
  const [collected, setCollected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCollected(parsed.filter((id) => validVaseIds.has(id)));
        }
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(collected));
  }, [collected, ready]);

  const value = useMemo<VaseContextValue>(
    () => ({
      collected,
      collectVase: (id) => {
        if (!validVaseIds.has(id)) return;
        setCollected((current) =>
          current.includes(id) ? current : [...current, id]
        );
      },
      isCollected: (id) => collected.includes(id),
    }),
    [collected]
  );

  return <VaseContext.Provider value={value}>{children}</VaseContext.Provider>;
}

export function useVases() {
  const context = useContext(VaseContext);
  if (!context) {
    throw new Error("useVases must be used inside VaseProvider");
  }
  return context;
}
