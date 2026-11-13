"use client";

import { useState } from "react";

interface HorarioDia {
  dia: string;
  activo: boolean;
  horaInicio: string;
  horaFin: string;
}

interface Bloqueo {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  motivo: string;
}

const HORARIO_SEMANAL_DEFAULT: HorarioDia[] = [
  { dia: "Lunes", activo: true, horaInicio: "10:00", horaFin: "20:00" },
  { dia: "Martes", activo: true, horaInicio: "10:00", horaFin: "20:00" },
  { dia: "Miércoles", activo: true, horaInicio: "10:00", horaFin: "20:00" },
  { dia: "Jueves", activo: true, horaInicio: "10:00", horaFin: "20:00" },
  { dia: "Viernes", activo: true, horaInicio: "10:00", horaFin: "20:00" },
  { dia: "Sábado", activo: true, horaInicio: "09:00", horaFin: "19:00" },
  { dia: "Domingo", activo: false, horaInicio: "10:00", horaFin: "14:00" },
];

const BLOQUEOS_DEFAULT: Bloqueo[] = [
  { id: 1, fecha: "2026-11-14", horaInicio: "14:00", horaFin: "16:00", motivo: "Cita médica programada" },
  { id: 2, fecha: "2026-11-18", horaInicio: "17:00", horaFin: "20:00", motivo: "Taller técnico de visagismo capilar" },
];

export default function BarberoHorarioPage() {
  const [horarios, setHorarios] = useState<HorarioDia[]>(HORARIO_SEMANAL_DEFAULT);
  const [bloqueos, setBloqueos] = useState<Bloqueo[]>(BLOQUEOS_DEFAULT);
  const [nuevoBloqueo, setNuevoBloqueo] = useState({
    fecha: "",
    horaInicio: "13:00",
    horaFin: "15:00",
    motivo: "",
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);

  const toggleDia = (dia: string) => {
    setHorarios(horarios.map((h) => (h.dia === dia ? { ...h, activo: !h.activo } : h)));
  };

  const handleCrearBloqueo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoBloqueo.fecha || !nuevoBloqueo.motivo) return;

    const b: Bloqueo = {
      id: Date.now(),
      fecha: nuevoBloqueo.fecha,
      horaInicio: nuevoBloqueo.horaInicio,
      horaFin: nuevoBloqueo.horaFin,
      motivo: nuevoBloqueo.motivo,
    };

    setBloqueos([...bloqueos, b]);
    setMostrarModal(false);
    setNuevoBloqueo({ fecha: "", horaInicio: "13:00", horaFin: "15:00", motivo: "" });
    setNotificacion("Bloqueo de horario registrado. Las reservas de clientes en este intervalo quedan deshabilitadas.");
    setTimeout(() => setNotificacion(null), 4000);
  };

  const eliminarBloqueo = (id: number) => {
    setBloqueos(bloqueos.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-serif text-white uppercase tracking-wider">
          Mi Horario Semanal & Bloqueos de Disponibilidad
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Configura tus días de atención regular y declara ausencias o permisos temporales.
        </p>
      </div>

      {notificacion && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs">
          ✓ {notificacion}
        </div>
      )}

      {/* SECCIÓN 1: HORARIO SEMANAL */}
      <section className="bg-black/60 border border-neutral-800 p-6">
        <h2 className="text-sm font-bold tracking-wider uppercase text-[#dfb15b] mb-4">
          Turnos Semanales Regulares
        </h2>

        <div className="space-y-3">
          {horarios.map((h) => (
            <div
              key={h.dia}
              className={`p-3.5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                h.activo ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-900 bg-neutral-950 opacity-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={h.activo}
                  onChange={() => toggleDia(h.dia)}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm font-semibold text-white w-28">{h.dia}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  h.activo ? "bg-emerald-950 text-emerald-400" : "bg-neutral-800 text-neutral-500"
                }`}>
                  {h.activo ? "Laborable" : "Descanso"}
                </span>
              </div>

              {h.activo ? (
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <span>Horario:</span>
                  <input
                    type="time"
                    value={h.horaInicio}
                    onChange={(e) =>
                      setHorarios(horarios.map((item) => item.dia === h.dia ? { ...item, horaInicio: e.target.value } : item))
                    }
                    className="bg-black border border-neutral-700 px-2 py-1 text-xs text-white"
                  />
                  <span>a</span>
                  <input
                    type="time"
                    value={h.horaFin}
                    onChange={(e) =>
                      setHorarios(horarios.map((item) => item.dia === h.dia ? { ...item, horaFin: e.target.value } : item))
                    }
                    className="bg-black border border-neutral-700 px-2 py-1 text-xs text-white"
                  />
                </div>
              ) : (
                <span className="text-xs text-neutral-600 italic">Sin agenda programada</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: BLOQUEOS DE DISPONIBILIDAD */}
      <section className="bg-black/60 border border-neutral-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-[#dfb15b]">
              Bloqueos de Disponibilidad
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Franjas donde los clientes no podrán agendar citas.
            </p>
          </div>
          <button
            onClick={() => setMostrarModal(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
          >
            + Agregar Bloqueo
          </button>
        </div>

        <div className="space-y-3">
          {bloqueos.map((b) => (
            <div
              key={b.id}
              className="p-4 border border-neutral-800 bg-neutral-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white font-mono">📅 {b.fecha}</span>
                  <span className="text-xs text-amber-400 font-mono">
                    ({b.horaInicio} - {b.horaFin})
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Motivo: <strong className="text-neutral-200">{b.motivo}</strong>
                </p>
              </div>

              <button
                onClick={() => eliminarBloqueo(b.id)}
                className="self-end sm:self-auto text-xs text-red-400 hover:text-red-300 border border-red-900 px-2.5 py-1"
              >
                Eliminar
              </button>
            </div>
          ))}

          {bloqueos.length === 0 && (
            <div className="p-8 text-center text-xs text-neutral-500 border border-dashed border-neutral-800">
              No tienes bloqueos registrados.
            </div>
          )}
        </div>
      </section>

      {/* Modal para crear Bloqueo */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 p-6 max-w-md w-full">
            <h3 className="text-base font-serif text-white uppercase tracking-wider mb-4">
              Nuevo Bloqueo de Disponibilidad
            </h3>
            <form onSubmit={handleCrearBloqueo} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={nuevoBloqueo.fecha}
                  onChange={(e) => setNuevoBloqueo({ ...nuevoBloqueo, fecha: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    required
                    value={nuevoBloqueo.horaInicio}
                    onChange={(e) => setNuevoBloqueo({ ...nuevoBloqueo, horaInicio: e.target.value })}
                    className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    required
                    value={nuevoBloqueo.horaFin}
                    onChange={(e) => setNuevoBloqueo({ ...nuevoBloqueo, horaFin: e.target.value })}
                    className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Motivo del Bloqueo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cita médica, almuerzo prolongado, viaje..."
                  value={nuevoBloqueo.motivo}
                  onChange={(e) => setNuevoBloqueo({ ...nuevoBloqueo, motivo: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="px-4 py-2 border border-neutral-700 text-xs text-neutral-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
                >
                  Guardar Bloqueo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

