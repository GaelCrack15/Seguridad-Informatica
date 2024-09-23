import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña es requerida",
  }),
});

export const formSchemaRegister = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña es requerida",
  }),
});

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role?: string; // Opcional, si no siempre se proporciona
  created_at?: Date; // Opcional para la creación
  updated_at?: Date; // Opcional para la actualización
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  updated_at?: Date; // Solo se necesita para saber cuándo fue actualizado
}
