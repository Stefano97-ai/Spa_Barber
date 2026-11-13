"use client";

import { useState } from "react";

interface Transaccion {
  id: number;
  codigo: string;
  fecha: string;
  cliente: string;
  servicio: string;
  canal: "ONLINE" | "PRESENCIAL";
  metodoDetalle: string;
  monto: number;
  estado: "EXITOSO" | "PENDIENTE" | "REEMBOLSADO";
}

const TRANSACCIONES_DEFAULT: Transaccion[] = [
  { id: 1, codigo: "TX-9081", fecha: "2026-11-10 16:30", cliente: "Carlos Mendoza", servicio: "Corte Signature", canal: "ONLINE", metodoDetalle: "Culqi Visa (**** 4123)", monto: 75.0, estado: "EXITOSO" },
  { id: 2, codigo: "TX-9082", fecha: "2026-11-10 15:15", cliente: "Luis Fernando Rivas", servicio: "Ritual Barba", canal: "PRESENCIAL", metodoDetalle: "POS Mastercard en Mostrador", monto: 60.0, estado: "EXITOSO" },
  { id: 3, codigo: "TX-9083", fecha: "2026-11-10 12:40", cliente: "Diego Arriola", servicio: "Servicio Completo", canal: "ONLINE", metodoDetalle: "Culqi Yape QR", monto: 120.0, estado: "EXITOSO" },
  { id: 4, codigo: "TX-9084", fecha: "2026-11-09 18:20", cliente: "Giancarlo Benítez", servicio: "Tratamiento Capilar", canal: "PRESENCIAL", metodoDetalle: "Efectivo Soles en Caja", monto: 55.0, estado: "EXITOSO" },
  { id: 5, codigo: "TX-9085", fecha: "2026-11-09 11:00", cliente: "Rodrigo Palacios", servicio: "Corte Signature", canal: "ONLINE", metodoDetalle: "Culqi Amex", monto: 75.0, estado: "EXITOSO" },
  { id: 6, codigo: "TX-9086", fecha: "2026-11-08 17:45", cliente: "Esteban Morales", servicio: "Limpieza Facial", canal: "ONLINE", metodoDetalle: "Culqi Visa (Cancelación RF13)", monto: 90.0, estado: "REEMBOLSADO" },
  { id: 7, codigo: "TX-9087", fecha: "2026-11-08 14:10", cliente: "Fernando Quiroga", servicio: "Ritual Barba", canal: "PRESENCIAL", metodoDetalle: "POS Visa en Mostrador", monto: 60.0, estado: "EXITOSO" },
];

export default function AdminIngresosPage() {
  const [fechaInicio, setFechaInicio] = useState("2026-11-01");
  const [fechaFin, setFechaFin] = useState("2026-11-15");
  const [canalFiltro, setCanalFiltro] = useState<"TODOS" | "ONLINE" | "PRESENCIAL">("TODOS");

  const transaccionesFiltradas = TRANSACCIONES_DEFAULT.filter((t) => {
    if (canalFiltro !== "TODOS" && t.canal !== canalFiltro) return false;
    return true;
  });

  const totalRecaudado = transaccionesFiltradas
    .filter((t) => t.estado === "EXITOSO")
    .reduce((acc, t) => acc + t.monto, 0);

  const totalOnline = transaccionesFiltradas
    .filter((t) => t.canal === "ONLINE" && t.estado === "EXITOSO")
    .reduce((acc, t) => acc + t.monto, 0);

  const totalPresencial = transaccionesFiltradas
    .filter((t) => t.canal === "PRESENCIAL" && t.estado === "EXITOSO")
    .reduce((acc, t) => acc + t.monto, 0);

  const ticketPromedio = totalRecaudado > 0
    ? totalRecaudado / transaccionesFiltradas.filter((t) => t.estado === "EXITOSO").length
    : 0;

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
          Reporte Financiero de Ingresos & Facturación
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Seguimiento consolidado de cobros online (Pasarela Culqi) y presenciales (Caja y POS en Atelier).
        </p>
      </div>

      {/* Filtros: Fechas + Canal (Requisito tal cual) */}
      <div className="bg-black/70 border border-neutral-800 p-4 sm:p-5 flex flex-col md:flex-row items-end gap-4 justify-between">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Fecha Inicio */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
              Fecha Desde
            </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
              Fecha Hasta
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white"
            />
          </div>

          {/* Filtro Canal */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
              Canal de Pago
            </label>
            <select
              value={canalFiltro}
              onChange={(e) => setCanalFiltro(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white uppercase"
            >
              <option value="TODOS">Todos los Canales</option>
              <option value="ONLINE">Online (Culqi)</option>
              <option value="PRESENCIAL">Presencial (Caja/POS)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-semibold"
        >
          Exportar Excel / CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/60 border border-neutral-800 p-5">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
            Recaudación Neta
          </span>
          <span className="text-2xl font-bold font-serif text-[#dfb15b]">
            S/ {totalRecaudado.toFixed(2)}
          </span>
          <span className="text-[10px] text-neutral-500 block mt-1">
            En el rango seleccionado
          </span>
        </div>

        <div className="bg-black/60 border border-neutral-800 p-5">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
            Canal Online (Culqi)
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-400">
            S/ {totalOnline.toFixed(2)}
          </span>
          <span className="text-[10px] text-neutral-500 block mt-1">
            {totalRecaudado > 0 ? ((totalOnline / totalRecaudado) * 100).toFixed(0) : 0}% del volumen
          </span>
        </div>

        <div className="bg-black/60 border border-neutral-800 p-5">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
            Canal Presencial (Caja)
          </span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            S/ {totalPresencial.toFixed(2)}
          </span>
          <span className="text-[10px] text-neutral-500 block mt-1">
            {totalRecaudado > 0 ? ((totalPresencial / totalRecaudado) * 100).toFixed(0) : 0}% del volumen
          </span>
        </div>

        <div className="bg-black/60 border border-neutral-800 p-5">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
            Ticket Promedio
          </span>
          <span className="text-2xl font-bold font-mono text-white">
            S/ {ticketPromedio.toFixed(2)}
          </span>
          <span className="text-[10px] text-neutral-500 block mt-1">
            Por servicio facturado
          </span>
        </div>
      </div>

      {/* Tabla de Transacciones */}
      <div className="bg-black/70 border border-neutral-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-900/80 text-[10px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="p-4">Comprobante</th>
              <th className="p-4">Fecha & Hora</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Servicio</th>
              <th className="p-4">Canal / Medio</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {transaccionesFiltradas.map((t) => (
              <tr key={t.id} className="hover:bg-neutral-900/30 transition-colors">
                <td className="p-4 font-mono font-bold text-neutral-300">
                  {t.codigo}
                </td>
                <td className="p-4 text-neutral-400 font-mono text-[11px]">
                  {t.fecha}
                </td>
                <td className="p-4 font-semibold text-white">
                  {t.cliente}
                </td>
                <td className="p-4 text-neutral-300">
                  {t.servicio}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                    t.canal === "ONLINE"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                      : "bg-amber-950 text-amber-300 border border-amber-800/60"
                  }`}>
                    {t.canal}
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                    {t.metodoDetalle}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded ${
                    t.estado === "EXITOSO"
                      ? "bg-emerald-950/60 text-emerald-400"
                      : "bg-red-950 text-red-400 border border-red-800"
                  }`}>
                    {t.estado}
                  </span>
                </td>
                <td className="p-4 text-right font-serif font-bold text-sm text-[#dfb15b]">
                  S/ {t.monto.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

