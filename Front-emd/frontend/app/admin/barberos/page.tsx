"use client";

import { useState } from "react";

interface BarberoAdmin {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  especialidad: string;
  calificacionPromedio: number;
  fotoUrl: string;
  activo: boolean;
  fechaIngreso: string;
}

const BARBEROS_ADMIN_DEFAULT: BarberoAdmin[] = [
  {
    id: 1,
    nombre: "Enzo Valentini",
    email: "enzo.valentini@mercedez.com",
    telefono: "+51 988 111 222",
    especialidad: "Master Barber · Visagismo & Cortes de Autor",
    calificacionPromedio: 4.9,
    fotoUrl: "🧔🏻",
    activo: true,
    fechaIngreso: "2021-03-15",
  },
  {
    id: 2,
    nombre: "Mateo Rossi",
    email: "mateo.rossi@mercedez.com",
    telefono: "+51 977 222 333",
    especialidad: "Especialista en Afeitado Tradicional a Navaja",
    calificacionPromedio: 4.8,
    fotoUrl: "🧔🏼",
    activo: true,
    fechaIngreso: "2022-07-01",
  },
  {
    id: 3,
    nombre: "Camilo Serrano",
    email: "camilo.serrano@mercedez.com",
    telefono: "+51 966 333 444",
    especialidad: "Estilismo Masculino, Fades & Texturizado",
    calificacionPromedio: 4.9,
    fotoUrl: "👨🏽",
    activo: true,
    fechaIngreso: "2023-01-10",
  },
  {
    id: 4,
    nombre: "Franco D'Agostino",
    email: "franco.dagostino@mercedez.com",
    telefono: "+51 955 444 555",
    especialidad: "Colorimetría y Camuflaje de Canas",
    calificacionPromedio: 4.7,
    fotoUrl: "👨🏻",
    activo: false,
    fechaIngreso: "2020-09-20",
  },
];

export default function AdminBarberosPage() {
  const [barberos, setBarberos] = useState<BarberoAdmin[]>(BARBEROS_ADMIN_DEFAULT);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    especialidad: "",
    fotoUrl: "🧔🏻",
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  const toggleBajaLogica = (id: number) => {
    setBarberos(
      barberos.map((b) => {
        if (b.id === id) {
          const nuevoEstado = !b.activo;
          setMensaje(
            nuevoEstado
              ? `Barbero ${b.nombre} reactivado en el equipo.`
              : `Baja lógica aplicada a ${b.nombre}. Ya no estará disponible para nuevas citas.`
          );
          return { ...b, activo: nuevoEstado };
        }
        return b;
      })
    );
    setTimeout(() => setMensaje(null), 4000);
  };

  const handleAltaBarbero = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevo: BarberoAdmin = {
      id: Date.now(),
      ...formData,
      calificacionPromedio: 5.0,
      activo: true,
      fechaIngreso: new Date().toISOString().split("T")[0],
    };

    setBarberos([...barberos, nuevo]);
    setModalAbierto(false);
    setFormData({ nombre: "", email: "", telefono: "", especialidad: "", fotoUrl: "🧔🏻" });
    setMensaje(`Alta exitosa de ${nuevo.nombre}. Credenciales enviadas por email.`);
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
            Gestión de Maestros Barberos
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Alta, perfiles profesionales, especialidades y control de baja lógica.
          </p>
        </div>

        <button
          onClick={() => setModalAbierto(true)}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors self-start sm:self-auto shadow-md"
        >
          + Dar de Alta Nuevo Barbero
        </button>
      </div>

      {mensaje && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs">
          ✓ {mensaje}
        </div>
      )}

      {/* Grid de Barberos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barberos.map((b) => (
          <div
            key={b.id}
            className={`p-6 border transition-all flex flex-col justify-between ${
              b.activo
                ? "bg-black/70 border-neutral-800 hover:border-amber-500/50"
                : "bg-neutral-950 border-neutral-900 opacity-60"
            }`}
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-3xl shrink-0">
                  {b.fotoUrl}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{b.nombre}</h3>
                    <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                      b.activo
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-red-950 text-red-400 border border-red-800"
                    }`}>
                      {b.activo ? "En Plantilla" : "Baja Lógica"}
                    </span>
                  </div>

                  <p className="text-xs text-amber-400 font-medium mt-0.5">
                    {b.especialidad}
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-1">
                    {b.email} · {b.telefono}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-neutral-800/80">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Calificación</span>
                  <span className="font-semibold text-white">★ {b.calificacionPromedio} / 5.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Ingreso</span>
                  <span className="text-neutral-300 font-mono">{b.fechaIngreso}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-900 flex justify-between items-center">
              <span className="text-[11px] text-neutral-500">
                ID #{b.id}
              </span>
              <button
                onClick={() => toggleBajaLogica(b.id)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  b.activo
                    ? "border border-red-900/80 hover:bg-red-950/60 text-red-400"
                    : "border border-emerald-800 hover:bg-emerald-950/60 text-emerald-400"
                }`}
              >
                {b.activo ? "Dar Baja Lógica" : "Reactivar"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Alta Barbero */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 p-6 sm:p-8 max-w-lg w-full">
            <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-2">
              Alta de Nuevo Maestro Barbero
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Registra la ficha técnica y genera la cuenta para el portal de agenda.
            </p>

            <form onSubmit={handleAltaBarbero} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Stefano Rossi"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="stefano@mercedez.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+51 987 654 321"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                  Especialidad Principal
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Visagismo, Degradados y Afeitado Clásico"
                  value={formData.especialidad}
                  onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                  Avatar / Foto Representativa
                </label>
                <select
                  value={formData.fotoUrl}
                  onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="🧔🏻">🧔🏻 Barbero Clásico 1</option>
                  <option value="🧔🏼">🧔🏼 Barbero Clásico 2</option>
                  <option value="👨🏽">👨🏽 Barbero Estilista 3</option>
                  <option value="👨🏻">👨🏻 Maestro Barbero 4</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="px-4 py-2 border border-neutral-700 text-xs text-neutral-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
                >
                  Registrar Barbero
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

