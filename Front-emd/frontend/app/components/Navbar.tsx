"use client"

export default function Navbar({ cantidadBolsa = 0 }: { cantidadBolsa?: number }) {


  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-black/95 backdrop-blur-md px-6 md:px-12 py-3.5 text-white border-b border-neutral-900">
      {/* 1. Emblema de Marca */}
      <a href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-full border border-amber-500/80 flex items-center justify-center text-amber-500 font-bold text-lg tracking-wider group-hover:bg-amber-500/10 transition-colors">
          M
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-widest text-white leading-tight">
            MERCEDEZ
          </span>
          <span className="text-[9px] tracking-widest text-amber-500/80 uppercase">
            BARBER ATELIER · EST. 2016
          </span>
        </div>
      </a>

      {/* 2. Menú Principal */}
      <nav className="hidden lg:flex items-center gap-8 text-xs tracking-widest font-medium">
        <a href="/reservar" className="text-white hover:text-amber-500 transition-colors">
          RESERVAR CITA
        </a>
        <a href="#boutique" className="text-white hover:text-amber-500 transition-colors">
          BOUTIQUE & TIENDA
        </a>
        <a href="#servicios" className="text-white hover:text-amber-500 transition-colors">
          SERVICIOS
        </a>
        <a href="#atelier" className="text-white hover:text-amber-500 transition-colors">
          MIRAFLORES ATELIER
        </a>
      </nav>

      {/* 3. Acciones de Usuario */}
      <div className="flex items-center gap-6">
        <a
          href="/login"
          className="flex items-center gap-2 text-xs tracking-wider text-neutral-200 hover:text-amber-500 transition-colors"
        >
          <svg
            className="w-4 h-4 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="hidden sm:inline font-semibold">MI CUENTA</span>
        </a>

        {/* Carrito con badge */}
        <button
          type="button"
          aria-label="Bolsa de compras"
          className="relative text-neutral-300 hover:text-amber-500 transition-colors p-1"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="absolute -top-1.5 -right-2 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
           {cantidadBolsa}  
          </span>
        </button>
      </div>
    </header>
  );
}