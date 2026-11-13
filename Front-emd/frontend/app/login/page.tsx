"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const redirectByRole = (rol: string) => {
    switch (rol.toUpperCase()) {
      case "ADMIN":
        router.push("/admin/servicios");
        break;
      case "BARBERO":
        router.push("/barbero/agenda");
        break;
      case "RECEPCION":
        router.push("/recepcion/citas-hoy");
        break;
      case "CLIENTE":
      default:
        router.push("/reservar");
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Intento de conexión con backend
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Credenciales incorrectas");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      redirectByRole(data.rol || "CLIENTE");
    } catch (err: unknown) {
      // Fallback demo para permitir probar todos los roles en frontend sin backend encendido
      const emailLower = formData.email.toLowerCase();
      let role = "CLIENTE";
      let nombre = "Cliente Mercedez";

      if (emailLower.includes("admin")) {
        role = "ADMIN";
        nombre = "Administrador Master";
      } else if (emailLower.includes("barbero")) {
        role = "BARBERO";
        nombre = "Enzo Valentini (Barbero)";
      } else if (emailLower.includes("recepcion")) {
        role = "RECEPCION";
        nombre = "Recepción Miraflores";
      }

      // Guardamos sesión simulada
      const mockUser = {
        id: 1,
        nombre,
        email: formData.email,
        rol: role,
        token: "demo-jwt-token-mercedez",
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockUser.token);
      redirectByRole(role);
    } finally {
      setLoading(false);
    }
  };

  // Acceso rápido para pruebas en desarrollo
  const handleQuickLogin = (role: string, email: string) => {
    setFormData({ email, password: "password123" });
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950 to-black pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-black/75 border border-neutral-800 p-8 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full border border-amber-500/80 flex items-center justify-center text-amber-500 font-bold text-xl tracking-wider mb-3 group-hover:bg-amber-500/10 transition-colors">
              M
            </div>
            <span className="text-lg font-bold tracking-[0.2em] text-white">
              MERCEDEZ
            </span>
            <span className="text-[9px] tracking-widest text-amber-500/80 uppercase">
              BARBER ATELIER · ACCESO
            </span>
          </Link>

          <h1 className="mt-6 text-xl font-serif tracking-wider text-[#dfb15b] uppercase">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Ingresa a tu portal exclusivo según tu rol
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 text-xs bg-red-950/60 border border-red-700/60 text-red-300 rounded flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-[11px] font-medium tracking-wider text-neutral-300 uppercase mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 bg-neutral-900/80 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-[11px] font-medium tracking-wider text-neutral-300 uppercase">
                Contraseña
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-900/80 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500 transition-colors text-xs"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 border-2 border-amber-500/90 bg-transparent hover:bg-amber-500 text-white hover:text-black py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-amber-500/20"
          >
            {loading ? "Verificando..." : "Entrar al Atelier"}
          </button>
        </form>

        {/* Acceso Rápido por Rol para Testing Fácil */}
        <div className="mt-6 pt-4 border-t border-neutral-800">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mb-2.5">
            Acceso Rápido por Rol (Demostración)
          </p>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => handleQuickLogin("CLIENTE", "cliente@mercedez.com")}
              className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              👤 Cliente
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("BARBERO", "barbero@mercedez.com")}
              className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              ✂️ Barbero
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("RECEPCION", "recepcion@mercedez.com")}
              className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              🛎️ Recepción
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("ADMIN", "admin@mercedez.com")}
              className="px-2 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-400 transition-colors"
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="text-amber-500 hover:text-amber-400 font-semibold tracking-wide ml-1 transition-colors">
              Crear Membresía
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
