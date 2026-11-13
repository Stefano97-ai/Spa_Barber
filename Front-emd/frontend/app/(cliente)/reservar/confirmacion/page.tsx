"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const [cita, setCita] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ultima_cita");
      if (stored) {
        setCita(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
      {/* Icono de Check de Lujo */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-500 bg-amber-500/10 flex items-center justify-center text-amber-500">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-bold">
        RESERVA REGISTRADA CON ÉXITO
      </span>
      <h1 className="mt-2 text-3xl font-serif text-white uppercase tracking-wider">
        ¡Te esperamos en el Atelier!
      </h1>
      <p className="mt-2 text-xs text-neutral-400 max-w-md mx-auto">
        Hemos guardado tu turno en la sede Miraflores. Te enviaremos un recordatorio por correo y SMS.
      </p>

      {/* Ticket / Credencial de la Cita */}
      <div className="mt-8 bg-black/70 border border-neutral-800 p-6 text-left relative overflow-hidden">
        <div className="flex justify-between items-start pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-neutral-500">Código de Cita</span>
            <p className="text-base font-mono font-bold text-amber-400">
              #MCZ-{cita ? cita.id.toString().slice(-5) : "89421"}
            </p>
          </div>
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            cita?.estado === "CONFIRMADA"
              ? "bg-emerald-950/70 border border-emerald-600/60 text-emerald-300"
              : "bg-amber-950/70 border border-amber-600/60 text-amber-300"
          }`}>
            {cita?.estado || "CONFIRMADA"}
          </span>
        </div>

        <div className="py-4 space-y-3 text-xs border-b border-neutral-800">
          <div className="flex justify-between">
            <span className="text-neutral-400">Profesional:</span>
            <span className="font-semibold text-white">{cita?.barbero || "Enzo Valentini"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Fecha y Hora:</span>
            <span className="font-semibold text-[#dfb15b]">
              {cita?.fecha || "2026-11-12"} · {cita?.hora || "03:00 PM"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Sede:</span>
            <span className="font-semibold text-white">Miraflores Atelier (Av. Santa Cruz 880)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Modalidad de Pago:</span>
            <span className="font-semibold text-white">
              {cita?.metodoPago === "ONLINE" ? "Online (Culqi - Pagado)" : "Presencial (Abonar en Sala)"}
            </span>
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center text-sm font-serif">
          <span className="text-neutral-300 uppercase">Monto Total</span>
          <span className="text-xl font-bold text-[#dfb15b]">
            S/ {cita ? Number(cita.total).toFixed(2) : "120.00"}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/mis-citas"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Ver en Mis Citas
        </Link>
        <Link
          href="/"
          className="px-6 py-3 border border-neutral-700 hover:border-neutral-500 text-white text-xs uppercase tracking-wider transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-400">Cargando confirmación...</div>}>
      <ConfirmacionContent />
    </Suspense>
  );
}

