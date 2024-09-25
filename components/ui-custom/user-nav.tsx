"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/actions/sign-out";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserNav = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  async function handleSignOut() {
    setAuth(null);
    await signOut();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="py-2 px-2 items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/avatar.png"
              className="object-cover"
              alt="@templatemarketnet"
            />
            <AvatarFallback className="uppercase">
              {auth?.full_name?.charAt(0)}
              {auth?.full_name?.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-medium">{auth?.full_name}</p>
            <p className="text-xs text-muted-foreground">{auth?.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{auth?.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <i className="fi fi-rr-user mr-2"></i>
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <i className="fi fi-rr-settings mr-2"></i>
            <span>Ajustes</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <i className="fi fi-rr-exit mr-2"></i>
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
