"use client";
import { Header } from "@/components/ui-custom/header";
import { Sidebar } from "@/components/ui-custom/sidebar";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth(); // Obtén la información del usuario desde el contexto

  // Si el rol no es "admin", puedes redirigir o mostrar un mensaje
  if (auth?.role !== "admin") {
    toast.error("No tienes permisos para acceder a esta página");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-5">
          {/* Contenedor para manejar scroll horizontal */}
          <div className="overflow-x-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
