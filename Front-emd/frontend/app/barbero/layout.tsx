"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BarberoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [barberoNombre, setBarberoNombre] = useState("Enzo Valentini");

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      if (u) {
        const user = JSON.parse(u);
        if (user.nombre) setBarberoNombre(user.nombre);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const tabs = [
    { label: "Agenda de Citas", href: "/barbero/agenda" },
    { label: "Mi Horario Semanal & Bloqueos", href: "/barbero/horario" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Barra Superior */}
      <header className="bg-black border-b border-neutral-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-500/80 bg-neutral-900 flex items-center justify-center text-amber-500 font-bold text-base">
            ✂️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest text-white">
                MERCEDEZ ATELIER
              </span>
              <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] uppercase font-semibold">
                PORTAL BARBERO
              </span>
            </div>
            <span className="text-xs text-neutral-400">
              Maestro: <strong className="text-neutral-200">{barberoNombre}</strong>
            </span>
          </div>
        </div>

        {/* Acciones y Salir */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold block">
              ● Estado: En Servicio
            </span>
            <span className="text-xs text-neutral-400">Sede Miraflores</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-neutral-800 hover:border-amber-500/50 text-neutral-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Tabs de Navegación: Barra de Navegación Barbero */}
      <nav className="bg-neutral-900/60 border-b border-neutral-800 px-6 flex gap-8">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`py-3 text-xs uppercase tracking-wider font-semibold transition-colors relative ${
                isActive ? "text-amber-400" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Contenido */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}

