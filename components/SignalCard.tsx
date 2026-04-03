"use client";
import { useEffect, useRef, useState } from "react";

function drawMiniChart(canvas: HTMLCanvasElement, bullish: boolean) {
  const W = canvas.parentElement?.offsetWidth ?? 280;
  const H = 110;
  canvas.width = W - 32;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#080b14";
  ctx.fillRect(0, 0, canvas.width, H);

  const pts: number[] = [];
  let p = 3240;
  for (let i = 0; i < 30; i++) {
    const d = Math.random() < (bullish ? 0.58 : 0.42) ? 1 : -1;
    p += d * (Math.random() * 4 + 1.5);
    pts.push(p);
  }

  const mn = Math.min(...pts) - 2, mx = Math.max(...pts) + 2;
  const N = pts.length;
  const cw = Math.floor((canvas.width / N) * 0.55);
  const xs = (i: number) => (i + 0.5) * (canvas.width / N);
  const ys = (v: number) => H - 4 - ((v - mn) / (mx - mn)) * (H - 8);

  for (let i = 1; i < N; i++) {
    const bull = pts[i] >= pts[i - 1];
    const o = pts[i - 1], cl = pts[i];
    const wick = Math.random() * 1.5 + 0.5;
    const hi = Math.max(o, cl) + wick, lo = Math.min(o, cl) - wick;
    const col = bull ? "#26a69a" : "#ef5350";
    ctx.strokeStyle = col; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(xs(i), ys(hi)); ctx.lineTo(xs(i), ys(lo)); ctx.stroke();
    const by = ys(Math.max(o, cl)), bh = Math.max(1, ys(Math.min(o, cl)) - by);
    ctx.fillStyle = col; ctx.fillRect(xs(i) - cw / 2, by, cw, bh);
  }

  const lastY = ys(pts[N - 1]);
  ctx.strokeStyle = "rgba(245,158,11,0.5)"; ctx.lineWidth = 0.7; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, lastY); ctx.lineTo(canvas.width, lastY); ctx.stroke();
  ctx.setLineDash([]);
}

export default function SignalCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [price, setPrice] = useState(3248.5);
  const [clock, setClock] = useState("");

  useEffect(() => {
    if (canvasRef.current) drawMiniChart(canvasRef.current, true);
    const pi = setInterval(() => setPrice((p) => p + (Math.random() - 0.48) * 0.8), 3000);
    const ci = setInterval(() => {
      const n = new Date();
      setClock(`${n.getUTCHours().toString().padStart(2,"0")}:${n.getUTCMinutes().toString().padStart(2,"0")}:${n.getUTCSeconds().toString().padStart(2,"0")} UTC`);
    }, 1000);
    return () => { clearInterval(pi); clearInterval(ci); };
  }, []);

  return (
    <div className="animate-float rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.25)", background: "rgba(255,255,255,0.03)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(245,158,11,0.06)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2">
          <div className="animate-livepulse rounded-full" style={{ width: 8, height: 8, background: "#22c55e" }} />
          <span className="font-mono text-xs" style={{ color: "#a0a060" }}>GOLD SNIPER AI v3.1</span>
        </div>
        <span className="font-mono text-xs" style={{ color: "#5a6070" }}>{clock}</span>
      </div>

      <div className="p-4">
        {/* Price + Signal */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="font-mono text-xs mb-1" style={{ color: "#5a6070" }}>XAUUSD M5</div>
            <div className="font-mono text-2xl font-semibold" style={{ color: "#f59e0b" }}>${price.toFixed(2)}</div>
          </div>
          <div className="text-center rounded-xl px-4 py-2.5" style={{ background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)" }}>
            <div className="font-mono text-xs mb-1" style={{ color: "#4a7a5a" }}>SEÑAL</div>
            <div className="font-syne font-black text-xl" style={{ color: "#22c55e" }}>BUY</div>
            <div className="font-mono text-xs" style={{ color: "#22c55e" }}>7/9</div>
          </div>
        </div>

        {/* Chart */}
        <canvas ref={canvasRef} className="w-full rounded-lg mb-3 block" />

        {/* Entry / TP / SL */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "ENTRADA", val: `$${price.toFixed(0)}`, color: "#e0d9c8", bg: "rgba(255,255,255,0.03)", border: "transparent" },
            { label: "TP", val: `$${(price + 19.3).toFixed(0)}`, color: "#22c55e", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.15)" },
            { label: "SL", val: `$${(price - 10.3).toFixed(0)}`, color: "#ef4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.15)" },
          ].map((x) => (
            <div key={x.label} className="rounded-xl p-2 text-center" style={{ background: x.bg, border: `1px solid ${x.border}` }}>
              <div className="font-mono text-xs mb-1" style={{ color: "#5a6070" }}>{x.label}</div>
              <div className="font-mono text-sm font-semibold" style={{ color: x.color }}>{x.val}</div>
            </div>
          ))}
        </div>

        {/* Score bars */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: 4, background: i < 7 ? "#22c55e" : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>

        {/* Tags */}
        <div className="grid grid-cols-2 gap-1.5">
          {["EMA9 > EMA21 > EMA50", "M15: ALCISTA", "RSI 52.4 zona OK", "MFI momentum +"].map((t) => (
            <div key={t} className="font-mono text-xs px-2 py-1.5 rounded-lg" style={{ background: "rgba(34,197,94,0.05)", color: "#4a7a5a" }}>{t}</div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-4 py-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
        <span className="text-xs" style={{ color: "#5a6070" }}>Actualiza cada 3s</span>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>SESIÓN ACTIVA</span>
      </div>
    </div>
  );
}
