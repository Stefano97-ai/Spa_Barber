"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Cliente");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.nombre) setUserName(u.nombre.split(" ")[0]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    {
      label: "Reservar",
      href: "/reservar",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Mis Citas",
      href: "/mis-citas",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Servicios",
      href: "/servicios",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
    },
    {
      label: "Perfil",
      href: "/perfil",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      {/* Top Header para Cliente */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-900 px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full border border-amber-500/80 flex items-center justify-center text-amber-500 font-bold text-sm">
            M
          </div>
          <div>
            <span className="text-sm font-bold tracking-widest text-white leading-none block">
              MERCEDEZ
            </span>
            <span className="text-[8px] tracking-widest text-amber-500/80 uppercase">
              CLIENT EXPERIENCE
            </span>
          </div>
        </Link>

        {/* Links de escritorio */}
        <nav className="hidden md:flex items-center gap-6 text-xs tracking-wider">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1 transition-colors ${
                  isActive
                    ? "text-amber-400 border-b-2 border-amber-400 font-semibold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Info usuario y salir */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 hidden sm:inline">
            Hola, <span className="text-amber-400 font-semibold">{userName}</span>
          </span>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="text-xs px-2.5 py-1 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal con padding inferior en móvil para que no lo tape la barra de 4 tabs */}
      <div className="flex-1 pb-20 md:pb-8">{children}</div>

      {/* Barra Inferior Móvil: 4 Tabs (Requisito tal cual) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-neutral-800/90 backdrop-blur-lg px-2 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] tracking-wider transition-colors ${
                isActive ? "text-amber-400 font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              <div className={`${isActive ? "text-amber-400" : "text-neutral-400"}`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

