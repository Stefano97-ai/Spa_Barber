export default function Institucional() {
  return (
    <section className="bg-black py-24 px-6 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Columna Visual con Insignia Flotante */}
        <div className="relative">
          <div className="relative h-[420px] w-full rounded-sm border border-neutral-800 bg-neutral-900 overflow-hidden flex items-center justify-center p-8 text-center">
            {/* Fondo simulando la fotografía de gran formato */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-900/80 to-transparent" />
            <div className="relative z-10">
              <span className="text-6xl text-amber-500/30 font-serif">✂</span>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mt-4 max-w-xs">
                Afeitado clásico a navaja tradicional con toalla caliente aromática
              </p>
            </div>
          </div>

          {/* Insignia Conmemorativa Flotante */}
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-amber-500 text-black px-6 py-3 font-bold text-xs tracking-widest uppercase shadow-2xl border-2 border-black">
            EST. 2016 · ATELIER EN MIRAFLORES
          </div>
        </div>

        {/* Columna Manifiesto de Marca */}
        <div>
          <span className="text-xs tracking-[0.25em] text-amber-500 uppercase font-semibold">
            Oficio, Tradición & Distinción
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-white mt-3 mb-6 uppercase leading-tight">
            EL RESCATE DE LA ÉPOCA DORADA DEL GROOMING
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            <p>
              Barbería Mercedez nació con la firme convicción de rescatar el ritual masculino como una pausa necesaria. No creemos en cortes apresurados ni en fórmulas en serie; aplicamos principios de <strong className="text-neutral-200">visagismo japonés</strong> para que cada corte armonice con tu estructura ósea.
            </p>
            <p>
              Cada servicio se concibe como una ceremonia: toallas perfumadas a temperatura ideal, navajas de filo impecable y una cuidada selección de <strong className="text-neutral-200">coctelería y café de especialidad</strong> de cortesía.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="#servicios"
              className="inline-block border border-amber-500/70 hover:border-amber-500 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
            >
              CONOCER NUESTROS SERVICIOS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
