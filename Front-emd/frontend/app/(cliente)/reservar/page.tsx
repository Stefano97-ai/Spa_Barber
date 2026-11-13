"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Servicio {
  id: number;
  nombre: string;
  duracionMin: number;
  precio: number;
  descripcion: string;
}

interface Barbero {
  id: number;
  nombre: string;
  especialidad: string;
  rating: number;
  foto: string;
}

const SERVICIOS: Servicio[] = [
  { id: 1, nombre: "Corte de Autor Signature", duracionMin: 45, precio: 75.0, descripcion: "Lavado exfoliante, corte a tijera y peinado con producto premium." },
  { id: 2, nombre: "Ritual Barba Tradicional", duracionMin: 40, precio: 60.0, descripcion: "Toalla caliente, aceites esenciales, afeitado a navaja y bálsamo." },
  { id: 3, nombre: "Servicio Completo Mercedez (Corte + Barba)", duracionMin: 75, precio: 120.0, descripcion: "La experiencia completa de distinción y bienestar." },
  { id: 4, nombre: "Tratamiento Capilar Revitalizante", duracionMin: 30, precio: 55.0, descripcion: "Masaje craneal y ampolla nutritiva para el cuero cabelludo." },
  { id: 5, nombre: "Limpieza Facial Profunda", duracionMin: 50, precio: 90.0, descripcion: "Vapor ozono, extracción de puntos negros y suero hidratante." },
];

const BARBEROS: Barbero[] = [
  { id: 1, nombre: "Enzo Valentini", especialidad: "Master Barber · Cortes Clásicos & Visagismo", rating: 4.9, foto: "🧔🏻" },
  { id: 2, nombre: "Mateo Rossi", especialidad: "Especialista en Barbas & Afeitado a Navaja", rating: 4.8, foto: "🧔🏼" },
  { id: 3, nombre: "Camilo Serrano", especialidad: "Estilismo Moderno, Fades & Texturizado", rating: 4.9, foto: "👨🏽" },
];

const HORAS_DISPONIBLES = [
  "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:30 PM", "05:30 PM", "06:30 PM", "07:30 PM"
];

function ReservarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServicioId = searchParams.get("servicioId") ? Number(searchParams.get("servicioId")) : 1;

  const [step, setStep] = useState(1);
  const [selectedServicios, setSelectedServicios] = useState<number[]>([initialServicioId]);
  const [selectedBarbero, setSelectedBarbero] = useState<number | null>(1);
  const [selectedFecha, setSelectedFecha] = useState("2026-11-12");
  const [selectedHora, setSelectedHora] = useState<string>("03:00 PM");
  const [metodoPago, setMetodoPago] = useState<"ONLINE" | "PRESENCIAL">("ONLINE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cálculo de totales
  const serviciosElegidos = useMemo(() => {
    return SERVICIOS.filter((s) => selectedServicios.includes(s.id));
  }, [selectedServicios]);

  const totalPrecio = useMemo(() => {
    return serviciosElegidos.reduce((acc, s) => acc + s.precio, 0);
  }, [serviciosElegidos]);

  const totalDuracion = useMemo(() => {
    return serviciosElegidos.reduce((acc, s) => acc + s.duracionMin, 0);
  }, [serviciosElegidos]);

  const toggleServicio = (id: number) => {
    if (selectedServicios.includes(id)) {
      if (selectedServicios.length > 1) {
        setSelectedServicios(selectedServicios.filter((s) => s !== id));
      }
    } else {
      setSelectedServicios([...selectedServicios, id]);
    }
  };

  const handleConfirmarReserva = async () => {
    setIsSubmitting(true);
    const barberoObj = BARBEROS.find((b) => b.id === selectedBarbero);

    const nuevaCita = {
      id: Date.now(),
      servicios: serviciosElegidos,
      barbero: barberoObj ? barberoObj.nombre : "Cualquier barbero",
      barberoId: selectedBarbero,
      fecha: selectedFecha,
      hora: selectedHora,
      total: totalPrecio,
      duracionMin: totalDuracion,
      metodoPago: metodoPago,
      estado: metodoPago === "ONLINE" ? "CONFIRMADA" : "PENDIENTE_PAGO",
      createdAt: new Date().toISOString(),
    };

    // Guardar en localStorage para persistencia y lectura en Mis Citas
    try {
      const citasPrevias = JSON.parse(localStorage.getItem("mis_citas") || "[]");
      citasPrevias.unshift(nuevaCita);
      localStorage.setItem("mis_citas", JSON.stringify(citasPrevias));
      localStorage.setItem("ultima_cita", JSON.stringify(nuevaCita));
    } catch (e) {
      console.error(e);
    }

    // Redirigir a confirmación
    setTimeout(() => {
      router.push(`/reservar/confirmacion?id=${nuevaCita.id}`);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Indicador de Pasos (1 al 5) */}
      <div className="mb-10">
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-3">
          <span className="uppercase tracking-widest text-[#dfb15b] font-semibold">
            Paso {step} de 5: {
              step === 1 ? "Seleccionar Servicios" :
              step === 2 ? "Elegir Barbero" :
              step === 3 ? "Fecha & Hora" :
              step === 4 ? "Resumen de Cita" : "Método de Pago"
            }
          </span>
          <span className="text-neutral-500">{Math.round((step / 5) * 100)}% completado</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* PASO 1: SERVICIOS */}
      {step === 1 && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
              1. Selecciona tus Servicios
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Puedes combinar más de un servicio en la misma visita.
            </p>
          </div>

          <div className="space-y-3">
            {SERVICIOS.map((s) => {
              const isSelected = selectedServicios.includes(s.id);
              return (
                <div
                  key={s.id}
                  onClick={() => toggleServicio(s.id)}
                  className={`p-4 sm:p-5 border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-white">{s.nombre}</h3>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">{s.descripcion}</p>
                      <span className="inline-block text-[11px] text-neutral-400 mt-2">
                        ⏱️ {s.duracionMin} min
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-serif font-bold text-[#dfb15b]">
                      S/ {s.precio.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barra de progreso inferior del paso */}
          <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
            <div className="text-xs text-neutral-300">
              Total estimado: <span className="text-amber-400 font-bold text-sm">S/ {totalPrecio.toFixed(2)}</span> ({totalDuracion} min)
            </div>
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Continuar a Barbero &rarr;
            </button>
          </div>
        </section>
      )}

      {/* PASO 2: BARBERO */}
      {step === 2 && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
              2. Elige a tu Profesional
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Todos nuestros barberos cuentan con certificación internacional de maestría.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BARBEROS.map((b) => {
              const isSelected = selectedBarbero === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBarbero(b.id)}
                  className={`p-5 border cursor-pointer text-center transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                      : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-3xl">
                      {b.foto}
                    </div>
                    <h3 className="text-base font-semibold text-white">{b.nombre}</h3>
                    <p className="text-[11px] text-amber-500 font-medium mt-1">★ {b.rating} / 5.0</p>
                    <p className="text-xs text-neutral-400 mt-2 font-light leading-snug">
                      {b.especialidad}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? "text-amber-400" : "text-neutral-500"}`}>
                      {isSelected ? "Seleccionado ✓" : "Seleccionar"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
            >
              &larr; Volver
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Continuar a Fecha &rarr;
            </button>
          </div>
        </section>
      )}

      {/* PASO 3: FECHA & HORA */}
      {step === 3 && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
              3. Selecciona Fecha y Hora
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Disponibilidad en tiempo real para la sede Miraflores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selección de Fecha */}
            <div className="bg-neutral-900/50 border border-neutral-800 p-5">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
                Selecciona la Fecha:
              </label>
              <input
                type="date"
                value={selectedFecha}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedFecha(e.target.value)}
                className="w-full bg-black border border-neutral-700 text-white px-4 py-3 rounded text-sm focus:border-amber-500 focus:outline-none"
              />
              <p className="text-[11px] text-neutral-500 mt-3 leading-relaxed">
                Horario de atención: Lunes a Sábado de 10:00 AM a 8:00 PM.
              </p>
            </div>

            {/* Selección de Franja */}
            <div className="bg-neutral-900/50 border border-neutral-800 p-5">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3">
                Franjas Horarias Disponibles:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {HORAS_DISPONIBLES.map((hora) => {
                  const isSelected = selectedHora === hora;
                  return (
                    <button
                      key={hora}
                      type="button"
                      onClick={() => setSelectedHora(hora)}
                      className={`py-2 px-2 text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? "border-amber-500 bg-amber-500 text-black font-bold"
                          : "border-neutral-800 text-neutral-300 hover:border-neutral-600 bg-black/40"
                      }`}
                    >
                      {hora}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
            >
              &larr; Volver
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Revisar Resumen &rarr;
            </button>
          </div>
        </section>
      )}

      {/* PASO 4: RESUMEN */}
      {step === 4 && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
              4. Resumen de tu Reserva
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Verifica los detalles antes de proceder al abono.
            </p>
          </div>

          <div className="bg-black/60 border border-neutral-800 p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1">Barbero Seleccionado</span>
                <span className="text-sm font-semibold text-white">
                  {BARBEROS.find((b) => b.id === selectedBarbero)?.nombre}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1">Fecha & Hora</span>
                <span className="text-sm font-semibold text-[#dfb15b]">
                  {selectedFecha} a las {selectedHora}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1">Sede</span>
                <span className="text-sm font-semibold text-white">
                  Miraflores Atelier (Av. Santa Cruz 880)
                </span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1">Duración Total</span>
                <span className="text-sm font-semibold text-white">
                  {totalDuracion} minutos
                </span>
              </div>
            </div>

            {/* Desglose de servicios */}
            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">
                Servicios Seleccionados
              </span>
              <div className="space-y-2">
                {serviciosElegidos.map((s) => (
                  <div key={s.id} className="flex justify-between text-xs py-1.5 border-b border-neutral-900">
                    <span className="text-neutral-300">{s.nombre} ({s.duracionMin} min)</span>
                    <span className="font-semibold text-white">S/ {s.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline text-base">
              <span className="font-serif uppercase tracking-wider text-neutral-300">Total a Pagar</span>
              <span className="text-2xl font-bold font-serif text-[#dfb15b]">
                S/ {totalPrecio.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
            >
              &larr; Volver
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Ir a Pago &rarr;
            </button>
          </div>
        </section>
      )}

      {/* PASO 5: PAGO */}
      {step === 5 && (
        <section className="space-y-6">
          <div>
            <h1 className="text-2xl font-serif text-white uppercase tracking-wider">
              5. Método de Pago
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Elige abonar online para garantizar tu turno de inmediato o en recepción.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Opción 1: Online Culqi */}
            <div
              onClick={() => setMetodoPago("ONLINE")}
              className={`p-5 border cursor-pointer transition-all ${
                metodoPago === "ONLINE"
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="metodoPago"
                  checked={metodoPago === "ONLINE"}
                  onChange={() => setMetodoPago("ONLINE")}
                  className="accent-amber-500"
                />
                <span className="font-semibold text-sm text-white">Pago Online Inmediato (Culqi)</span>
              </div>
              <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                Tarjeta de Débito/Crédito Visa, Mastercard o Yape. Tu cita queda <strong className="text-amber-400">100% Confirmada</strong>.
              </p>
              <div className="mt-4 flex gap-2 text-[10px] text-neutral-400">
                <span className="bg-neutral-800 px-2 py-0.5 rounded">Visa</span>
                <span className="bg-neutral-800 px-2 py-0.5 rounded">Mastercard</span>
                <span className="bg-neutral-800 px-2 py-0.5 rounded">Yape</span>
              </div>
            </div>

            {/* Opción 2: Presencial */}
            <div
              onClick={() => setMetodoPago("PRESENCIAL")}
              className={`p-5 border cursor-pointer transition-all ${
                metodoPago === "PRESENCIAL"
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="metodoPago"
                  checked={metodoPago === "PRESENCIAL"}
                  onChange={() => setMetodoPago("PRESENCIAL")}
                  className="accent-amber-500"
                />
                <span className="font-semibold text-sm text-white">Pago en Recepción del Atelier</span>
              </div>
              <p className="text-xs text-neutral-400 font-light mt-2 leading-relaxed">
                Abona en efectivo o POS al llegar a la sede. Estado quedará como <strong className="text-amber-400">Pendiente de Pago</strong>.
              </p>
            </div>
          </div>

          <div className="p-4 bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-400 leading-relaxed">
            <strong className="text-white block mb-1">Política de Cancelación & Reembolso:</strong>
            Puedes cancelar tu cita hasta 4 horas antes sin costo alguno con reembolso automático si pagaste online.
          </div>

          <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 border border-neutral-800 text-xs text-neutral-300 hover:text-white"
            >
              &larr; Volver
            </button>
            <button
              onClick={handleConfirmarReserva}
              disabled={isSubmitting}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-[0.15em] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Procesando..." : `Confirmar Reserva (S/ ${totalPrecio.toFixed(2)})`}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ReservarPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-400">Cargando reserva...</div>}>
      <ReservarContent />
    </Suspense>
  );
}

