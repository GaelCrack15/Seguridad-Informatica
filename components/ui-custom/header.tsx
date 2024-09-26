"use client";

import { UserNav } from "@/components/ui-custom/user-nav";

export const Header = () => {
  return (
    <header className="h-20 px-5 flex items-center justify-between bg-white text-gray-800 shadow-lg">
      <section className="text-xl font-bold">LOGO</section>
      <section>
        <ul className="flex items-center space-x-6">
          <li>
            <UserNav />
          </li>
        </ul>
      </section>
    </header>
  );
};
