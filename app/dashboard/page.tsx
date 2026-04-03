"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [price, setPrice] = useState(3248.5);
  const [clock, setClock] = useState("");
  const [user, setUser] = useState<{ email?: string; plan?: string } | null>(null);
  const [daysLeft, setDaysLeft] = useState(7);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) { router.push("/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single();
      if (profile) {
        const days = profile.trial_ends_at
          ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / 86400000))
          : 0;
        setDaysLeft(days);
        setUser({ email: authUser.email, plan: profile.plan });
      }
    }
    loadUser();
    const pi = setInterval(() => setPrice((p) => p + (Math.random() - 0.48) * 0.8), 3000);
    const ci = setInterval(() => {
      const n = new Date();
      setClock(`${n.getUTCHours().toString().padStart(2,"0")}:${n.getUTCMinutes().toString().padStart(2,"0")}:${n.getUTCSeconds().toString().padStart(2,"0")} UTC`);
    }, 1000);
    return () => { clearInterval(pi); clearInterval(ci); };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#05070f", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(14,16,23,0.9)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16 }}>GoldSniper<span style={{ color: "#f59e0b" }}>AI</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#5a6070" }}>{clock}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#22c55e" }}>EN VIVO</span>
          </div>
          {daysLeft > 0 && (
            <span style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontFamily: "JetBrains Mono, monospace" }}>
              Trial: {daysLeft}d
            </span>
          )}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#f59e0b" }}>{user?.email?.[0]?.toUpperCase() ?? "U"}</span>
          </div>
          <button onClick={logout} style={{ fontSize: 12, color: "#5a6070", background: "none", border: "none", cursor: "pointer" }}>Salir</button>
        </div>
      </div>

      <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Precio XAUUSD", val: `$${price.toFixed(2)}`, color: "#f59e0b", sub: "+0.38% hoy" },
            { label: "Señal activa", val: "BUY", color: "#22c55e", sub: "Score 7/9" },
            { label: "Señales hoy", val: "11", color: "#fff", sub: "8 ganadoras" },
            { label: "Tu plan", val: (user?.plan ?? "free").toUpperCase(), color: "#a855f7", sub: `${daysLeft} días de trial` },
          ].map((m) => (
            <div key={m.label} style={{ borderRadius: 16, padding: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 12, color: "#5a6070", marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: m.color }}>{m.val}</div>
              <div style={{ fontSize: 11, color: "#3a4050", marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div style={{ borderRadius: 20, padding: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff" }}>XAUUSD M5</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#f59e0b" }}>${price.toFixed(2)}</span>
            </div>
            <div style={{ height: 280, borderRadius: 12, background: "#080b14", border: "1px solid rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ fontSize: 13, color: "#3a4050" }}>Conecta tu MT5 para ver el chart en vivo</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#2a3040" }}>Fase 5 → FastAPI + MT5</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ borderRadius: 20, padding: 20, background: "rgba(34,197,94,0.06)", border: "2px solid rgba(34,197,94,0.3)", textAlign: "center" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#4a7a5a", marginBottom: 4 }}>SEÑAL ACTIVA</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 42, color: "#22c55e", lineHeight: 1 }}>BUY</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#22c55e", marginBottom: 12 }}>Score 7/9</div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
                {[["Entrada", `$${price.toFixed(2)}`, "#e0d9c8"], ["TP", `$${(price + 19.3).toFixed(2)}`, "#22c55e"], ["SL", `$${(price - 10.3).toFixed(2)}`, "#ef4444"]].map(([l, v, c]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: "#5a6070" }}>{l}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 20, padding: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5a6070", letterSpacing: "0.08em", marginBottom: 12 }}>RAZONES TÉCNICAS</div>
              {["EMA9 > EMA21 > EMA50", "M15 alcista", "RSI zona OK", "ADX > 20", "MFI momentum +"].map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#22c55e", marginBottom: 8 }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>{r}
                </div>
              ))}
            </div>
            {daysLeft <= 3 && (
              <div style={{ borderRadius: 14, padding: 16, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)", textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600, marginBottom: 4 }}>Trial termina en {daysLeft} días</div>
                <button style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  Activar PRO — $29/mes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
