"use client";
import { useEffect, useRef, useState } from "react";
import WelcomeModal from "@/components/WelcomeModal";
import Ticker from "@/components/Ticker";
import SignalCard from "@/components/SignalCard";

const SIGNAL_HISTORY = [
  { type: "BUY",  pair: "XAUUSD", entry: "$3,231.40", result: "+$17.40", win: true,  time: "09:12", score: 8 },
  { type: "SELL", pair: "XAUUSD", entry: "$3,255.20", result: "+$16.60", win: true,  time: "10:48", score: 7 },
  { type: "BUY",  pair: "USOIL",  entry: "$83.10",    result: "+$1.70",  win: true,  time: "11:30", score: 6 },
  { type: "SELL", pair: "XAUUSD", entry: "$3,261.00", result: "-$8.20",  win: false, time: "13:05", score: 5 },
  { type: "BUY",  pair: "XAUUSD", entry: "$3,244.80", result: "+$15.30", win: true,  time: "14:22", score: 9 },
];

function useCounter(end: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const step = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

export default function Home() {
  const accuracy = useCounter(83);
  const signals  = useCounter(11, 1200);
  const traders  = useCounter(2847, 2000);

  return (
    <>
      <WelcomeModal />

      {/* TICKER */}
      <Ticker />

      {/* NAV */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5"
        style={{ background: "rgba(5,7,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-syne font-extrabold text-base">Gold<span style={{ color: "#f59e0b" }}>Sniper</span> AI</span>
        </div>
        <div className="flex items-center gap-6">
          {["Señales","Precios","YouTube Live"].map((l) => (
            <a key={l} className="text-sm cursor-pointer" style={{ color: "#707890" }}>{l}</a>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="animate-livepulse rounded-full" style={{ width: 6, height: 6, background: "#22c55e" }} />
            <span className="font-mono text-xs" style={{ color: "#22c55e" }}>EN VIVO</span>
          </div>
          <button className="px-5 py-2.5 rounded-lg font-syne font-bold text-black text-sm"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
            Empezar Gratis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 py-20 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)"
        }} />
        {/* Orbs */}
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, background: "rgba(245,158,11,0.07)", borderRadius: "50%", filter: "blur(80px)", top: -200, left: -100 }} />
        <div className="absolute pointer-events-none" style={{ width: 400, height: 400, background: "rgba(245,100,11,0.05)", borderRadius: "50%", filter: "blur(80px)", top: -100, right: -100 }} />

        <div className="relative max-w-5xl mx-auto grid grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <div className="animate-livepulse rounded-full" style={{ width: 6, height: 6, background: "#22c55e" }} />
              <span className="font-mono text-xs" style={{ color: "#f59e0b", letterSpacing: "0.1em" }}>SISTEMA ACTIVO — XAUUSD $3,248.50</span>
            </div>
            <h1 className="font-syne font-extrabold leading-tight mb-5" style={{ fontSize: "clamp(38px,4.5vw,60px)", letterSpacing: "-0.04em" }}>
              <span className="text-white">Señales de Oro</span><br />
              <span className="gold-text">con Inteligencia</span><br />
              <span className="gold-text">Artificial</span>
            </h1>
            <p className="mb-8 leading-relaxed" style={{ fontSize: 16, color: "#707890", maxWidth: 440 }}>
              Sistema algorítmico con <strong style={{ color: "#f59e0b" }}>83% de precisión</strong> en XAUUSD y Petróleo.
              Señales BUY/SELL en tiempo real directo a tu Telegram. Transmisión en vivo en YouTube.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <button className="px-8 py-4 rounded-xl font-syne font-bold text-black"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontSize: 15 }}>
                🚀 7 Días Gratis
              </button>
              <button className="px-7 py-4 rounded-xl font-medium text-sm"
                style={{ background: "transparent", color: "#e0d9c8", border: "1px solid rgba(255,255,255,0.12)" }}>
                ▶ Ver en vivo
              </button>
            </div>
            <div className="flex gap-5 flex-wrap">
              {["Sin tarjeta de crédito", "Cancela cuando quieras", "Acceso inmediato"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: "#5a6070" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Signal Card */}
          <SignalCard />
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "36px 24px" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-6 text-center">
          {[
            { val: `${accuracy}%`, label: "Precisión promedio" },
            { val: `${signals}`, label: "Señales hoy" },
            { val: `${traders.toLocaleString()}`, label: "Traders activos" },
            { val: "24/7", label: "Monitoreo en vivo" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-syne font-extrabold gold-text" style={{ fontSize: "clamp(28px,4vw,44px)" }}>{s.val}</div>
              <div className="text-xs mt-1" style={{ color: "#5a6070" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNAL HISTORY */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block font-mono text-xs px-4 py-1.5 rounded-full mb-4"
            style={{ color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", letterSpacing: "0.14em" }}>HISTORIAL EN VIVO</div>
          <h2 className="font-syne font-extrabold text-white" style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.03em" }}>Cada señal. Cada resultado.</h2>
        </div>
        <div className="flex flex-col gap-2">
          {SIGNAL_HISTORY.map((s, i) => (
            <div key={i} className="animate-fadeup flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", animationDelay: `${i * 0.08}s` }}>
              <div className="min-w-12 text-center rounded-xl px-2 py-1.5"
                style={{ background: s.type === "BUY" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)" }}>
                <span className="font-syne font-bold text-sm" style={{ color: s.type === "BUY" ? "#22c55e" : "#ef4444" }}>{s.type}</span>
              </div>
              <div className="flex-1">
                <div className="font-mono text-sm text-white font-medium">{s.pair}</div>
                <div className="text-xs mt-0.5" style={{ color: "#5a6070" }}>Entrada {s.entry} · Score {s.score}/9</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-sm" style={{ color: s.win ? "#22c55e" : "#ef4444" }}>{s.result}</div>
                <div className="font-mono text-xs mt-0.5" style={{ color: "#3a4050" }}>Hoy {s.time}</div>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: s.win ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)" }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                  <path d={s.win ? "M20 6L9 17l-5-5" : "M18 6L6 18M6 6l12 12"} stroke={s.win ? "#22c55e" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 py-16" style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block font-mono text-xs px-4 py-1.5 rounded-full mb-4"
            style={{ color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", letterSpacing: "0.14em" }}>PLANES</div>
          <h2 className="font-syne font-extrabold text-white mb-2" style={{ fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-0.03em" }}>
            Empieza gratis. Escala cuando quieras.
          </h2>
          <p className="mb-12 text-sm" style={{ color: "#5a6070" }}>7 días de prueba completa. Sin tarjeta. Sin riesgo.</p>

          <div className="grid grid-cols-3 gap-4 text-left">
            {/* Free */}
            <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="font-mono text-xs mb-3" style={{ color: "#5a6070", letterSpacing: "0.1em" }}>GRATIS</div>
              <div className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 36 }}>$0<span className="text-sm font-normal" style={{ color: "#5a6070" }}>/mes</span></div>
              <div className="mb-6" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
              {["3 señales por día","Solo XAUUSD","App web"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2.5 text-sm" style={{ color: "#8090a0" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              {["Alertas Telegram","YouTube Members"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2.5 text-sm" style={{ color: "#3a4050", textDecoration: "line-through" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#3a4050" strokeWidth="2" strokeLinecap="round"/></svg>{f}
                </div>
              ))}
              <button className="w-full py-3.5 rounded-xl font-medium text-sm mt-5"
                style={{ background: "transparent", color: "#e0d9c8", border: "1px solid rgba(255,255,255,0.12)" }}>
                Empezar gratis
              </button>
            </div>

            {/* PRO */}
            <div className="rounded-2xl p-7 relative" style={{ background: "rgba(245,158,11,0.06)", border: "2px solid #f59e0b" }}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-syne font-extrabold text-black text-xs px-4 py-1.5 rounded-full"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", whiteSpace: "nowrap" }}>MÁS POPULAR</div>
              <div className="font-mono text-xs mb-3" style={{ color: "#f59e0b", letterSpacing: "0.1em" }}>PRO</div>
              <div className="font-syne font-extrabold text-white mb-1" style={{ fontSize: 36 }}>$29<span className="text-sm font-normal" style={{ color: "#a07030" }}>/mes</span></div>
              <div className="text-xs mb-4" style={{ color: "#6a5030" }}>o $249/año (ahorra 28%)</div>
              <div className="mb-6" style={{ height: 1, background: "rgba(245,158,11,0.15)" }} />
              {["Señales ilimitadas","XAUUSD + Petróleo","App web + móvil","Alertas Telegram","YouTube Members"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2.5 text-sm" style={{ color: "#e0d0a0" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              <button className="w-full py-3.5 rounded-xl font-syne font-bold text-black text-sm mt-5"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>7 días gratis →</button>
            </div>

            {/* Elite */}
            <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <div className="font-mono text-xs mb-3" style={{ color: "#a855f7", letterSpacing: "0.1em" }}>ELITE</div>
              <div className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 36 }}>$79<span className="text-sm font-normal" style={{ color: "#5a6070" }}>/mes</span></div>
              <div className="mb-6" style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
              {["Todo el plan Pro","Copytrade automático","Discord VIP + 1:1","Sesiones privadas","Soporte 24/7"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2.5 text-sm" style={{ color: "#c0b0e0" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              <button className="w-full py-3.5 rounded-xl font-medium text-sm mt-5"
                style={{ background: "transparent", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}>7 días gratis</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute pointer-events-none" style={{ width: 600, height: 300, background: "rgba(245,158,11,0.06)", borderRadius: "50%", filter: "blur(80px)", top: -50, left: "50%", transform: "translateX(-50%)" }} />
        <div className="relative max-w-xl mx-auto">
          <h2 className="font-syne font-extrabold text-white mb-3" style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.03em" }}>
            Empieza hoy.<br /><span className="gold-text">Gratis.</span>
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#5a6070" }}>7 días de acceso completo. Sin tarjeta de crédito.</p>
          <button className="px-14 py-5 rounded-xl font-syne font-bold text-black"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", fontSize: 17 }}>
            Crear cuenta gratis →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "20px 24px", textAlign: "center" }}>
        <span className="text-xs" style={{ color: "#3a4050" }}>© 2026 GoldSniper AI · Los mercados financieros implican riesgo. Invierte con responsabilidad.</span>
      </footer>
    </>
  );
}
