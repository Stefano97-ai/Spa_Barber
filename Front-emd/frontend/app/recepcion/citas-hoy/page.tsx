"use client";

import { useState } from "react";
import Link from "next/link";

interface CitaHoy {
  id: number;
  hora: string;
  cliente: string;
  telefono: string;
  barbero: string;
  servicio: string;
  monto: number;
  estadoPago: "PAGADO_ONLINE" | "PENDIENTE_PRESENCIAL" | "COBRADO_EN_CAJA";
  estadoCita: "CONFIRMADA" | "EN_SALA" | "EN_SERVICIO" | "COMPLETADA" | "CANCELADA";
}

const CITAS_HOY_DATA: CitaHoy[] = [
  {
    id: 301,
    hora: "10:00 AM",
    cliente: "Carlos Mendoza",
    telefono: "+51 981 123 456",
    barbero: "Enzo Valentini",
    servicio: "Corte de Autor Signature",
    monto: 75.0,
    estadoPago: "PAGADO_ONLINE",
    estadoCita: "EN_SERVICIO",
  },
  {
    id: 302,
    hora: "10:30 AM",
    cliente: "Luis Fernando Rivas",
    telefono: "+51 955 432 109",
    barbero: "Mateo Rossi",
    servicio: "Ritual Barba Tradicional",
    monto: 60.0,
    estadoPago: "PENDIENTE_PRESENCIAL",
    estadoCita: "EN_SALA",
  },
  {
    id: 303,
    hora: "11:30 AM",
    cliente: "Diego Arriola",
    telefono: "+51 945 999 111",
    barbero: "Enzo Valentini",
    servicio: "Servicio Completo Mercedez",
    monto: 120.0,
    estadoPago: "PENDIENTE_PRESENCIAL",
    estadoCita: "CONFIRMADA",
  },
  {
    id: 304,
    hora: "01:00 PM",
    cliente: "Giancarlo Benítez",
    telefono: "+51 911 222 333",
    barbero: "Camilo Serrano",
    servicio: "Tratamiento Capilar Revitalizante",
    monto: 55.0,
    estadoPago: "PAGADO_ONLINE",
    estadoCita: "CONFIRMADA",
  },
  {
    id: 305,
    hora: "03:00 PM",
    cliente: "Rodrigo Palacios",
    telefono: "+51 962 888 777",
    barbero: "Enzo Valentini",
    servicio: "Corte de Autor Signature",
    monto: 75.0,
    estadoPago: "COBRADO_EN_CAJA",
    estadoCita: "COMPLETADA",
  },
];

export default function RecepcionCitasHoyPage() {
  const [citas, setCitas] = useState<CitaHoy[]>(CITAS_HOY_DATA);
  const [filtro, setFiltro] = useState<string>("TODAS");
  const [search, setSearch] = useState("");

  const actualizarEstado = (id: number, nuevoEstado: CitaHoy["estadoCita"]) => {
    setCitas(citas.map((c) => (c.id === id ? { ...c, estadoCita: nuevoEstado } : c)));
  };

  const citasFiltradas = citas.filter((c) => {
    const matchFiltro =
      filtro === "TODAS"
        ? true
        : filtro === "EN_SALA"
        ? c.estadoCita === "EN_SALA"
        : filtro === "PENDIENTE_PAGO"
        ? c.estadoPago === "PENDIENTE_PRESENCIAL"
        : c.estadoCita === filtro;

    const matchSearch =
      c.cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.telefono.includes(search) ||
      c.barbero.toLowerCase().includes(search.toLowerCase());

    return matchFiltro && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Barra superior de métricas rápidas del día */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-black/60 border border-neutral-800 p-3.5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Citas Hoy</span>
          <span className="text-xl font-bold font-mono text-white">{citas.length}</span>
        </div>
        <div className="bg-black/60 border border-neutral-800 p-3.5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">En Sala / Espera</span>
          <span className="text-xl font-bold font-mono text-amber-400">
            {citas.filter((c) => c.estadoCita === "EN_SALA").length}
          </span>
        </div>
        <div className="bg-black/60 border border-neutral-800 p-3.5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">En Sillón / Atención</span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {citas.filter((c) => c.estadoCita === "EN_SERVICIO").length}
          </span>
        </div>
        <div className="bg-black/60 border border-neutral-800 p-3.5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Cobros Pendientes</span>
          <span className="text-xl font-bold font-mono text-amber-300">
            {citas.filter((c) => c.estadoPago === "PENDIENTE_PRESENCIAL").length}
          </span>
        </div>
      </div>

      {/* Controles de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar por cliente, teléfono o barbero..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto text-xs">
          {["TODAS", "EN_SALA", "PENDIENTE_PAGO", "COMPLETADA"].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] font-semibold transition-colors ${
                filtro === f
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla Operativa de Citas */}
      <div className="bg-black/70 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-900/80 text-[10px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="p-3.5">Hora</th>
              <th className="p-3.5">Cliente & Teléfono</th>
              <th className="p-3.5">Barbero Asignado</th>
              <th className="p-3.5">Servicio</th>
              <th className="p-3.5">Pago</th>
              <th className="p-3.5">Estado Cita</th>
              <th className="p-3.5 text-right">Acción Rápida</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {citasFiltradas.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-900/40 transition-colors">
                <td className="p-3.5 font-mono font-bold text-[#dfb15b]">
                  {c.hora}
                </td>
                <td className="p-3.5">
                  <div className="font-semibold text-white">{c.cliente}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">{c.telefono}</div>
                </td>
                <td className="p-3.5 text-neutral-300">
                  {c.barbero}
                </td>
                <td className="p-3.5 text-neutral-300">
                  {c.servicio}
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                    c.estadoPago === "PAGADO_ONLINE"
                      ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                      : c.estadoPago === "COBRADO_EN_CAJA"
                      ? "bg-blue-950/80 text-blue-300 border border-blue-800/60"
                      : "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                  }`}>
                    {c.estadoPago === "PAGADO_ONLINE" ? "Online (Culqi)" :
                     c.estadoPago === "COBRADO_EN_CAJA" ? "Caja OK" : "Pendiente S/ " + c.monto.toFixed(2)}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                    c.estadoCita === "EN_SERVICIO"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : c.estadoCita === "EN_SALA"
                      ? "bg-purple-950 text-purple-300 border border-purple-800"
                      : c.estadoCita === "COMPLETADA"
                      ? "bg-neutral-800 text-neutral-400"
                      : "bg-neutral-900 text-neutral-300 border border-neutral-700"
                  }`}>
                    {c.estadoCita.replace("_", " ")}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                  {c.estadoCita === "CONFIRMADA" && (
                    <button
                      onClick={() => actualizarEstado(c.id, "EN_SALA")}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-semibold uppercase"
                    >
                      Llegó a Sala
                    </button>
                  )}

                  {c.estadoCita === "EN_SALA" && (
                    <button
                      onClick={() => actualizarEstado(c.id, "EN_SERVICIO")}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold uppercase"
                    >
                      Pasar a Sillón
                    </button>
                  )}

                  {c.estadoPago === "PENDIENTE_PRESENCIAL" && (
                    <Link
                      href={`/recepcion/cobro/${c.id}`}
                      className="inline-block px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase"
                    >
                      Cobrar en Caja
                    </Link>
                  )}

                  {c.estadoCita === "EN_SERVICIO" && (
                    <button
                      onClick={() => actualizarEstado(c.id, "COMPLETADA")}
                      className="px-2.5 py-1 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-[10px] uppercase"
                    >
                      Finalizar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

