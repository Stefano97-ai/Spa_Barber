const testimonios = [
  {
    id: 1,
    nombre: "JOSÉ ORREGO",
    badge: "Cliente Verificado",
    rating: 5,
    comentario:
      "El afeitado con toalla caliente es de otro nivel. La puntualidad es estricta, la atención es impecable y el whisky de cortesía complementa a la perfección una sesión que ya es obligatoria en mi agenda.",
  },
  {
    id: 2,
    nombre: "DIEGO SAN MARTÍN",
    badge: "Cliente Verificado",
    rating: 5,
    comentario:
      "Llevo más de dos años asistiéndome con el equipo. Su asesoría de visagismo me ayudó a encontrar el corte adecuado para mi tipo de rostro. Cuidado de barba cada 15 días sin falta.",
  },
  {
    id: 3,
    nombre: "MARCO ANTONIO CHIRINOS",
    badge: "Cliente Verificado",
    rating: 5,
    comentario:
      "Excelente atmósfera clásica y atención reservada en Miraflores. Destaco la precisión en cortes modernos manteniendo la técnica de navaja clásica. Totalmente recomendado.",
  },
];

export default function Testimonios() {
  return (
    <section className="bg-neutral-950 py-24 px-6 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] text-amber-500 uppercase mb-2">
            Social Proof & Reputación
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wider uppercase">
            DISTINCIÓN EN CADA COMENTARIO
          </h2>
          <p className="text-xs text-neutral-400 tracking-wider mt-3 max-w-xl mx-auto font-light">
            Testimonios de caballeros que confían su imagen en Barbería Mercedez.
          </p>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
        </div>

        {/* Grid de 3 Reseñas Verificadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((t) => (
            <div
              key={t.id}
              className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-sm hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 estrellas */}
                <div className="flex gap-1 text-amber-500 text-sm mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 italic">
                  "{t.comentario}"
                </p>
              </div>

              <div className="border-t border-neutral-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold tracking-wider text-white">
                    {t.nombre}
                  </h3>
                  <span className="text-[10px] text-amber-500/80 tracking-widest uppercase">
                    {t.badge}
                  </span>
                </div>
                <span className="text-neutral-600 text-sm">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
