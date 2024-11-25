"use server";

import axios from "axios";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { setSession } from "@/lib/auth/session";

export const githubLoginSchema = z.object({
  code: z.string(),
});

export const githubLogin = async (code: string) => {
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      return { response: "error", message: "Error al obtener el token de acceso de GitHub." };
    }

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const githubUser = userResponse.data;

    if (!githubUser) {
      return { response: "error", message: "Error al obtener los datos del usuario de GitHub." };
    }

    let email = githubUser.email;

    if (!email) {
      const emailResponse = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const primaryEmail = emailResponse.data.find(
        (email: any) => email.primary && email.verified
      );

      email = primaryEmail?.email || null;

      if (!email) {
        console.warn("No se encontró un correo principal o verificado para el usuario:", githubUser.login);
      }
    }

    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      console.log("Creating user:", githubUser);

      await db.insert(users).values({
        full_name: githubUser.name || githubUser.login,
        email: email,
        password: "",
        role: "cliente",
        birthdate: null,
        address: null,
        phone_number: null,
        gender: null,
        terms_accepted: true,
      });

      user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    }

    await setSession(user[0]);

    return { response: "success", message: "Inicio de sesión correcto", user: user[0] };
  } catch (error: Error | any) {
    console.error("Error en la autenticación con GitHub:", error.response?.data || error.message);
    return { response: "error", message: "Error durante la autenticación con GitHub." };
  }
};
