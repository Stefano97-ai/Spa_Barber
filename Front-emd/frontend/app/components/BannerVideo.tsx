export default function BannerVideo() {
  return (
    <section className="relative bg-black py-28 px-6 text-white text-center border-b border-neutral-900 overflow-hidden">
      {/* Fondo cinematográfico con superposición */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black opacity-80" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Botón interactivo de Play */}
        <button
          type="button"
          aria-label="Reproducir video institucional"
          className="w-20 h-20 rounded-full border-2 border-amber-500/80 bg-black/60 flex items-center justify-center text-amber-400 text-2xl hover:scale-110 hover:bg-amber-500 hover:text-black transition-all mb-8 shadow-2xl shadow-amber-500/20 group"
        >
          <span className="ml-1 group-hover:translate-x-0.5 transition-transform">▶</span>
        </button>

        <p className="text-xs tracking-[0.3em] text-amber-500 uppercase font-semibold mb-3">
          Ritual de Precisión
        </p>

        <h2 className="text-3xl sm:text-5xl font-serif tracking-wider text-white uppercase mb-6 leading-tight">
          CONOCE EL ARTE DE MERCEDEZ
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mb-8 leading-relaxed">
          Descubre el cuidado milimétrico de nuestros maestros barberos en una experiencia audiovisual exclusiva.
        </p>

        <button
          type="button"
          className="border border-neutral-700 bg-neutral-950/80 hover:border-amber-500 text-neutral-300 hover:text-white px-8 py-3 text-xs tracking-widest uppercase transition-colors"
        >
          VER VIDEO INSTITUCIONAL
        </button>
      </div>
    </section>
  );
}
