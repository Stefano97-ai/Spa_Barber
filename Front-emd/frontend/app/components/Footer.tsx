export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-900 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
        {/* 1. Columna Ubicación */}
        <div>
          <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
            Ubicación
          </h4>
          <p className="leading-relaxed mb-3">
            Calle Porta 190, Miraflores<br />
            (A pasos del Parque Kennedy)<br />
            Lima, Perú
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:text-amber-400 underline tracking-wider font-semibold inline-block"
          >
            Ver en el mapa →
          </a>
        </div>

        {/* 2. Columna Citas Online */}
        <div>
          <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
            Citas Online
          </h4>
          <p className="leading-relaxed mb-3">
            Selecciona tu barbero predilecto, servicios y horario con confirmación inmediata.
          </p>
          <a
            href="#reservar"
            className="text-amber-500 hover:text-amber-400 underline tracking-wider font-semibold inline-block"
          >
            Reservar en línea →
          </a>
        </div>

        {/* 3. Columna Horarios & Soporte */}
        <div>
          <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">
            Horarios & Soporte
          </h4>
          <div className="space-y-1 mb-3">
            <p className="flex justify-between">
              <span>Lun a Sáb:</span>
              <span className="text-white font-medium">10:00 AM - 8:30 PM</span>
            </p>
            <p className="flex justify-between">
              <span>Domingos:</span>
              <span className="text-white font-medium">11:00 AM - 5:30 PM</span>
            </p>
          </div>
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-semibold tracking-wider inline-flex items-center gap-1.5"
          >
            <span>💬</span> WhatsApp directo
          </a>
        </div>

        {/* 4. Columna Redes & Marca */}
        <div>
          <div className="text-base font-bold tracking-widest text-amber-500 mb-3">
            MERCEDEZ
          </div>
          <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
            Atelier de grooming & estilismo masculino en Miraflores.
          </p>
          <div className="flex gap-4 text-sm text-neutral-400 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-amber-500 transition-colors">FB</a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-500 transition-colors">IG</a>
            <a href="#" aria-label="Twitter / X" className="hover:text-amber-500 transition-colors">X</a>
            <a href="#" aria-label="YouTube" className="hover:text-amber-500 transition-colors">YT</a>
          </div>
        </div>
      </div>

      {/* Créditos y Leyenda Legal */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-neutral-900 text-center text-[11px] text-neutral-600">
        Barbería Mercedez Atelier © 2026. Todos los derechos reservados. Miraflores, Lima - Perú.
      </div>
    </footer>
  );
}
