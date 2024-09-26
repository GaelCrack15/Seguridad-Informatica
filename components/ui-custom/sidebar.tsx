"use client";

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { Logo } from "@/components/ui-custom/logo";
import { useAuth } from "@/hooks/use-auth";

export const Sidebar = () => {
  const { auth } = useAuth(); // Obtén el usuario y su rol

  return (
    <aside className="h-full w-56 p-5 border-r border-border bg-white shadow-md">
      <section>
        <Logo className="mb-8 ml-4" />
        <ul>
          <li>
            <Link
              href="/"
              className={cn(
                "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 font-bold text-gray-800"
              )}
            >
              <House className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </li>
          <li className="my-4 border-b border-gray-300"></li> {/* Separador */}

          {/* Solo para admin */}
          {auth?.role === "admin" && (
            <li>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
                )}
              >
                <House className="h-4 w-4" />
                <span>Usuarios</span>
              </Link>
            </li>
          )}

          {/* Solo para distribuidor y admin */}
          {(auth?.role === "distribuidor" || auth?.role === "admin") && (
            <li>
              <Link
                href="/products"
                className={cn(
                  "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
                )}
              >
                <House className="h-4 w-4" />
                <span>Productos</span>
              </Link>
            </li>
          )}

          {/* Acceso para todos */}
          <li>
            <Link
              href="/config"
              className={cn(
                "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
              )}
            >
              <House className="h-4 w-4" />
              <span>Configuración</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};
