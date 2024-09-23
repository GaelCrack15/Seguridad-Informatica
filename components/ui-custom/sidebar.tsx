import Link from "next/link";

import { cn } from "@/lib/utils";
import { House } from "lucide-react";

import { Logo } from "@/components/ui-custom/logo";

export const Sidebar = () => {
  return (
    <aside className="h-full w-56 p-5 border-r border-border">
      <section>
        <Logo className="mb-8 ml-4" />
        <ul>
          <li>
            <Link
              href="/"
              className={cn(
                "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
              )}
            >
              <House className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
              )}
            >
              <House className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={cn(
                "text-sm flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300"
              )}
            >
              <House className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};
