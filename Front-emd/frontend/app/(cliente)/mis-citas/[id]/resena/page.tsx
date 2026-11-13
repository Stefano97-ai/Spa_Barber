"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResenaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const citaId = resolvedParams.id;

  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nuevaResena = {
      citaId,
      calificacion,
      comentario,
      fecha: new Date().toISOString(),
    };

    try {
      const resenas = JSON.parse(localStorage.getItem("resenas_cliente") || "[]");
      resenas.push(nuevaResena);
      localStorage.setItem("resenas_cliente", JSON.stringify(resenas));
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setEnviado(true);
      setTimeout(() => router.push("/mis-citas"), 1500);
    }, 600);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/mis-citas" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 mb-6 transition-colors">
        &larr; Volver a Mis Citas
      </Link>

      <div className="bg-black/75 border border-neutral-800 p-8 shadow-2xl relative">
        <span className="text-[10px] tracking-[0.25em] text-amber-500 uppercase font-semibold block mb-2">
          VALORACIÓN DE SERVICIO
        </span>
        <h1 className="text-2xl font-serif text-white uppercase tracking-wider mb-2">
          Califica tu Experiencia
        </h1>
        <p className="text-xs text-neutral-400 leading-relaxed mb-6">
          Tu opinión nos ayuda a perfeccionar los rituales del Atelier y reconoce la maestría de nuestros barberos.
        </p>

        {enviado ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500 text-amber-500 flex items-center justify-center text-xl">
              ✓
            </div>
            <h2 className="text-base font-serif text-white uppercase tracking-wider">
              ¡Muchas Gracias por tu Reseña!
            </h2>
            <p className="text-xs text-neutral-400">
              Redirigiéndote a tus citas...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de Estrellas */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Puntuación General
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCalificacion(star)}
                    className={`text-2xl sm:text-3xl transition-transform hover:scale-110 ${
                      star <= calificacion ? "text-amber-400" : "text-neutral-700"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs text-neutral-400 ml-2 font-medium">
                  {calificacion} de 5 estrellas
                </span>
              </div>
            </div>

            {/* Comentario */}
            <div>
              <label htmlFor="comentario" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Comentarios & Observaciones
              </label>
              <textarea
                id="comentario"
                rows={4}
                required
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Cuéntanos sobre la atención, el corte o el ritual de toalla caliente..."
                className="w-full bg-neutral-900 border border-neutral-700 p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Publicar Reseña"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

