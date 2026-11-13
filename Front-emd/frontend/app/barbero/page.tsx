"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BarberoPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/barbero/agenda");
  }, [router]);

  return (
    <div className="p-12 text-center text-xs text-neutral-500">
      Cargando agenda de barbero...
    </div>
  );
}

