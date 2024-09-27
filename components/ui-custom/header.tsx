"use client";

import { UserNav } from "@/components/ui-custom/user-nav";

export const Header = () => {
  return (
    <header className="h-20 px-6 flex items-center justify-between bg-white text-gray-800 shadow-md">
      <section className="text-2xl font-bold">
        ADMINIFY
      </section>
      <section>
        <ul className="flex items-center space-x-4">
          <li>
            <UserNav />
          </li>
        </ul>
      </section>
    </header>
  );
};
