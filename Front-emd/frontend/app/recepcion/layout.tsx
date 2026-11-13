"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecepcionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [horaActual, setHoraActual] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHoraActual(now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    {
      label: "Citas del Día",
      href: "/recepcion/citas-hoy",
      icon: "📋",
      badge: "Activo",
    },
    {
      label: "Buscar Clientes",
      href: "/recepcion/clientes",
      icon: "👥",
    },
    {
      label: "Catálogo Servicios",
      href: "/servicios",
      icon: "✂️",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Sidebar Compacto - Enfoque en Velocidad */}
      <aside className="w-full md:w-60 bg-black border-r border-neutral-900 flex flex-col justify-between shrink-0">
        <div>
          {/* Cabecera Sidebar */}
          <div className="p-4 border-b border-neutral-900 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border border-amber-500 bg-neutral-900 flex items-center justify-center text-amber-500 font-bold text-xs">
                M
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-white block">
                  RECEPCIÓN
                </span>
                <span className="text-[9px] text-amber-400 uppercase font-mono">
                  Sede Miraflores
                </span>
              </div>
            </Link>
          </div>

          {/* Reloj y Estado Rápido */}
          <div className="p-3 bg-neutral-950/80 border-b border-neutral-900 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Hora local:</span>
            <span className="text-[#dfb15b] font-bold">{horaActual || "10:00:00"}</span>
          </div>

          {/* Menú de Navegación Rápido */}
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                    isActive
                      ? "bg-amber-500/15 text-amber-400 border-l-2 border-amber-500 font-semibold"
                      : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-3 border-t border-neutral-900 space-y-2">
          <Link
            href="/reservar"
            className="w-full block text-center py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] uppercase tracking-wider transition-colors rounded-none"
          >
            + Agendar en Mostrador
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center py-1.5 border border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-white text-xs transition-colors"
          >
            Cerrar Turno
          </button>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}

