export default function AtelierSede() {
  return (
    <section id="atelier" className="bg-neutral-950 py-24 px-6 text-white border-b border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Cabecera de Sede con CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 border-b border-neutral-900 pb-8">
          <div>
            <p className="text-xs tracking-[0.25em] text-amber-500 uppercase mb-2">
              Sede Insignia Miraflores
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-wider uppercase">
              NUESTRO ATELIER
            </h2>
          </div>
          <a
            href="#reservar"
            className="self-start sm:self-auto border border-amber-500/80 bg-amber-500/10 hover:bg-amber-500 hover:text-black px-6 py-3 text-xs tracking-widest uppercase font-bold text-amber-400 transition-colors"
          >
            VER AGENDA DISPONIBLE
          </a>
        </div>

        {/* Ficha & Panel de Experiencia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Card Fotográfica de Fachada / Interior */}
          <div className="border border-neutral-800 bg-neutral-900/60 p-8 flex flex-col justify-between rounded-sm">
            <div>
              <div className="h-56 w-full rounded border border-neutral-800 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center mb-6">
                <span className="text-4xl text-amber-500/40 mb-3">🏛️</span>
                <p className="text-xs tracking-widest uppercase text-neutral-300 font-semibold">
                  Atelier Miraflores · Fachada & Interiorismo
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Madera maciza, sillones de piel restaurados y aromaterapia
                </p>
              </div>

              <span className="text-xs tracking-widest text-amber-500 font-bold uppercase block mb-1">
                Sede Insignia: Miraflores
              </span>
              <h3 className="text-xl font-bold tracking-wide text-white mb-2">
                Calle Porta 190
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                A solo pasos del emblemático Parque Kennedy. Una atmósfera privada, aislada del bullicio urbano.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Estacionamiento:</span>
              <span className="text-amber-400 font-semibold">Valet parking & cortesía cercana</span>
            </div>
          </div>

          {/* Panel de Experiencia en Sede */}
          <div className="border border-neutral-800 bg-neutral-900/40 p-8 flex flex-col justify-between rounded-sm">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs tracking-widest uppercase text-amber-500 font-bold mb-3">
                  Horarios de Atención
                </h4>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span>Lunes a Sábado:</span>
                    <span className="font-semibold text-white">10:00 AM – 8:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span>Domingos:</span>
                    <span className="font-semibold text-white">11:00 AM – 5:30 PM</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs tracking-widest uppercase text-amber-500 font-bold mb-3">
                  Comodidades del Atelier
                </h4>
                <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                  <li>Barra con coctelería de autor y café de grano ilimitado.</li>
                  <li>Cabinas independientes para máxima privacidad.</li>
                  <li>Wifi de alta velocidad y estaciones de carga rápida.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs tracking-widest uppercase text-amber-500 font-bold mb-1">
                  Contacto Directo
                </h4>
                <p className="text-xs text-neutral-300">WhatsApp / Teléfono: <span className="text-amber-400 font-bold">+51 987 654 321</span></p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80">
              <a
                href="#reservar"
                className="block text-center w-full border border-amber-500 bg-amber-500 text-black py-3 text-xs tracking-widest uppercase font-bold hover:bg-amber-400 transition-colors"
              >
                RESERVAR EN MIRAFLORES
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
