"use client"
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Boutique from "./components/Boutique";
import Institucional from "./components/Institucional";
import Servicios from "./components/Servicios";
import Barberos from "./components/Barberos";
import AtelierSede from "./components/AtelierSede";
import BannerVideo from "./components/BannerVideo";
import Testimonios from "./components/Testimonios";
import Footer from "./components/Footer";
import {useState} from "react";


export default function Home() {

    const [bolsa, setBolsa] = useState<any[]>([]);
    
    const agregarBolsa =(producto : any ) => {

    setBolsa ([...bolsa, producto]);

    }
  return (
    <>
      {/* 1. Barra de Navegación Superior */}
      <Navbar cantidadBolsa={bolsa.length} />

      <main>
        {/* 2. Hero Section Inmersivo con Cinta de Pilares */}
        <Hero />

        {/* 3. Boutique Mercedez (Cuidado de Barba, Cabello & Gift Cards) */}
        <Boutique alAgregar={agregarBolsa} />

        {/* 4. Sección Institucional: Oficio, Tradición & Distinción */}
        <Institucional />

        {/* Catálogo de Servicios & Barberos */}
        <Servicios />
        <Barberos />

        {/* 5. Nuestro Atelier (Sede Insignia Miraflores) */}
        <AtelierSede />

        {/* 6. Banner Multimedia: Ritual de Precisión */}
        <BannerVideo />

        {/* 7. Social Proof: Testimonios de Clientes */}
        <Testimonios />
      </main>

      {/* 8. Footer / Pie de Página Informativo */}
      <Footer />
    </>
  );
}
