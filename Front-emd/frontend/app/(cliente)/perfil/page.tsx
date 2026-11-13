"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PerfilClientePage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState({
    nombre: "Alejandro Morales",
    email: "cliente@mercedez.com",
    telefono: "+51 987 654 321",
    membresia: "Caballero Black Tier",
    citasCompletadas: 8,
  });
  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const u = JSON.parse(userStr);
        setPerfil((prev) => ({
          ...prev,
          nombre: u.nombre || prev.nombre,
          email: u.email || prev.email,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
          Mi Perfil de Miembro
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Información personal y preferencias de atención en Barbería Mercedez.
        </p>
      </div>

      {/* Tarjeta de Membresía */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-900 via-black to-amber-950/40 border border-amber-500/40 p-6 rounded-none shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">
              MERCEDEZ ATELIER CLUB
            </span>
            <h2 className="text-lg font-bold text-white tracking-wider">{perfil.nombre}</h2>
          </div>
          <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
            {perfil.membresia}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs">
          <div>
            <span className="text-neutral-500 text-[10px] uppercase block">Visitas Realizadas</span>
            <span className="text-white font-semibold text-sm">{perfil.citasCompletadas} citas</span>
          </div>
          <div>
            <span className="text-neutral-500 text-[10px] uppercase block">Beneficio Activo</span>
            <span className="text-amber-400 font-semibold text-sm">Bebida de cortesía & Toalla extra</span>
          </div>
        </div>
      </div>

      {/* Formulario de Datos */}
      <div className="bg-black/60 border border-neutral-800 p-6 space-y-6">
        <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-300">
          Datos de Contacto
        </h3>

        {guardado && (
          <div className="p-3 text-xs bg-emerald-950/60 border border-emerald-600/60 text-emerald-300">
            ✓ Datos actualizados correctamente.
          </div>
        )}

        <form onSubmit={handleGuardar} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={perfil.nombre}
              onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={perfil.email}
              disabled
              className="w-full px-3.5 py-2.5 bg-neutral-900/50 border border-neutral-800 text-neutral-500 text-xs cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
              Teléfono Celular
            </label>
            <input
              type="tel"
              value={perfil.telefono}
              onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 border border-red-800/80 hover:bg-red-950/60 text-red-400 text-xs uppercase tracking-wider transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

