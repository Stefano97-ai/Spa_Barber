"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState("Administrador General");

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      if (u) {
        const user = JSON.parse(u);
        if (user.nombre) setAdminName(user.nombre);
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

  const navItems = [
    {
      label: "Servicios del Catálogo",
      href: "/admin/servicios",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      desc: "Tarifas, duraciones y estado",
    },
    {
      label: "Equipo de Barberos",
      href: "/admin/barberos",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      desc: "Altas, especialidades y bajas",
    },
    {
      label: "Ingresos & Ventas",
      href: "/admin/ingresos",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      desc: "Canal online y presencial",
    },
    {
      label: "Horario del Negocio",
      href: "/admin/horario-negocio",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      desc: "Apertura y cierre semanal",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Sidebar Completo (Escritorio Primero) */}
      <aside className="w-full md:w-64 bg-black border-r border-neutral-900 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Panel */}
          <div className="p-6 border-b border-neutral-900">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-500/80 flex items-center justify-center text-amber-500 font-bold text-sm">
                M
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest text-white leading-tight block">
                  MERCEDEZ
                </span>
                <span className="text-[9px] tracking-widest text-amber-500/80 uppercase">
                  CENTRAL ADMIN PANEL
                </span>
              </div>
            </Link>
          </div>

          {/* Menú de Navegación de Administrador */}
          <div className="p-3">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 px-3 py-2 block font-semibold">
              Módulos del Sistema
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-xs rounded transition-all ${
                      isActive
                        ? "bg-amber-500/15 text-amber-400 border-l-2 border-amber-500 font-semibold shadow-sm"
                        : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                    }`}
                  >
                    <div className={isActive ? "text-amber-400" : "text-neutral-400"}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="leading-tight">{item.label}</div>
                      <div className="text-[10px] text-neutral-500 font-normal">{item.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-neutral-900 bg-neutral-950/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-white block truncate w-36">
                {adminName}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-mono">
                Rol: Administrador
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="En línea" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-center py-1.5 border border-neutral-800 hover:border-red-800 hover:bg-red-950/40 text-neutral-400 hover:text-red-300 text-xs uppercase tracking-wider transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Área de Trabajo Principal */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl w-full">
        {children}
      </main>
    </div>
  );
}

