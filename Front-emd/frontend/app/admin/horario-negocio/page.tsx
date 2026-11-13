"use client";

import { useState } from "react";

interface HorarioDiaNegocio {
  id: number;
  diaSemana: string;
  abierto: boolean;
  horaApertura: string;
  horaCierre: string;
}

const HORARIO_NEGOCIO_DEFAULT: HorarioDiaNegocio[] = [
  { id: 1, diaSemana: "LUNES", abierto: true, horaApertura: "10:00", horaCierre: "20:00" },
  { id: 2, diaSemana: "MARTES", abierto: true, horaApertura: "10:00", horaCierre: "20:00" },
  { id: 3, diaSemana: "MIERCOLES", abierto: true, horaApertura: "10:00", horaCierre: "20:00" },
  { id: 4, diaSemana: "JUEVES", abierto: true, horaApertura: "10:00", horaCierre: "20:00" },
  { id: 5, diaSemana: "VIERNES", abierto: true, horaApertura: "10:00", horaCierre: "21:00" },
  { id: 6, diaSemana: "SABADO", abierto: true, horaApertura: "09:00", horaCierre: "21:00" },
  { id: 7, diaSemana: "DOMINGO", abierto: false, horaApertura: "10:00", horaCierre: "15:00" },
];

export default function AdminHorarioNegocioPage() {
  const [horarios, setHorarios] = useState<HorarioDiaNegocio[]>(HORARIO_NEGOCIO_DEFAULT);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const toggleAbierto = (id: number) => {
    setHorarios(
      horarios.map((h) => (h.id === id ? { ...h, abierto: !h.abierto } : h))
    );
  };

  const updateHora = (id: number, campo: "horaApertura" | "horaCierre", valor: string) => {
    setHorarios(
      horarios.map((h) => (h.id === id ? { ...h, [campo]: valor } : h))
    );
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar restricción CHECK de BD: hora_cierre > hora_apertura
    const invalido = horarios.find((h) => h.abierto && h.horaCierre <= h.horaApertura);
    if (invalido) {
      alert(`Error en ${invalido.diaSemana}: La hora de cierre debe ser posterior a la hora de apertura.`);
      return;
    }

    setMensaje("Horarios generales del Atelier actualizados en el sistema de reservas.");
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
          Horario de Atención del Atelier
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Define las ventanas operativas del local en Miraflores. Afecta los límites de reserva de todos los barberos.
        </p>
      </div>

      {mensaje && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs">
          ✓ {mensaje}
        </div>
      )}

      <form onSubmit={handleGuardar} className="space-y-4">
        <div className="bg-black/70 border border-neutral-800 divide-y divide-neutral-900 shadow-xl">
          {horarios.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                item.abierto ? "hover:bg-neutral-900/30" : "bg-neutral-950/80 opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.abierto}
                  onChange={() => toggleAbierto(item.id)}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-bold tracking-wider text-white w-28 uppercase">
                  {item.diaSemana}
                </span>
                <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                  item.abierto
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-neutral-800 text-neutral-400"
                }`}>
                  {item.abierto ? "Abierto al Público" : "Cerrado"}
                </span>
              </div>

              {item.abierto ? (
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-500 text-[10px] uppercase">Apertura:</span>
                    <input
                      type="time"
                      value={item.horaApertura}
                      onChange={(e) => updateHora(item.id, "horaApertura", e.target.value)}
                      className="bg-black border border-neutral-700 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                  <span className="text-neutral-600 font-bold">—</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-500 text-[10px] uppercase">Cierre:</span>
                    <input
                      type="time"
                      value={item.horaCierre}
                      onChange={(e) => updateHora(item.id, "horaCierre", e.target.value)}
                      className="bg-black border border-neutral-700 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <span className="text-xs text-neutral-600 italic">
                  Local no opera este día
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            Guardar Horarios del Negocio
          </button>
        </div>
      </form>
    </div>
  );
}

