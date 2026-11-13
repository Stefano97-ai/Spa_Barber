import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

interface ServicioItem {
  id: number;
  nombre: string;
  categoria: string;
  duracionMin: number;
  precio: number;
  descripcion: string;
  popular?: boolean;
}

const SERVICIOS_DATA: ServicioItem[] = [
  {
    id: 1,
    nombre: "Corte de Autor Signature",
    categoria: "CORTES & ESTILISMO",
    duracionMin: 45,
    precio: 75.0,
    descripcion: "Evaluación morfológica, lavado exfoliante de bienvenida, corte a tijera y navaja, y finalizado con cera mate.",
    popular: true,
  },
  {
    id: 2,
    nombre: "Ritual Barba Tradicional",
    categoria: "AFEITADO & BARBA",
    duracionMin: 40,
    precio: 60.0,
    descripcion: "Tratamiento de toalla caliente con aceites esenciales de cedro, perfilado a navaja japonesa y bálsamo hidratante.",
    popular: true,
  },
  {
    id: 3,
    nombre: "Servicio Completo Mercedez (Corte + Barba)",
    categoria: "EXPERIENCIAS COMPLETAS",
    duracionMin: 75,
    precio: 120.0,
    descripcion: "Nuestra experiencia insignia de relajación. Incluye corte de autor, ritual de toalla caliente y bebida de cortesía.",
    popular: true,
  },
  {
    id: 4,
    nombre: "Tratamiento Capilar Revitalizante",
    categoria: "TRATAMIENTOS SPA",
    duracionMin: 30,
    precio: 55.0,
    descripcion: "Masaje craneal estimulante, exfoliación del cuero cabelludo y mascarilla de biotina y carbón activado.",
  },
  {
    id: 5,
    nombre: "Perfilado Rápido de Barba & Contorno",
    categoria: "AFEITADO & BARBA",
    duracionMin: 20,
    precio: 35.0,
    descripcion: "Alineación de mejillas y cuello con máquina trimmer y acabado limpio a navaja.",
  },
  {
    id: 6,
    nombre: "Camuflaje de Canas / Color Barba",
    categoria: "COLOR & MATIZADO",
    duracionMin: 35,
    precio: 65.0,
    descripcion: "Tinte sutil sin amoniaco para difuminar canas de forma natural en cabello o barba.",
  },
  {
    id: 7,
    nombre: "Limpieza Facial Profunda Caballero",
    categoria: "TRATAMIENTOS SPA",
    duracionMin: 50,
    precio: 90.0,
    descripcion: "Vapor de ozono, extracción suave de impurezas, mascarilla de arcilla negra y suero antifatiga.",
  },
  {
    id: 8,
    nombre: "Corte Jr. Caballeros (Menores de 12)",
    categoria: "CORTES & ESTILISMO",
    duracionMin: 30,
    precio: 50.0,
    descripcion: "Corte con paciencia y detalle para los pequeños caballeros, incluye peinado.",
  },
];

export default function ServiciosPage() {
  const categorias = Array.from(new Set(SERVICIOS_DATA.map((s) => s.categoria)));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-950 text-white pb-20">
        {/* Cabecera */}
        <div className="relative py-16 px-6 sm:px-12 text-center border-b border-neutral-900 bg-gradient-to-b from-amber-950/20 via-black to-neutral-950">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-bold">
            CARTA DE SERVICIOS EXCLUSIVOS
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-serif tracking-wider text-white uppercase">
            Catálogo Mercedez Atelier
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-neutral-400 text-sm font-light leading-relaxed">
            Cada servicio combina precisión artesanal, productos de grado cosmecéutico y una experiencia privada de confort diseñada para caballeros.
          </p>
        </div>

        {/* Listado agrupado por categorías */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12 mt-12 space-y-16">
          {categorias.map((cat) => {
            const serviciosCat = SERVICIOS_DATA.filter((s) => s.categoria === cat);
            return (
              <section key={cat}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-sm font-bold tracking-[0.25em] text-[#dfb15b] uppercase">
                    {cat}
                  </h2>
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviciosCat.map((serv) => (
                    <div
                      key={serv.id}
                      className="group bg-black/60 border border-neutral-800/80 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 relative"
                    >
                      {serv.popular && (
                        <span className="absolute top-4 right-4 bg-amber-500/10 text-amber-400 border border-amber-500/40 text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-semibold">
                          Recomendado
                        </span>
                      )}

                      <div>
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h3 className="text-base font-medium text-white group-hover:text-amber-400 transition-colors">
                            {serv.nombre}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {serv.duracionMin} minutos
                          </span>
                          <span className="text-neutral-700">|</span>
                          <span className="font-semibold text-[#dfb15b]">
                            S/ {serv.precio.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                          {serv.descripcion}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                        <span className="text-xs text-neutral-500">
                          Reserva con 24h de anticipación
                        </span>
                        <Link
                          href={`/reservar?servicioId=${serv.id}`}
                          className="px-4 py-2 border border-amber-500/70 hover:bg-amber-500 hover:text-black text-amber-400 text-[11px] font-bold uppercase tracking-wider transition-all"
                        >
                          Agendar
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}

