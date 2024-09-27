"use server";

import { cookies } from "next/headers";

export async function signOut() {
  cookies().delete("session");
}

export async function signOut2() {
  const cookie = cookies();

  // Lista de cookies que deseas eliminar
  const cookiesToDelete = [
    "AEC",
    "AEC",
    "HSID",
    "NID",
    "OGP",
    "OGPC",
    "S",
    "SAPISID",
    "SID",
    "SIDCC",
    "SSID",
    "__Secure-1PAPISID",
    "__Secure-1PSID",
    "__Secure-1PSIDCC",
    "__Secure-1PSIDTS",
    "__Secure-3PAPISID",
    "__Secure-3PSID",
    "__Secure-3PSIDCC",
    "__Secure-3PSIDTS",
    "session",
  ];

  // Elimina cada cookie de la lista
  cookiesToDelete.forEach((cookieName) => {
    cookies().delete(cookieName);
  });
}
