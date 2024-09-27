import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .max(255, {
      message: "El email no puede exceder los 255 caracteres",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña es requerida",
    })
    .max(100, {
      message: "La contraseña no puede exceder los 100 caracteres",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
});

export const formSchemaRegister = z.object({
  full_name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  email: z.string().email("El correo electrónico no es válido").max(255, {
    message: "El correo electrónico no puede exceder los 255 caracteres",
  }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede exceder los 100 caracteres")
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
  birthdate: z.string().nonempty("La fecha de nacimiento es obligatoria"),
  address: z.string().nonempty("La dirección es obligatoria"),
  phone_number: z
    .string()
    .max(15, "El número de teléfono no puede exceder los 15 caracteres")
    .nonempty("El número de teléfono es obligatorio"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Selecciona un género",
  }),
  terms_accepted: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export interface NewUser {
  full_name: string;
  email: string;
  password: string;
  role?: string; // Opcional, si no siempre se proporciona
  birthdate?: string; // Opcional para la fecha de nacimiento
  address?: string; // Opcional para la dirección
  phone_number?: string; // Opcional para el teléfono
  gender?: string; // Opcional para el género
  terms_accepted?: boolean; // Opcional, ya que se puede asumir que es true al registrarse
  created_at?: Date; // Opcional para la creación
  updated_at?: Date; // Opcional para la actualización
}

export interface UpdateUser {
  full_name?: string;
  email?: string;
  password?: string;
  role?: string;
  birthdate?: string; // Opcional para la fecha de nacimiento
  address?: string; // Opcional para la dirección
  phone_number?: string; // Opcional para el teléfono
  gender?: string; // Opcional para el género
  updated_at?: Date; // Solo se necesita para saber cuándo fue actualizado
}


export const formSchemaEdit = z.object({
  full_name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  email: z.string().email("El correo electrónico no es válido").max(255, {
    message: "El correo electrónico no puede exceder los 255 caracteres",
  }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña no puede exceder los 100 caracteres")
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    })
    .optional(),
  birthdate: z.string().nonempty("La fecha de nacimiento es obligatoria"),
  address: z.string().nonempty("La dirección es obligatoria"),
  phone_number: z
    .string()
    .max(15, "El número de teléfono no puede exceder los 15 caracteres")
    .nonempty("El número de teléfono es obligatorio"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Selecciona un género",
  }),
});
