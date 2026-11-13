const listaServicios = [
  {
    id: 1,
    nombre: "CORTE TRADICIONAL",
    descripcion: "Asesoría de visagismo, corte clásico a tijera y máquina con acabado a navaja y lavado premium.",
    duracion: "45 min",
    precio: "S/ 50.00",
  },
  {
    id: 2,
    nombre: "AFEITADO & PERFILADO DE BARBA",
    descripcion: "Tratamiento con toalla caliente aromatizada, aceites esenciales hidratantes y afeitado tradicional a navaja.",
    duracion: "30 min",
    precio: "S/ 40.00",
  },
  {
    id: 3,
    nombre: "EXPERIENCIA COMPLETA MERCEDEZ",
    descripcion: "Corte de autor + ritual completo de barba + exfoliación facial y bebida de cortesía en nuestro bar.",
    duracion: "75 min",
    precio: "S/ 80.00",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="bg-neutral-950 py-24 px-6 text-white border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest text-amber-500 uppercase mb-2">
            Nuestros Rituales
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider">
            SERVICIOS EXCLUSIVOS
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {listaServicios.map((s) => (
            <div
              key={s.id}
              className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-sm hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-lg font-bold tracking-wide text-white group-hover:text-amber-500 transition-colors mb-4">
                  {s.nombre}
                </h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  {s.descripcion}
                </p>
              </div>

              <div className="border-t border-neutral-800/80 pt-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500 tracking-wider">
                  ⏱ {s.duracion}
                </span>
                <span className="text-xl font-bold text-amber-500">
                  {s.precio}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
