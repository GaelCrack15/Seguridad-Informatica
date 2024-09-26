import { Header } from "@/components/ui-custom/header";
import { Sidebar } from "@/components/ui-custom/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
