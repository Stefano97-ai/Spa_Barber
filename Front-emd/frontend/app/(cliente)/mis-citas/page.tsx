"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Cita {
  id: number;
  barbero: string;
  fecha: string;
  hora: string;
  total: number;
  estado: "CONFIRMADA" | "PENDIENTE_PAGO" | "COMPLETADA" | "CANCELADA";
  metodoPago: "ONLINE" | "PRESENCIAL";
  servicios?: Array<{ nombre: string; duracionMin: number; precio: number }>;
}

const DEFAULT_CITAS: Cita[] = [
  {
    id: 101,
    barbero: "Enzo Valentini",
    fecha: "2026-11-15",
    hora: "04:30 PM",
    total: 120.0,
    estado: "CONFIRMADA",
    metodoPago: "ONLINE",
    servicios: [{ nombre: "Servicio Completo Mercedez (Corte + Barba)", duracionMin: 75, precio: 120.0 }],
  },
  {
    id: 102,
    barbero: "Mateo Rossi",
    fecha: "2026-10-24",
    hora: "11:00 AM",
    total: 75.0,
    estado: "COMPLETADA",
    metodoPago: "ONLINE",
    servicios: [{ nombre: "Corte de Autor Signature", duracionMin: 45, precio: 75.0 }],
  },
  {
    id: 103,
    barbero: "Camilo Serrano",
    fecha: "2026-09-12",
    hora: "05:00 PM",
    total: 60.0,
    estado: "COMPLETADA",
    metodoPago: "PRESENCIAL",
    servicios: [{ nombre: "Ritual Barba Tradicional", duracionMin: 40, precio: 60.0 }],
  },
];

export default function MisCitasPage() {
  const [activeTab, setActiveTab] = useState<"proximas" | "historial">("proximas");
  const [citas, setCitas] = useState<Cita[]>(DEFAULT_CITAS);
  const [citaACancelar, setCitaACancelar] = useState<Cita | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mis_citas");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Unir con defaults evitando ids repetidos
          const combined = [...parsed, ...DEFAULT_CITAS.filter(d => !parsed.some(p => p.id === d.id))];
          setCitas(combined);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const citasProximas = citas.filter((c) => c.estado === "CONFIRMADA" || c.estado === "PENDIENTE_PAGO");
  const citasHistorial = citas.filter((c) => c.estado === "COMPLETADA" || c.estado === "CANCELADA");

  const confirmarCancelacion = () => {
    if (!citaACancelar) return;
    const actualizadas = citas.map((c) =>
      c.id === citaACancelar.id ? { ...c, estado: "CANCELADA" as const } : c
    );
    setCitas(actualizadas);
    localStorage.setItem("mis_citas", JSON.stringify(actualizadas));
    setCitaACancelar(null);
    setMensajeExito(
      citaACancelar.metodoPago === "ONLINE"
        ? "Cita cancelada con éxito. El reembolso total de S/ " + citaACancelar.total.toFixed(2) + " ha sido procesado a tu tarjeta vía Culqi."
        : "Cita cancelada correctamente sin cargos pendientes."
    );
    setTimeout(() => setMensajeExito(null), 6000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
            Mis Citas en el Atelier
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Gestiona tus visitas programadas, revisa el historial o califica tu experiencia.
          </p>
        </div>
        <Link
          href="/reservar"
          className="self-start sm:self-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
        >
          + Nueva Reserva
        </Link>
      </div>

      {/* Notificación de cancelación / reembolso */}
      {mensajeExito && (
        <div className="mb-6 p-4 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs rounded flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* Tabs: Próximas | Historial */}
      <div className="flex border-b border-neutral-800 mb-6">
        <button
          onClick={() => setActiveTab("proximas")}
          className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-all relative ${
            activeTab === "proximas" ? "text-amber-400" : "text-neutral-400 hover:text-white"
          }`}
        >
          Próximas Citas ({citasProximas.length})
          {activeTab === "proximas" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("historial")}
          className={`pb-3 px-6 text-xs uppercase tracking-widest font-semibold transition-all relative ${
            activeTab === "historial" ? "text-amber-400" : "text-neutral-400 hover:text-white"
          }`}
        >
          Historial & Reseñas ({citasHistorial.length})
          {activeTab === "historial" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
          )}
        </button>
      </div>

      {/* Listado de citas según Tab */}
      <div className="space-y-4">
        {(activeTab === "proximas" ? citasProximas : citasHistorial).map((cita) => (
          <div
            key={cita.id}
            className="p-5 bg-black/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                  cita.estado === "CONFIRMADA" ? "bg-emerald-950 border border-emerald-600/50 text-emerald-400" :
                  cita.estado === "PENDIENTE_PAGO" ? "bg-amber-950 border border-amber-600/50 text-amber-400" :
                  cita.estado === "COMPLETADA" ? "bg-neutral-800 text-neutral-300" :
                  "bg-red-950 border border-red-700/50 text-red-400"
                }`}>
                  {cita.estado.replace("_", " ")}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  #MCZ-{cita.id}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white">
                {cita.servicios ? cita.servicios.map(s => s.nombre).join(" + ") : "Servicio en Atelier"}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-2">
                <span className="text-white font-medium">✂️ Barbero: {cita.barbero}</span>
                <span className="text-neutral-700">|</span>
                <span className="text-[#dfb15b] font-medium">📅 {cita.fecha} · {cita.hora}</span>
                <span className="text-neutral-700">|</span>
                <span>S/ {cita.total.toFixed(2)} ({cita.metodoPago === "ONLINE" ? "Online Culqi" : "En caja"})</span>
              </div>
            </div>

            {/* Acciones por Cita */}
            <div className="flex items-center gap-3 sm:self-center shrink-0">
              {/* Opción Cancelar para citas activas */}
              {(cita.estado === "CONFIRMADA" || cita.estado === "PENDIENTE_PAGO") && (
                <button
                  onClick={() => setCitaACancelar(cita)}
                  className="px-3 py-1.5 border border-red-800/80 hover:bg-red-950/60 text-red-400 text-xs uppercase tracking-wider transition-colors"
                >
                  Cancelar Cita
                </button>
              )}

              {/* Opción Dejar Reseña para citas completadas */}
              {cita.estado === "COMPLETADA" && (
                <Link
                  href={`/mis-citas/${cita.id}/resena`}
                  className="px-3 py-1.5 border border-amber-500/70 hover:bg-amber-500 hover:text-black text-amber-400 text-xs uppercase tracking-wider transition-colors"
                >
                  ★ Calificar Cita
                </Link>
              )}
            </div>
          </div>
        ))}

        {(activeTab === "proximas" ? citasProximas : citasHistorial).length === 0 && (
          <div className="p-12 text-center border border-dashed border-neutral-800 text-neutral-500 text-xs">
            No tienes citas en esta sección.
          </div>
        )}
      </div>

      {/* Modal de Cancelación con Aviso de Reembolso */}
      {citaACancelar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-2">
              Confirmar Cancelación
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              ¿Estás seguro de que deseas cancelar tu cita del <strong>{citaACancelar.fecha}</strong> a las <strong>{citaACancelar.hora}</strong> con {citaACancelar.barbero}?
            </p>

            {/* Aviso de reembolso según canal */}
            <div className="p-3.5 bg-black/70 border border-amber-500/40 text-xs mb-6 space-y-1">
              <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px] block">
                {citaACancelar.metodoPago === "ONLINE" ? "Aviso de Reembolso Culqi:" : "Aviso de Cancelación:"}
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                {citaACancelar.metodoPago === "ONLINE"
                  ? `Se emitirá el reembolso automático del 100% (S/ ${citaACancelar.total.toFixed(2)}) al mismo método de pago en un plazo de 24 a 48 horas hábiles.`
                  : "Tu reserva presencial quedará liberada sin penalización."}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCitaACancelar(null)}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs"
              >
                Mantener Cita
              </button>
              <button
                onClick={confirmarCancelacion}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Sí, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

