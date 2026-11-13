"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecepcionCobroPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const citaId = resolvedParams.id;

  const [metodo, setMetodo] = useState<"EFECTIVO" | "POS" | "QR">("POS");
  const [montoTotal, setMontoTotal] = useState(120.0);
  const [efectivoRecibido, setEfectivoRecibido] = useState(150.0);
  const [tipoComprobante, setTipoComprobante] = useState<"BOLETA" | "FACTURA">("BOLETA");
  const [procesando, setProcesando] = useState(false);
  const [completado, setCompletado] = useState(false);

  const vuelto = Math.max(0, efectivoRecibido - montoTotal);

  const handleCobro = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);

    setTimeout(() => {
      setProcesando(false);
      setCompletado(true);
      setTimeout(() => router.push("/recepcion/citas-hoy"), 1800);
    }, 700);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Link
        href="/recepcion/citas-hoy"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 transition-colors"
      >
        &larr; Volver a Citas de Hoy
      </Link>

      <div className="bg-black/75 border border-neutral-800 p-6 sm:p-8 shadow-2xl relative">
        <span className="text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-semibold block mb-1">
          CAJA DEL ATELIER · PAGO PRESENCIAL
        </span>
        <h1 className="text-xl font-serif text-white uppercase tracking-wider mb-1">
          Registrar Cobro de Cita #{citaId}
        </h1>
        <p className="text-xs text-neutral-400 mb-6">
          Recepción Miraflores · Mostrador Principal
        </p>

        {completado ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-lg font-serif text-white uppercase tracking-wider">
              ¡Cobro Registrado con Éxito!
            </h2>
            <p className="text-xs text-neutral-400">
              Comprobante emitido correctamente. Volviendo a la lista de citas...
            </p>
          </div>
        ) : (
          <form onSubmit={handleCobro} className="space-y-6">
            {/* Detalle de la Cita */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Cliente:</span>
                <span className="font-semibold text-white">Luis Fernando Rivas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Servicio Realizado:</span>
                <span className="font-semibold text-white">Servicio Completo Mercedez (Corte + Barba)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Barbero:</span>
                <span className="font-semibold text-neutral-300">Enzo Valentini</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-white uppercase">Total a Cobrar:</span>
                <span className="font-bold font-serif text-xl text-[#dfb15b]">
                  S/ {montoTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Canal de Pago Presencial */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Medio de Pago en Sala
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMetodo("POS")}
                  className={`py-3 px-2 border text-center font-semibold transition-all ${
                    metodo === "POS" ? "border-amber-500 bg-amber-500 text-black font-bold" : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  💳 Tarjeta / POS
                </button>
                <button
                  type="button"
                  onClick={() => setMetodo("EFECTIVO")}
                  className={`py-3 px-2 border text-center font-semibold transition-all ${
                    metodo === "EFECTIVO" ? "border-amber-500 bg-amber-500 text-black font-bold" : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  💵 Efectivo
                </button>
                <button
                  type="button"
                  onClick={() => setMetodo("QR")}
                  className={`py-3 px-2 border text-center font-semibold transition-all ${
                    metodo === "QR" ? "border-amber-500 bg-amber-500 text-black font-bold" : "border-neutral-800 bg-neutral-900 text-neutral-300"
                  }`}
                >
                  📱 Yape / Plin
                </button>
              </div>
            </div>

            {/* Si es efectivo, cálculo de cambio */}
            {metodo === "EFECTIVO" && (
              <div className="p-4 bg-neutral-900/80 border border-neutral-700 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-neutral-300 font-medium">Monto Recibido en Mano:</label>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400">S/</span>
                    <input
                      type="number"
                      step="5"
                      min={montoTotal}
                      value={efectivoRecibido}
                      onChange={(e) => setEfectivoRecibido(Number(e.target.value))}
                      className="w-24 bg-black border border-neutral-600 px-2 py-1 text-right text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-neutral-800">
                  <span className="text-amber-400 font-bold uppercase">Cambio / Vuelto:</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    S/ {vuelto.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Tipo de Comprobante */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-neutral-400 uppercase tracking-wider text-[11px]">Comprobante:</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="comprobante"
                  checked={tipoComprobante === "BOLETA"}
                  onChange={() => setTipoComprobante("BOLETA")}
                  className="accent-amber-500"
                />
                <span className="text-neutral-200">Boleta de Venta</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="comprobante"
                  checked={tipoComprobante === "FACTURA"}
                  onChange={() => setTipoComprobante("FACTURA")}
                  className="accent-amber-500"
                />
                <span className="text-neutral-200">Factura</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={procesando}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/40"
            >
              {procesando ? "Procesando Cobro..." : `Cobrar S/ ${montoTotal.toFixed(2)} y Emitir`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

