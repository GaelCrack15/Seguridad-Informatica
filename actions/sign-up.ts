"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { NewUser, users } from "@/lib/db/schema";
import { hashPassword, setSession } from "@/lib/auth/session";

import { formSchemaRegister } from "@/types/user";

export const signUp = async (values: z.infer<typeof formSchemaRegister>) => {
  try {
    const { full_name, email, password, birthdate, address, phone_number, gender, terms_accepted } = values;

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email)))
      .limit(1);

    if (user.length > 0) {
      return {
        response: "error",
        message: "El usuario ya se encuentra registrado",
      };
    }

    const passwordHash = await hashPassword(password);

    const newUser: NewUser = {
      full_name,
      email,
      password: passwordHash,
      role: "default",
      birthdate,
      address,
      phone_number,
      gender,
      terms_accepted
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();

    if (!createdUser) {
      return {
        response: "error",
        message: "Error al crear el usuario. Por favor intentalo de nuevo.",
      };
    }

    await setSession(createdUser);
    return { response: "success", messahe: "Cuenta creada correctamente" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
