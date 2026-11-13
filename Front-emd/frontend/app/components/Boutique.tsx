"use client"

const productos = [
  {
    id: 1,
    badge: "Edición Mercedez",
    titulo: "Pack American Crew + Gift Card",
    descripcion: "Pomada moldeadora de fijación media + shampoo anticaída + Gift Card física para corte de autor.",
    precioOriginal: "S/ 290.00",
    precioOferta: "S/ 235.00",
  },
  {
    id: 2,
    badge: "Set Exclusivo",
    titulo: "Gift Card: Ritual Mercedez & Barba",
    descripcion: "Set artesanal con óleo hidratante de jojoba, bálsamo fijador y toalla bordada para cuidado en casa.",
    precioOriginal: null,
    precioOferta: "S/ 65.00",
  },
  {
    id: 3,
    badge: "Experiencia VIP",
    titulo: "Gift Card: Corte VIP + Facial",
    descripcion: "Sesión completa con visagismo, exfoliación facial profunda con carbón activado y toallas aromatizadas.",
    precioOriginal: null,
    precioOferta: "S/ 150.00",
  },
];

export default function Boutique({ alAgregar }: { alAgregar: (producto: any) => void }) {
  return (  
    <section id="boutique" className="bg-neutral-950 py-24 px-6 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.25em] text-amber-500 uppercase mb-2">
            Cuidado de Barba, Cabello & Gift Cards
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wider uppercase">
            COLECCIÓN EXCLUSIVA & RITUALES
          </h2>
          <p className="text-xs text-neutral-400 tracking-widest mt-2 uppercase">
            Boutique Mercedez para el cuidado de barba y cabello
          </p>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
        </div>

        {/* Tarjetas de Producto / Experiencia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {productos.map((p) => (
            <div
              key={p.id}
              className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-sm hover:border-amber-500/50 transition-all flex flex-col justify-between group"
              onClick={() => console.log(p.titulo)}
            >
              <div>
                {/* Badge */}
                <span className="inline-block border border-amber-500/50 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4">
                  {p.badge}
                </span>

                <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-amber-500 transition-colors mb-3">
                  {p.titulo}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                  {p.descripcion}
                </p>
              </div>

              <div>
                {/* Precios */}
                <div className="flex items-baseline gap-3 mb-5 border-t border-neutral-800/80 pt-4">
                  {p.precioOriginal && (
                    <span className="text-xs text-neutral-500 line-through">
                      {p.precioOriginal}
                    </span>
                  )}
                  <span className="text-xl font-bold text-amber-500">
                    {p.precioOferta}
                  </span>
                </div>

                {/* Botón */}
                <button
                  type="button"
                  className="w-full border border-neutral-700 bg-neutral-900 py-3 text-xs tracking-widest uppercase font-semibold text-white hover:border-amber-500 hover:bg-amber-500 hover:text-black transition-colors"
                  onClick = {() => alAgregar(p)}
                >
                  Añadir a la bolsa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Secundario */}
        <div className="text-center">
          <button
            type="button"
            className="border border-neutral-700 hover:border-amber-500 px-8 py-3 text-xs tracking-widest uppercase text-neutral-300 hover:text-white transition-colors"
          >
            VER CATÁLOGO COMPLETO
          </button>
        </div>
      </div>
    </section>
  );
}
