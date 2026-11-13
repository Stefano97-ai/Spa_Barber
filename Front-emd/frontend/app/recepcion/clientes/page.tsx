"use client";

import { useState } from "react";
import Link from "next/link";

interface ClienteItem {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  visitas: number;
  ultimaVisita: string;
  servicioFrecuente: string;
  barberoPreferido: string;
}

const CLIENTES_DATA: ClienteItem[] = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    telefono: "+51 981 123 456",
    visitas: 12,
    ultimaVisita: "2026-11-10",
    servicioFrecuente: "Corte de Autor Signature",
    barberoPreferido: "Enzo Valentini",
  },
  {
    id: 2,
    nombre: "Luis Fernando Rivas",
    email: "lf.rivas@empresa.pe",
    telefono: "+51 955 432 109",
    visitas: 4,
    ultimaVisita: "2026-10-28",
    servicioFrecuente: "Ritual Barba Tradicional",
    barberoPreferido: "Mateo Rossi",
  },
  {
    id: 3,
    nombre: "Diego Arriola",
    email: "diego.arriola@gmail.com",
    telefono: "+51 945 999 111",
    visitas: 7,
    ultimaVisita: "2026-10-15",
    servicioFrecuente: "Servicio Completo Mercedez",
    barberoPreferido: "Enzo Valentini",
  },
  {
    id: 4,
    nombre: "Rodrigo Palacios",
    email: "rodrigo.palacios@outlook.com",
    telefono: "+51 962 888 777",
    visitas: 15,
    ultimaVisita: "2026-11-02",
    servicioFrecuente: "Corte de Autor Signature",
    barberoPreferido: "Enzo Valentini",
  },
  {
    id: 5,
    nombre: "Giancarlo Benítez",
    email: "giancarlo.b@gmail.com",
    telefono: "+51 911 222 333",
    visitas: 2,
    ultimaVisita: "2026-09-30",
    servicioFrecuente: "Tratamiento Capilar",
    barberoPreferido: "Camilo Serrano",
  },
];

export default function RecepcionClientesPage() {
  const [query, setQuery] = useState("");
  const [clientes] = useState<ClienteItem[]>(CLIENTES_DATA);

  const filtrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(query.toLowerCase()) ||
      c.telefono.includes(query) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-serif text-white uppercase tracking-wider">
            Directorio Rápido de Clientes
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Búsqueda instantánea por nombre o número telefónico en recepción.
          </p>
        </div>

        <Link
          href="/registro"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider self-start sm:self-auto"
        >
          + Registrar Nuevo Cliente
        </Link>
      </div>

      {/* Buscador enfocado en velocidad */}
      <div className="relative">
        <input
          type="text"
          autoFocus
          placeholder="Escribe el nombre o teléfono del cliente (ej. 981123456 o Mendoza)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-black/80 border-2 border-neutral-700 focus:border-amber-500 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs px-2 py-1"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrados.map((cliente) => (
          <div
            key={cliente.id}
            className="p-5 bg-black/60 border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-semibold text-white">{cliente.nombre}</h3>
                  <span className="text-xs text-neutral-400 font-mono block">{cliente.telefono}</span>
                </div>
                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-amber-400 text-[10px] font-bold uppercase">
                  {cliente.visitas} Visitas
                </span>
              </div>

              <div className="space-y-1 text-xs text-neutral-400 pt-3 border-t border-neutral-900">
                <p>
                  Barbero habitual: <strong className="text-neutral-200">{cliente.barberoPreferido}</strong>
                </p>
                <p>
                  Servicio común: <strong className="text-neutral-200">{cliente.servicioFrecuente}</strong>
                </p>
                <p className="text-[11px] text-neutral-500">
                  Última visita: {cliente.ultimaVisita}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center">
              <a
                href={`tel:${cliente.telefono}`}
                className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
              >
                📞 Llamar
              </a>
              <Link
                href={`/reservar?clienteId=${cliente.id}`}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-amber-500 hover:text-black text-white text-[11px] font-bold uppercase transition-colors"
              >
                + Agendar Cita
              </Link>
            </div>
          </div>
        ))}

        {filtrados.length === 0 && (
          <div className="col-span-2 p-12 text-center text-xs text-neutral-500 border border-dashed border-neutral-800">
            No se encontraron clientes con el criterio &ldquo;{query}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}

