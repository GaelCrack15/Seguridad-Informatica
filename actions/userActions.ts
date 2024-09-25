"use server";

import { hashPassword } from "@/lib/auth/session";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { NewUser, UpdateUser } from "@/types/user";
import { eq } from "drizzle-orm";
import { count } from 'drizzle-orm';


// Obtener usuarios con paginación
export const getUsers = async (page: number, limit: number) => {
  try {
    const offset = (page - 1) * limit;

    // Realizar la consulta para obtener los usuarios
    const usersList = await db
      .select()
      .from(users)
      .limit(limit)
      .offset(offset);

    // Obtener el total de usuarios
    const totalUsersResult = await db.select({ count: count() }).from(users);


    const totalCount = totalUsersResult[0]?.count || 0; // Accedemos al conteo
    const totalPages = Math.ceil(totalCount / limit);

    return {
      response: "success",
      users: usersList,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalUsers: totalCount,
      },
    };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al obtener usuarios: ${errorMessage}`,
    };
  }
};

// Get total count of users
export const getTotalUsers = async () => {
  try {
    const totalUsersResult = await db.select({ count: count() }).from(users);
    const totalCount = totalUsersResult[0]?.count || 0; // Access the count
    return { response: "success", totalUsers: totalCount };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al obtener el total de usuarios: ${errorMessage}`,
    };
  }
};


// Agregar un nuevo usuario
export const addUser = async (userData: NewUser) => {
  try {
    const newUser: NewUser = {
      ...userData,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();

    return { response: "success", user: createdUser };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al agregar usuario: ${errorMessage}`,
    };
  }
};

// Actualizar un usuario
export const updateUser = async (id: number, userData: UpdateUser) => {
  try {
    // Extraer la contraseña si existe en userData
    const { password } = userData;

    // Hashear la contraseña solo si se proporciona
    const passwordHash = password ? await hashPassword(password) : undefined;

    // Crear un objeto de usuario actualizado, excluyendo la contraseña si no se proporciona
    const updatedUser: UpdateUser = {
      ...userData,
      ...(passwordHash && { password: passwordHash }), // Solo incluir la contraseña hasheada si existe
      updated_at: new Date(),
    };

    const [user] = await db
      .update(users)
      .set(updatedUser)
      .where(eq(users.id, id))
      .returning();

    return { response: "success", user };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al actualizar usuario: ${errorMessage}`,
    };
  }
};

// Eliminar un usuario
export const deleteUser = async (id: number) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    return { response: "success", message: "Usuario eliminado correctamente." };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al eliminar usuario: ${errorMessage}`,
    };
  }
};
