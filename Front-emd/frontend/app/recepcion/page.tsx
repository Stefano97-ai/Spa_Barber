"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecepcionPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/recepcion/citas-hoy");
  }, [router]);

  return (
    <div className="p-12 text-center text-xs text-neutral-500">
      Cargando portal de recepción...
    </div>
  );
}

