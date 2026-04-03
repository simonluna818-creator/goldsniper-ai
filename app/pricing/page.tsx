"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const PLANS = [
  {
    id: "free",
    name: "Gratis",
    price: "$0",
    period: "/mes",
    color: "#8090a0",
    features: ["3 señales por día", "Solo XAUUSD", "App web"],
    missing: ["Alertas Telegram", "YouTube Members", "Discord"],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    id: "pro",
    name: "PRO",
    price: "$29",
    period: "/mes",
    yearPrice: "$249/año",
    color: "#f59e0b",
    features: ["Señales ilimitadas", "XAUUSD + Petróleo", "App web + móvil", "Alertas Telegram", "YouTube Members"],
    missing: ["Discord VIP 1:1"],
    cta: "Empezar — 7 días gratis",
    highlight: true,
  },
  {
    id: "elite",
    name: "ELITE",
    price: "$79",
    period: "/mes",
    color: "#a855f7",
    features: ["Todo el plan PRO", "Copytrade automático", "Discord VIP + 1:1", "Sesiones privadas", "Soporte 24/7"],
    missing: [],
    cta: "Empezar — 7 días gratis",
    highlight: false,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handlePlan(planId: string) {
    if (planId === "free") { router.push("/login"); return; }
    setLoading(planId);
    setError("");

    // Verificar si está logueado
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setError(data.error ?? "Error al procesar"); }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setLoading(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#05070f", color: "#fff", fontFamily: "Inter, sans-serif" }}>

      {/* Nav */}
      <nav style={{ padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>Gold<span style={{ color: "#f59e0b" }}>Sniper</span> AI</span>
        </a>
        <a href="/dashboard" style={{ fontSize: 13, color: "#707890", textDecoration: "none" }}>← Volver al dashboard</a>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", padding: "5px 14px", borderRadius: 100, marginBottom: 14, letterSpacing: "0.14em" }}>
            PLANES Y PRECIOS
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,50px)", letterSpacing: "-0.03em", marginBottom: 12 }}>
            Empieza gratis.<br />
            <span style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Escala cuando quieras.</span>
          </h1>
          <p style={{ fontSize: 15, color: "#5a6070" }}>7 días de prueba completa en PRO y ELITE. Sin tarjeta de crédito.</p>
        </div>

        {error && (
          <div style={{ maxWidth: 400, margin: "0 auto 24px", padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#ef4444", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {PLANS.map((p) => (
            <div key={p.id} style={{
              borderRadius: 20,
              padding: "28px 24px",
              background: p.highlight ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.03)",
              border: p.highlight ? "2px solid #f59e0b" : `1px solid rgba(${p.id === "elite" ? "168,85,247" : "255,255,255"},${p.id === "elite" ? "0.2" : "0.07"})`,
              position: "relative",
            }}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 11, padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
                  MÁS POPULAR
                </div>
              )}

              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: p.color, letterSpacing: "0.1em", marginBottom: 10 }}>{p.name}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 38, color: "#fff", marginBottom: 4 }}>
                {p.price}<span style={{ fontSize: 14, fontWeight: 400, color: "#5a6070" }}>{p.period}</span>
              </div>
              {p.yearPrice && <div style={{ fontSize: 12, color: "#6a5030", marginBottom: 4 }}>o {p.yearPrice} (ahorra 28%)</div>}

              <div style={{ height: 1, background: p.highlight ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.06)", margin: "18px 0" }} />

              {/* Features */}
              {p.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 10, color: p.highlight ? "#e0d0a0" : "#a0b0c0" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke={p.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </div>
              ))}
              {p.missing.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 10, color: "#3a4050", textDecoration: "line-through" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#3a4050" strokeWidth="2" strokeLinecap="round"/></svg>
                  {f}
                </div>
              ))}

              <button
                onClick={() => handlePlan(p.id)}
                disabled={loading === p.id}
                style={{
                  width: "100%", marginTop: 20, padding: "14px 0", borderRadius: 12, border: p.highlight ? "none" : `1px solid rgba(${p.id === "elite" ? "168,85,247,0.3" : "255,255,255,0.12"})`,
                  background: p.highlight ? "linear-gradient(135deg,#f59e0b,#d97706)" : "transparent",
                  color: p.highlight ? "#000" : p.id === "elite" ? "#a855f7" : "#e0d9c8",
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, cursor: loading === p.id ? "not-allowed" : "pointer",
                  opacity: loading === p.id ? 0.7 : 1,
                }}>
                {loading === p.id ? "Cargando..." : p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 40, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", text: "Pagos seguros con Stripe" },
            { icon: "❌", text: "Cancela cuando quieras" },
            { icon: "💳", text: "Sin cargos en el trial" },
          ].map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5a6070" }}>
              <span>{b.icon}</span>{b.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
