import { z } from "zod";

// Esquema de validación para crear un nuevo producto
export const formSchemaProductCreate = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"), // Solo requerir mínimo
  description: z.string().max(500, "La descripción no puede exceder los 500 caracteres").optional(),
  price: z
    .number()
    .min(0.01, "El precio debe ser al menos 0.01")
    .max(99999999.99, "El precio no puede exceder 99,999,999.99"),
  stock: z
    .number()
    .int("La cantidad en stock debe ser un número entero")
    .min(0, "La cantidad en stock no puede ser negativa")
    .optional(),
});

// Esquema de validación para actualizar un producto
export const formSchemaProductUpdate = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio si se proporciona").optional(),
  description: z.string().max(500, "La descripción no puede exceder los 500 caracteres").optional(),
  price: z
    .number()
    .min(0.01, "El precio debe ser al menos 0.01")
    .max(99999999.99, "El precio no puede exceder 99,999,999.99")
    .optional(),
  stock: z
    .number()
    .int("La cantidad en stock debe ser un número entero")
    .min(0, "La cantidad en stock no puede ser negativa")
    .optional(),
});

// Interfaces para los productos
export interface NewProduct {
  name: string; // Nombre del producto es requerido
  description?: string; // Opcional para la descripción
  price: string; // Precio es requerido
  stock?: number; // Opcional para la cantidad en stock
  created_at?: Date; // Opcional para la creación
  updated_at?: Date; // Opcional para la actualización
}

export interface UpdateProduct {
  name?: string; // Nombre opcional para la actualización
  description?: string; // Opcional para la descripción
  price?: string; // Opcional para el precio
  stock?: number; // Opcional para la cantidad en stock
  updated_at?: Date; // Solo se necesita para saber cuándo fue actualizado
}
