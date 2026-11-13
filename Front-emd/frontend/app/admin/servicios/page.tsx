"use client";

import { useState } from "react";

interface ServicioAdmin {
  id: number;
  nombre: string;
  duracionMin: number;
  precio: number;
  activo: boolean;
  descripcion: string;
}

const SERVICIOS_ADMIN_DEFAULT: ServicioAdmin[] = [
  { id: 1, nombre: "Corte de Autor Signature", duracionMin: 45, precio: 75.0, activo: true, descripcion: "Lavado exfoliante, corte a tijera y peinado con cera mate." },
  { id: 2, nombre: "Ritual Barba Tradicional", duracionMin: 40, precio: 60.0, activo: true, descripcion: "Toalla caliente, aceites esenciales de cedro y afeitado a navaja." },
  { id: 3, nombre: "Servicio Completo Mercedez", duracionMin: 75, precio: 120.0, activo: true, descripcion: "Corte de autor + ritual completo de barba tradicional." },
  { id: 4, nombre: "Tratamiento Capilar Revitalizante", duracionMin: 30, precio: 55.0, activo: true, descripcion: "Masaje craneal y mascarilla nutritiva de carbón activado." },
  { id: 5, nombre: "Limpieza Facial Profunda", duracionMin: 50, precio: 90.0, activo: false, descripcion: "Vapor ozono, extracción y mascarilla de arcilla negra." },
];

export default function AdminServiciosPage() {
  const [servicios, setServicios] = useState<ServicioAdmin[]>(SERVICIOS_ADMIN_DEFAULT);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioEditando, setServicioEditando] = useState<ServicioAdmin | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    duracionMin: 45,
    precio: 75.0,
    descripcion: "",
    activo: true,
  });
  const [mensaje, setMensaje] = useState<string | null>(null);

  const abrirModalCrear = () => {
    setServicioEditando(null);
    setFormData({ nombre: "", duracionMin: 45, precio: 75.0, descripcion: "", activo: true });
    setModalAbierto(true);
  };

  const abrirModalEditar = (serv: ServicioAdmin) => {
    setServicioEditando(serv);
    setFormData({
      nombre: serv.nombre,
      duracionMin: serv.duracionMin,
      precio: serv.precio,
      descripcion: serv.descripcion,
      activo: serv.activo,
    });
    setModalAbierto(true);
  };

  const toggleEstado = (id: number) => {
    setServicios(
      servicios.map((s) => (s.id === id ? { ...s, activo: !s.activo } : s))
    );
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();

    if (servicioEditando) {
      setServicios(
        servicios.map((s) =>
          s.id === servicioEditando.id
            ? { ...s, ...formData }
            : s
        )
      );
      setMensaje(`Servicio "${formData.nombre}" actualizado correctamente.`);
    } else {
      const nuevo: ServicioAdmin = {
        id: Date.now(),
        ...formData,
      };
      setServicios([...servicios, nuevo]);
      setMensaje(`Servicio "${formData.nombre}" creado y añadido al catálogo.`);
    }

    setModalAbierto(false);
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
            Gestión de Servicios & Tarifas
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Administra el catálogo de servicios, tiempos de ejecución y precios oficiales.
          </p>
        </div>

        <button
          onClick={abrirModalCrear}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors self-start sm:self-auto shadow-md"
        >
          + Crear Nuevo Servicio
        </button>
      </div>

      {mensaje && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs">
          ✓ {mensaje}
        </div>
      )}

      {/* Tabla de Servicios */}
      <div className="bg-black/70 border border-neutral-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-900/80 text-[10px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
            <tr>
              <th className="p-4">Servicio & Detalle</th>
              <th className="p-4">Duración</th>
              <th className="p-4">Precio Oficial</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {servicios.map((s) => (
              <tr key={s.id} className="hover:bg-neutral-900/30 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-white text-sm">{s.nombre}</div>
                  <div className="text-xs text-neutral-400 font-light mt-0.5 line-clamp-1">
                    {s.descripcion}
                  </div>
                </td>
                <td className="p-4 font-mono text-neutral-300">
                  {s.duracionMin} min
                </td>
                <td className="p-4 font-serif font-bold text-base text-[#dfb15b]">
                  S/ {s.precio.toFixed(2)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleEstado(s.id)}
                    className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                      s.activo
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 hover:bg-emerald-900"
                        : "bg-neutral-900 text-neutral-500 border border-neutral-800 hover:bg-neutral-800"
                    }`}
                  >
                    {s.activo ? "● Activo" : "○ Inactivo"}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => abrirModalEditar(s)}
                    className="px-3 py-1.5 border border-neutral-700 hover:border-amber-500 text-neutral-300 hover:text-white text-xs uppercase transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Crear / Editar */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 p-6 sm:p-8 max-w-lg w-full">
            <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-2">
              {servicioEditando ? "Editar Servicio" : "Nuevo Servicio en Catálogo"}
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Los cambios se reflejarán de inmediato en la reserva de clientes y en mostrador.
            </p>

            <form onSubmit={handleGuardar} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                  Nombre del Servicio
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej. Corte & Visagismo Facial"
                  className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                    Duración (minutos)
                  </label>
                  <input
                    type="number"
                    step="5"
                    min="15"
                    max="180"
                    required
                    value={formData.duracionMin}
                    onChange={(e) => setFormData({ ...formData, duracionMin: Number(e.target.value) })}
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                    Precio (S/ PEN)
                  </label>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    required
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                    className="w-full bg-black border border-neutral-700 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-300 mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describe los pasos del ritual, productos utilizados y detalles de atención..."
                  className="w-full bg-black border border-neutral-700 p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activoCheck"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="accent-amber-500 w-4 h-4"
                />
                <label htmlFor="activoCheck" className="text-xs text-neutral-300 cursor-pointer">
                  Habilitar servicio para reservas online de inmediato
                </label>
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
                  {servicioEditando ? "Guardar Cambios" : "Crear Servicio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

