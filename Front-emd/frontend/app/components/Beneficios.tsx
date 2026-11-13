const beneficios = [
    "ATENCIÓN PERSONALIZADA",
    "BEBIDAS DE CORTESÍA & BAR DE AUTOR",
    "PRODUCTOS PREMIUM SELECCIONADOS",
];

export default function Beneficios() {
    return (
        <section className="flex flex-wrap justify-center items-center gap-8 md:gap-16 bg-black/90 py-6 px-4 border-t border-neutral-800 text-xs tracking-widest text-white">
          {beneficios.map((texto) => (
            <div key={texto} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                <span>{texto}</span>
            </div>
          ))}
        </section>
    )
}