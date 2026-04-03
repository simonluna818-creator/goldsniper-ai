"use client";
import { useEffect, useState } from "react";

const PAIRS = [
  { name: "XAUUSD", base: 3248.5, bull: true },
  { name: "USOIL",  base: 83.42,  bull: false },
  { name: "EURUSD", base: 1.0842, bull: true },
  { name: "GBPUSD", base: 1.2651, bull: false },
];

export default function Ticker() {
  const [prices, setPrices] = useState(PAIRS.map((p) => ({ ...p, price: p.base, chg: 0 })));

  useEffect(() => {
    const iv = setInterval(() => {
      setPrices((prev) =>
        prev.map((p) => {
          const delta = (Math.random() - 0.49) * (p.name === "XAUUSD" ? 0.8 : p.name === "USOIL" ? 0.05 : 0.0003);
          const price = p.price + delta;
          return { ...p, price, chg: price - p.base };
        })
      );
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const items = [...prices, ...prices];

  return (
    <div className="overflow-hidden" style={{ borderTop: "1px solid rgba(245,158,11,0.15)", borderBottom: "1px solid rgba(245,158,11,0.15)", background: "rgba(245,158,11,0.03)", padding: "7px 0" }}>
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {items.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8">
            <span className="font-mono text-xs" style={{ color: "#a07030" }}>{p.name}</span>
            <span className="font-mono text-sm font-semibold" style={{ color: "#f59e0b" }}>
              {p.name === "XAUUSD" ? `$${p.price.toFixed(2)}` : p.name === "USOIL" ? `$${p.price.toFixed(2)}` : p.price.toFixed(4)}
            </span>
            <span className="text-xs" style={{ color: p.chg >= 0 ? "#22c55e" : "#ef4444" }}>
              {p.chg >= 0 ? "+" : ""}{p.chg.toFixed(p.name === "EURUSD" || p.name === "GBPUSD" ? 4 : 2)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
