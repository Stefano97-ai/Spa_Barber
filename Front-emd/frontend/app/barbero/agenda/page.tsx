"use client";

import { useState } from "react";

interface CitaBarbero {
  id: number;
  cliente: string;
  telefono: string;
  servicio: string;
  duracionMin: number;
  hora: string;
  dia: string;
  estado: "CONFIRMADA" | "COMPLETADA" | "CANCELADA";
  notas?: string;
}

const CITAS_INICIALES: CitaBarbero[] = [
  {
    id: 201,
    cliente: "Carlos Mendoza",
    telefono: "+51 981 123 456",
    servicio: "Corte de Autor Signature",
    duracionMin: 45,
    hora: "10:00 AM",
    dia: "Hoy",
    estado: "CONFIRMADA",
    notas: "Prefiere tijera arriba y navaja baja en cuello.",
  },
  {
    id: 202,
    cliente: "Diego Arriola",
    telefono: "+51 945 999 111",
    servicio: "Ritual Barba Tradicional",
    duracionMin: 40,
    hora: "11:30 AM",
    dia: "Hoy",
    estado: "CONFIRMADA",
    notas: "Piel sensible, aplicar aceite pre-shave con cuidado.",
  },
  {
    id: 203,
    cliente: "Rodrigo Palacios",
    telefono: "+51 962 888 777",
    servicio: "Servicio Completo Mercedez",
    duracionMin: 75,
    hora: "03:00 PM",
    dia: "Hoy",
    estado: "COMPLETADA",
    notas: "Cliente regular.",
  },
  {
    id: 204,
    cliente: "Esteban Morales",
    telefono: "+51 912 345 678",
    servicio: "Limpieza Facial Profunda",
    duracionMin: 50,
    hora: "04:30 PM",
    dia: "Hoy",
    estado: "CONFIRMADA",
  },
  {
    id: 205,
    cliente: "Sebastián Benavides",
    telefono: "+51 977 444 333",
    servicio: "Corte de Autor Signature",
    duracionMin: 45,
    hora: "11:00 AM",
    dia: "Mañana",
    estado: "CONFIRMADA",
  },
  {
    id: 206,
    cliente: "Fernando Quiroga",
    telefono: "+51 998 777 666",
    servicio: "Ritual Barba Tradicional",
    duracionMin: 40,
    hora: "04:00 PM",
    dia: "Mañana",
    estado: "CONFIRMADA",
  },
];

export default function BarberoAgendaPage() {
  const [periodo, setPeriodo] = useState<"hoy" | "semana">("hoy");
  const [vista, setVista] = useState<"lista" | "calendario">("lista");
  const [citas, setCitas] = useState<CitaBarbero[]>(CITAS_INICIALES);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const citasFiltradas = periodo === "hoy"
    ? citas.filter((c) => c.dia === "Hoy")
    : citas;

  const marcarCompletada = (id: number) => {
    setCitas(citas.map((c) => (c.id === id ? { ...c, estado: "COMPLETADA" } : c)));
    setMensaje("Cita marcada como COMPLETADA. Se ha habilitado la solicitud de reseña al cliente.");
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Controles de Vista y Periodo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-serif text-white uppercase tracking-wider">
            Agenda del Maestro Barbero
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            {periodo === "hoy" ? "Citas programadas para la jornada de hoy" : "Planificación completa de la semana"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Selector Hoy / Semana */}
          <div className="flex bg-neutral-900 border border-neutral-800 p-0.5">
            <button
              onClick={() => setPeriodo("hoy")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                periodo === "hoy" ? "bg-amber-500 text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Hoy ({citas.filter((c) => c.dia === "Hoy").length})
            </button>
            <button
              onClick={() => setPeriodo("semana")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors ${
                periodo === "semana" ? "bg-amber-500 text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Semana ({citas.length})
            </button>
          </div>

          {/* Selector Lista / Calendario */}
          <div className="flex bg-neutral-900 border border-neutral-800 p-0.5">
            <button
              onClick={() => setVista("lista")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                vista === "lista" ? "bg-neutral-800 text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setVista("calendario")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                vista === "calendario" ? "bg-neutral-800 text-white font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              Calendario
            </button>
          </div>
        </div>
      </div>

      {mensaje && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs flex items-center gap-2">
          <span>✓ {mensaje}</span>
        </div>
      )}

      {/* VISTA 1: LISTA */}
      {vista === "lista" && (
        <div className="space-y-3">
          {citasFiltradas.map((cita) => (
            <div
              key={cita.id}
              className={`p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                cita.estado === "COMPLETADA"
                  ? "bg-neutral-900/30 border-neutral-800/60 opacity-75"
                  : "bg-black/60 border-neutral-800 hover:border-amber-500/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-center px-3 py-2 bg-neutral-900 border border-neutral-800 shrink-0">
                  <span className="text-sm font-bold font-mono text-[#dfb15b] block">
                    {cita.hora}
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    {cita.duracionMin} min
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-white">{cita.cliente}</h3>
                    <span className="text-xs text-neutral-500 font-mono">{cita.telefono}</span>
                    <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                      cita.estado === "COMPLETADA"
                        ? "bg-neutral-800 text-neutral-400"
                        : "bg-emerald-950 text-emerald-400 border border-emerald-700/50"
                    }`}>
                      {cita.estado}
                    </span>
                  </div>

                  <p className="text-xs text-amber-400 font-medium">{cita.servicio}</p>

                  {cita.notas && (
                    <p className="text-[11px] text-neutral-400 mt-1 italic">
                      Nota: &ldquo;{cita.notas}&rdquo;
                    </p>
                  )}
                </div>
              </div>

              {/* Botón Acción: Marcar Completada */}
              <div className="shrink-0 flex items-center gap-3">
                {cita.estado !== "COMPLETADA" ? (
                  <button
                    onClick={() => marcarCompletada(cita.id)}
                    className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                  >
                    ✓ Marcar Completada
                  </button>
                ) : (
                  <span className="text-xs text-neutral-500 italic">
                    Servicio finalizado ✓
                  </span>
                )}
              </div>
            </div>
          ))}

          {citasFiltradas.length === 0 && (
            <div className="p-12 text-center border border-dashed border-neutral-800 text-neutral-500 text-xs">
              No hay citas programadas para este periodo.
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: CALENDARIO */}
      {vista === "calendario" && (
        <div className="bg-black/60 border border-neutral-800 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((dia, idx) => (
              <div key={dia} className="border border-neutral-800/80 p-3 bg-neutral-900/40 min-h-[220px]">
                <div className="text-xs font-bold text-[#dfb15b] uppercase tracking-wider pb-2 border-b border-neutral-800 mb-3">
                  {dia} {idx === 2 ? "(Hoy)" : ""}
                </div>

                <div className="space-y-2">
                  {idx === 2 ? (
                    citasFiltradas.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-2 bg-black border border-neutral-800 text-[11px]">
                        <span className="text-amber-400 font-bold block">{c.hora}</span>
                        <span className="text-white truncate block">{c.cliente}</span>
                        <span className="text-[10px] text-neutral-400 truncate block">{c.servicio}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[10px] text-neutral-600 block mt-4 text-center">
                      Turnos regulares
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

