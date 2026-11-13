"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/servicios");
  }, [router]);

  return (
    <div className="p-12 text-center text-xs text-neutral-500">
      Cargando panel de administración...
    </div>
  );
}

