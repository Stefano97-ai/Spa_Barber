const barberos = [
  {
    id: 1,
    nombre: "CARLOS MERCEDEZ",
    especialidad: "Master Barber & Visagismo",
    experiencia: "10 años exp.",
    rating: "5.0",
    inicial: "C",
  },
  {
    id: 2,
    nombre: "MATEO SILVA",
    especialidad: "Especialista en Barbas & Navaja",
    experiencia: "6 años exp.",
    rating: "4.9",
    inicial: "M",
  },
  {
    id: 3,
    nombre: "JAVIER ROJAS",
    especialidad: "Cortes Urbanos & Fade Clásico",
    experiencia: "5 años exp.",
    rating: "4.8",
    inicial: "J",
  },
];

export default function Barberos() {
  return (
    <section id="barberos" className="bg-neutral-900/50 py-24 px-6 text-white border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest text-amber-500 uppercase mb-2">
            Maestros del Oficio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider">
            NUESTRO EQUIPO
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4"></div>
        </div>

        {/* Lista de barberos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barberos.map((b) => (
            <div
              key={b.id}
              className="bg-neutral-950 border border-neutral-800 p-8 rounded-sm hover:border-amber-500/40 transition-all text-center flex flex-col items-center"
            >
              {/* Avatar estilizado con inicial */}
              <div className="w-20 h-20 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-2xl font-bold text-amber-500 bg-neutral-900 mb-6">
                {b.inicial}
              </div>

              <h3 className="text-lg font-bold tracking-wider text-white mb-1">
                {b.nombre}
              </h3>
              <p className="text-xs text-amber-500/90 tracking-wide uppercase mb-3">
                {b.especialidad}
              </p>
              <p className="text-xs text-neutral-400 mb-6">
                {b.experiencia}
              </p>

              <div className="mt-auto border-t border-neutral-800/80 pt-4 w-full flex justify-center items-center gap-1 text-sm text-neutral-300">
                <span className="text-amber-500">★</span>
                <span className="font-semibold">{b.rating}</span>
                <span className="text-neutral-500 text-xs">/ 5.0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
