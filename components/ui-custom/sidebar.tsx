"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { House, Package, User, Users } from "lucide-react";
import { Logo } from "@/components/ui-custom/logo";
import { useAuth } from "@/hooks/use-auth";

export const Sidebar = () => {
  const { auth } = useAuth(); // Obtén el usuario y su rol

  return (
    <aside className="h-full w-64 p-6 border-r border-gray-200 bg-white shadow-lg">
      <section className="flex flex-col h-full">
        <Logo className="mb-8" />
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-4 py-3 px-4 rounded-lg text-gray-800 font-bold hover:bg-secondary transition-colors duration-300"
                )}
              >
                <House className="h-5 w-5" />
                <span>Inicio</span>
              </Link>
            </li>

            <li className="border-b border-gray-300"></li> {/* Separador */}

            {/* Solo para admin */}
            {auth?.role === "admin" && (
              <li>
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-4 py-3 px-4 rounded-lg text-gray-800 hover:bg-secondary transition-colors duration-300"
                  )}
                >
                  <Users className="h-5 w-5" />
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
                    "flex items-center gap-4 py-3 px-4 rounded-lg text-gray-800 hover:bg-secondary transition-colors duration-300"
                  )}
                >
                  <Package className="h-5 w-5" />
                  <span>Productos</span>
                </Link>
              </li>
            )}

            {/* Acceso para todos */}
            <li>
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-4 py-3 px-4 rounded-lg text-gray-800 hover:bg-secondary transition-colors duration-300"
                )}
              >
                <User className="h-5 w-5" />
                <span>Perfil</span>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </aside>
  );
};
