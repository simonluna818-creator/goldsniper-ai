# GoldSniper AI — Setup Guide

## Paso 1: Instalar dependencias

```bash
cd goldsniper
npm install
```

## Paso 2: Correr en desarrollo

```bash
npm run dev
```

Abre: http://localhost:3000

## Paso 3: Subir a GitHub

```bash
git init
git add .
git commit -m "GoldSniper AI v1"
git remote add origin TU_REPO_URL
git push -u origin main
```

## Paso 4: Deploy en Vercel

1. Ve a vercel.com
2. Click "Import Project"
3. Selecciona tu repo de GitHub
4. Click "Deploy"

¡Listo! Tu sitio estará en vivo en 2 minutos.

## Estructura del proyecto

```
goldsniper/
├── app/
│   ├── page.tsx          ← Landing page principal
│   ├── dashboard/
│   │   └── page.tsx      ← Dashboard de señales
│   ├── layout.tsx        ← Layout raíz con metadatos SEO
│   └── globals.css       ← Estilos globales y animaciones
├── components/
│   ├── WelcomeModal.tsx  ← Modal de bienvenida (4 pasos)
│   ├── Ticker.tsx        ← Ticker de precios en tiempo real
│   └── SignalCard.tsx    ← Tarjeta de señal con mini chart
└── README.md
```

## Próximos pasos (Fases 3-6)

- Fase 3: Supabase → supabase.com (login + base de datos)
- Fase 4: Stripe → stripe.com (pagos + trial 7 días)
- Fase 5: FastAPI + tu bot MT5 → Railway.app
- Fase 6: Bot de Telegram automático
