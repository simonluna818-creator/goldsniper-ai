"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeModal from "@/components/WelcomeModal";
import Ticker from "@/components/Ticker";
import SignalCard from "@/components/SignalCard";

const HISTORY = [
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
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return val;
}

export default function Home() {
  const router = useRouter();
  const accuracy = useCounter(83);
  const signals = useCounter(11, 1200);
  const traders = useCounter(2847, 2000);
  const go = (path: string) => router.push(path);

  return (
    <>
      <WelcomeModal />
      <Ticker />

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: "rgba(5,7,15,0.9)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>Gold<span style={{ color: "#f59e0b" }}>Sniper</span> AI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a onClick={() => go("/pricing")} style={{ fontSize: 13, color: "#707890", cursor: "pointer" }}>Precios</a>
          <a onClick={() => go("/login")} style={{ fontSize: 13, color: "#707890", cursor: "pointer" }}>Dashboard</a>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#22c55e" }}>EN VIVO</span>
          </div>
          <button onClick={() => go("/login")}
            style={{ padding: "10px 20px", borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
            Empezar Gratis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "80px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, background: "rgba(245,158,11,0.07)", borderRadius: "50%", filter: "blur(80px)", top: -200, left: -100, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#f59e0b", letterSpacing: "0.1em" }}>SISTEMA ACTIVO — XAUUSD $3,248.50</span>
            </div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(38px,4.5vw,60px)", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: 20 }}>
              <span style={{ color: "#fff" }}>Señales de Oro</span><br />
              <span className="gold-text">con Inteligencia</span><br />
              <span className="gold-text">Artificial</span>
            </h1>
            <p style={{ fontSize: 16, color: "#707890", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
              Sistema algorítmico con <strong style={{ color: "#f59e0b" }}>83% de precisión</strong> en XAUUSD y Petróleo. Señales BUY/SELL en tiempo real directo a tu Telegram.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <button onClick={() => go("/login")}
                style={{ padding: "16px 36px", borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
                🚀 7 Días Gratis
              </button>
              <button onClick={() => window.open("https://youtube.com", "_blank")}
                style={{ padding: "16px 28px", borderRadius: 12, background: "transparent", color: "#e0d9c8", border: "1px solid rgba(255,255,255,0.12)", fontSize: 14, cursor: "pointer" }}>
                ▶ Ver en vivo
              </button>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Sin tarjeta de crédito", "Cancela cuando quieras", "Acceso inmediato"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5a6070" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </div>
              ))}
            </div>
          </div>
          <SignalCard />
        </div>
      </section>

      {/* STATS */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", padding: "36px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {[{ val: `${accuracy}%`, label: "Precisión promedio" }, { val: `${signals}`, label: "Señales hoy" }, { val: traders.toLocaleString(), label: "Traders activos" }, { val: "24/7", label: "Monitoreo en vivo" }].map((s) => (
            <div key={s.label}>
              <div className="gold-text" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)" }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#5a6070", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORIAL */}
      <section style={{ padding: "64px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", padding: "5px 14px", borderRadius: 100, marginBottom: 14, letterSpacing: "0.14em" }}>HISTORIAL EN VIVO</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,42px)", color: "#fff", letterSpacing: "-0.03em" }}>Cada señal. Cada resultado.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {HISTORY.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ minWidth: 48, textAlign: "center", padding: "4px 8px", borderRadius: 8, background: s.type === "BUY" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)" }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: s.type === "BUY" ? "#22c55e" : "#ef4444" }}>{s.type}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#fff", fontWeight: 500 }}>{s.pair}</div>
                <div style={{ fontSize: 11, color: "#5a6070", marginTop: 2 }}>Entrada {s.entry} · Score {s.score}/9</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 14, color: s.win ? "#22c55e" : "#ef4444" }}>{s.result}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#3a4050", marginTop: 2 }}>Hoy {s.time}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.win ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d={s.win ? "M20 6L9 17l-5-5" : "M18 6L6 18M6 6l12 12"} stroke={s.win ? "#22c55e" : "#ef4444"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "64px 24px", background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", padding: "5px 14px", borderRadius: 100, marginBottom: 14, letterSpacing: "0.14em" }}>PLANES</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,3.5vw,42px)", color: "#fff", marginBottom: 8, letterSpacing: "-0.03em" }}>Empieza gratis. Escala cuando quieras.</h2>
          <p style={{ fontSize: 15, color: "#5a6070", marginBottom: 44 }}>7 días de prueba completa. Sin tarjeta. Sin riesgo.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "left" }}>
            {/* FREE */}
            <div style={{ borderRadius: 20, padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#5a6070", letterSpacing: "0.1em", marginBottom: 10 }}>GRATIS</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 38, color: "#fff", marginBottom: 16 }}>$0<span style={{ fontSize: 14, fontWeight: 400, color: "#5a6070" }}>/mes</span></div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
              {["3 señales por día", "Solo XAUUSD", "App web"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8090a0", marginBottom: 10 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              {["Alertas Telegram", "YouTube Members"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3a4050", textDecoration: "line-through", marginBottom: 10 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#3a4050" strokeWidth="2" strokeLinecap="round"/></svg>{f}
                </div>
              ))}
              <button onClick={() => go("/login")} style={{ width: "100%", padding: "14px 0", borderRadius: 12, background: "transparent", color: "#e0d9c8", border: "1px solid rgba(255,255,255,0.12)", fontSize: 14, cursor: "pointer", marginTop: 20 }}>
                Empezar gratis
              </button>
            </div>
            {/* PRO */}
            <div style={{ borderRadius: 20, padding: 28, background: "rgba(245,158,11,0.06)", border: "2px solid #f59e0b", position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 11, padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap" }}>MÁS POPULAR</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#f59e0b", letterSpacing: "0.1em", marginBottom: 10 }}>PRO</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 38, color: "#fff", marginBottom: 4 }}>$29<span style={{ fontSize: 14, fontWeight: 400, color: "#a07030" }}>/mes</span></div>
              <div style={{ fontSize: 12, color: "#6a5030", marginBottom: 16 }}>o $249/año (ahorra 28%)</div>
              <div style={{ height: 1, background: "rgba(245,158,11,0.15)", marginBottom: 20 }} />
              {["Señales ilimitadas", "XAUUSD + Petróleo", "App web + móvil", "Alertas Telegram", "YouTube Members"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#e0d0a0", marginBottom: 10 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              <button onClick={() => go("/pricing")} style={{ width: "100%", padding: "14px 0", borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", marginTop: 20 }}>
                7 días gratis →
              </button>
            </div>
            {/* ELITE */}
            <div style={{ borderRadius: 20, padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#a855f7", letterSpacing: "0.1em", marginBottom: 10 }}>ELITE</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 38, color: "#fff", marginBottom: 16 }}>$79<span style={{ fontSize: 14, fontWeight: 400, color: "#5a6070" }}>/mes</span></div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
              {["Todo el plan Pro", "Copytrade automático", "Discord VIP + 1:1", "Sesiones privadas", "Soporte 24/7"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#c0b0e0", marginBottom: 10 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>{f}
                </div>
              ))}
              <button onClick={() => go("/pricing")} style={{ width: "100%", padding: "14px 0", borderRadius: 12, background: "transparent", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)", fontSize: 14, cursor: "pointer", marginTop: 20 }}>
                7 días gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 600, height: 300, background: "rgba(245,158,11,0.06)", borderRadius: "50%", filter: "blur(80px)", top: -50, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 580, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.03em", color: "#fff", marginBottom: 12 }}>
            Empieza hoy.<br /><span className="gold-text">Gratis.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#5a6070", marginBottom: 36 }}>7 días de acceso completo. Sin tarjeta de crédito.</p>
          <button onClick={() => go("/login")}
            style={{ padding: "20px 56px", borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, border: "none", cursor: "pointer" }}>
            Crear cuenta gratis →
          </button>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "20px 24px", textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "#3a4050" }}>© 2026 GoldSniper AI · Los mercados financieros implican riesgo. Invierte con responsabilidad.</span>
      </footer>
    </>
  );
}
