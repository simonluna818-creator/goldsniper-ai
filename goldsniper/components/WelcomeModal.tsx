"use client";
import { useState, useEffect } from "react";
import { Zap, Send, Youtube, Clock, X, Check } from "lucide-react";

const STEPS = [
  {
    title: "Bienvenido a GoldSniper AI",
    sub: "Tu plataforma de señales profesional con inteligencia artificial.",
  },
  {
    title: "Elige tu plan",
    sub: "Empieza con 7 días gratis. Cambia o cancela cuando quieras.",
  },
  {
    title: "Configura tus alertas",
    sub: "Decide cómo quieres recibir las señales en tiempo real.",
  },
  {
    title: "¡Todo listo!",
    sub: "",
  },
];

const FEATURES = [
  { icon: Zap, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", title: "Señales BUY/SELL en tiempo real", desc: "Algoritmo con 83% de precisión en XAUUSD y Petróleo. Señal en segundos." },
  { icon: Send, color: "#22c55e", bg: "rgba(34,197,94,0.1)", title: "Alertas directas a tu Telegram", desc: "Recibe cada señal al instante en tu teléfono. Nunca pierdas una entrada." },
  { icon: Youtube, color: "#ef4444", bg: "rgba(239,68,68,0.1)", title: "Transmisión en vivo en YouTube", desc: "Análisis del mercado en tiempo real con membresías exclusivas." },
  { icon: Clock, color: "#a855f7", bg: "rgba(139,92,246,0.1)", title: "7 días completamente gratis", desc: "Acceso completo sin tarjeta de crédito. Cancela cuando quieras." },
];

const PLANS = [
  { id: "pro", label: "MÁS POPULAR", name: "Plan PRO — $29/mes", desc: "Señales ilimitadas · Telegram · YouTube Members · XAUUSD + Petróleo", popular: true },
  { id: "elite", label: "", name: "Plan ELITE — $79/mes", desc: "Todo PRO + Copytrade automático · Discord VIP · Soporte 24/7", popular: false },
  { id: "free", label: "", name: "Gratis — $0/mes", desc: "3 señales/día · Solo XAUUSD · Sin alertas", popular: false },
];

const ALERTS = [
  { id: "telegram", color: "#22c55e", bg: "rgba(34,197,94,0.1)", title: "Alertas Telegram", desc: "Señales en tiempo real al instante", default: true },
  { id: "push", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", title: "Notificaciones push", desc: "Alertas en el navegador", default: true },
  { id: "youtube", color: "#ef4444", bg: "rgba(239,68,68,0.1)", title: "YouTube Live — recordatorios", desc: "Aviso antes de cada transmisión", default: false },
  { id: "summary", color: "#a855f7", bg: "rgba(139,92,246,0.1)", title: "Resumen diario", desc: "Resultado de señales del día", default: true },
];

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState("pro");
  const [alerts, setAlerts] = useState<Record<string, boolean>>({
    telegram: true, push: true, youtube: false, summary: true,
  });

  useEffect(() => {
    const seen = localStorage.getItem("gs_welcome_seen");
    if (!seen) { setOpen(true); }
  }, []);

  function close() {
    localStorage.setItem("gs_welcome_seen", "1");
    setOpen(false);
  }

  function next() { setStep((s) => Math.min(s + 1, 3)); }
  function prev() { setStep((s) => Math.max(s - 1, 0)); }
  function toggleAlert(id: string) { setAlerts((a) => ({ ...a, [id]: !a[id] })); }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="animate-modal w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#0e1017", border: "1px solid rgba(245,158,11,0.2)" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.1),rgba(245,158,11,0.03))", borderBottom: "1px solid rgba(245,158,11,0.1)" }}>
          <div className="flex justify-center gap-1.5 pt-5 pb-0 px-6">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === step ? 20 : 7, background: i < step ? "rgba(245,158,11,0.4)" : i === step ? "#f59e0b" : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
          <div className="text-center px-6 py-5">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#f59e0b,#92400e)", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-syne font-bold text-xl text-white mb-1">{STEPS[step].title}</h2>
            {STEPS[step].sub && <p className="text-sm" style={{ color: "#8090a8" }}>{STEPS[step].sub}</p>}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Step 0 — Welcome */}
          {step === 0 && (
            <div className="animate-step">
              <div className="flex flex-col divide-y mb-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex gap-3 py-3.5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: f.bg }}>
                      <f.icon size={20} color={f.color} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{f.title}</div>
                      <div className="text-xs leading-relaxed" style={{ color: "#5a6878" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-syne font-bold text-black text-sm"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                Empezar ahora →
              </button>
              <button onClick={close} className="w-full py-2.5 mt-2 rounded-xl text-sm"
                style={{ background: "transparent", color: "#8090a8", border: "1px solid rgba(255,255,255,0.07)" }}>
                Explorar primero sin registrarme
              </button>
            </div>
          )}

          {/* Step 1 — Plan */}
          {step === 1 && (
            <div className="animate-step">
              <div className="flex flex-col gap-2.5 mb-4">
                {PLANS.map((p) => (
                  <div key={p.id} onClick={() => setPlan(p.id)} className="relative rounded-xl p-4 cursor-pointer transition-all duration-200"
                    style={{
                      border: plan === p.id ? "1.5px solid #f59e0b" : "1px solid rgba(255,255,255,0.08)",
                      background: plan === p.id ? "rgba(245,158,11,0.06)" : "transparent",
                    }}>
                    {p.popular && (
                      <span className="text-xs font-mono mb-1 block" style={{ color: "#f59e0b" }}>MÁS POPULAR</span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-syne font-bold text-white text-sm">{p.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#8090a8" }}>{p.desc}</div>
                      </div>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: plan === p.id ? "#f59e0b" : "transparent", border: plan === p.id ? "none" : "1.5px solid rgba(255,255,255,0.15)" }}>
                        {plan === p.id && <Check size={11} color="#000" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs mb-3" style={{ color: "#4a5568" }}>7 días gratis en PRO y ELITE · Sin tarjeta de crédito</p>
              <button onClick={next} className="w-full py-4 rounded-xl font-syne font-bold text-black text-sm"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>Continuar →</button>
              <button onClick={prev} className="w-full py-2.5 mt-2 rounded-xl text-sm"
                style={{ background: "transparent", color: "#8090a8", border: "1px solid rgba(255,255,255,0.07)" }}>← Volver</button>
            </div>
          )}

          {/* Step 2 — Alerts */}
          {step === 2 && (
            <div className="animate-step">
              <div className="flex flex-col gap-2 mb-5">
                {ALERTS.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: a.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{a.title}</div>
                        <div className="text-xs" style={{ color: "#5a6878" }}>{a.desc}</div>
                      </div>
                    </div>
                    <div onClick={() => toggleAlert(a.id)} className="cursor-pointer rounded-xl relative flex-shrink-0"
                      style={{ width: 44, height: 24, background: alerts[a.id] ? "#f59e0b" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }}>
                      <div style={{
                        position: "absolute", top: 3, left: alerts[a.id] ? "calc(100% - 21px)" : 3,
                        width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={next} className="w-full py-4 rounded-xl font-syne font-bold text-black text-sm"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>Guardar preferencias →</button>
              <button onClick={prev} className="w-full py-2.5 mt-2 rounded-xl text-sm"
                style={{ background: "transparent", color: "#8090a8", border: "1px solid rgba(255,255,255,0.07)" }}>← Volver</button>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === 3 && (
            <div className="animate-step text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)" }}>
                <Check size={28} color="#22c55e" strokeWidth={2.5} />
              </div>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "#8090a8" }}>
                Tu cuenta tiene <strong style={{ color: "#f59e0b" }}>7 días gratis</strong> del plan {plan.toUpperCase()}.<br />
                Las señales ya están activas en tiempo real.
              </p>
              <div className="rounded-xl p-4 mb-5 text-left"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  ["Plan activo", `${plan.toUpperCase()} — 7 días gratis`, "#f59e0b"],
                  ["Señal actual", "BUY XAUUSD $3,248.50", "#22c55e"],
                  ["Telegram", "Activado", "#22c55e"],
                ].map(([label, val, color], i) => (
                  <div key={i}>
                    {i > 0 && <div className="my-2" style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />}
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: "#8090a8" }}>{label}</span>
                      <span className="text-xs font-mono" style={{ color }}>{val}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={close} className="w-full py-4 rounded-xl font-syne font-bold text-black text-sm"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                Ir al dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
