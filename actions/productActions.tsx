"use server";

import { db } from "@/lib/db/drizzle";
import { products } from "@/lib/db/schema"; // Asegúrate de tener el esquema de productos
import { NewProduct, UpdateProduct } from "@/types/products";
import { eq } from "drizzle-orm";
import { count, asc } from 'drizzle-orm';

// Obtener productos con paginación
export const getProducts = async (page: number, limit: number) => {
  try {
    const offset = (page - 1) * limit;

    // Realizar la consulta para obtener los productos
    const productList = await db
      .select()
      .from(products)
      .limit(limit)
      .offset(offset)
      .orderBy(asc(products.id));

    // Obtener el total de productos
    const totalProductsResult = await db.select({ count: count() }).from(products);
    const totalCount = totalProductsResult[0]?.count || 0; // Accedemos al conteo
    const totalPages = Math.ceil(totalCount / limit);

    return {
      response: "success",
      products: productList,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalProducts: totalCount,
      },
    };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al obtener productos: ${errorMessage}`,
    };
  }
};

// Agregar un nuevo producto
export const addProduct = async (productData: NewProduct) => {
  try {
    const newProduct: NewProduct = {
      ...productData,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [createdProduct] = await db.insert(products).values(newProduct).returning();

    return { response: "success", product: createdProduct };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al agregar producto: ${errorMessage}`,
    };
  }
};

// Actualizar un producto
export const updateProduct = async (id: number, productData: UpdateProduct) => {
  try {
    const updatedProduct: UpdateProduct = {
      ...productData,
      updated_at: new Date(),
    };

    const [product] = await db
      .update(products)
      .set(updatedProduct)
      .where(eq(products.id, id))
      .returning();

    return { response: "success", product };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al actualizar producto: ${errorMessage}`,
    };
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number) => {
  try {
    await db.delete(products).where(eq(products.id, id));
    return { response: "success", message: "Producto eliminado correctamente." };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message: string }).message || "Error desconocido";
    return {
      response: "error",
      message: `Error al eliminar producto: ${errorMessage}`,
    };
  }
};
