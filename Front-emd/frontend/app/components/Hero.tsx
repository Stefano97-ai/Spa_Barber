export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-neutral-950 px-6 py-12 text-center text-white border-b border-neutral-900 overflow-hidden">
      {/* Fondo con textura/gradiente ambiental */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950 to-black pointer-events-none" />

      {/* Flechas de control de carrusel laterales */}
      <button
        aria-label="Anterior"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-amber-500 hover:border-amber-500/50 bg-black/40 transition-all z-10"
      >
        &#10094;
      </button>
      <button
        aria-label="Siguiente"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-amber-500 hover:border-amber-500/50 bg-black/40 transition-all z-10"
      >
        &#10095;
      </button>

      {/* Contenido Central */}
      <div className="relative z-10 my-auto max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge superior */}
        <span className="inline-block border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-[10px] tracking-[0.25em] text-amber-400 uppercase mb-6 font-semibold">
          ATELIER DE GROOMING & ESTILISMO MASCULINO
        </span>

        {/* Titular Editorial */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-[0.2em] text-[#dfb15b] uppercase mb-3">
          EL ARTE DEL GROOMING CLÁSICO
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
          BARBERÍA MERCEDEZ
        </h1>

        {/* Bajada de Marca */}
        <p className="max-w-2xl text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-10">
          Cortes de autor, visagismo facial y afeitado tradicional a navaja en una atmósfera privada y refinada en Miraflores.
        </p>

        {/* Botón CTA Destacado */}
        <a
          href="/reservar"
          className="border-2 border-amber-500/90 bg-transparent px-10 py-3.5 text-xs sm:text-sm font-bold tracking-[0.2em] text-white transition-all duration-300 hover:bg-amber-500 hover:text-black shadow-lg hover:shadow-amber-500/20"
        >
          RESERVAR CITA ONLINE
        </a>
      </div>

      {/* Cinta de Pilares de Valor (Micro-insignias inferiores) */}
      <div className="relative z-10 pt-8 border-t border-neutral-900/80 flex flex-wrap justify-center items-center gap-6 sm:gap-14 text-[11px] tracking-[0.2em] text-neutral-300 uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>ATENCIÓN PERSONALIZADA</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>BEBIDAS DE CORTESÍA & BAR DE AUTOR</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>PRODUCTOS PREMIUM SELECCIONADOS</span>
        </div>
      </div>
    </section>
  );
}
