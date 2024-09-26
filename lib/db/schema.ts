import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
  boolean,
  decimal,
  integer
  //   integer,
} from "drizzle-orm/pg-core";
// import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("default"),
  birthdate: date("birthdate"),
  address: text("address"),
  phone_number: varchar("phone_number", { length: 15 }),
  gender: varchar("gender", { length: 10 }),
  terms_accepted: boolean("terms_accepted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Precio con dos decimales
  stock: integer("stock").notNull().default(0), // Cantidad en stock
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;