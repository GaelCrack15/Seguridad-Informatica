import { db } from "./drizzle";
import { users } from "./schema";
import { hashPassword } from "@/lib/auth/session";

async function seed() {
  const email = "admin@test.com";
  const password = "admin123";
  const passwordHash = await hashPassword(password);

  await db
    .insert(users)
    .values([
      {
        full_name: "Admin",
        email: email,
        password: passwordHash,
        role: "admin",
      },
    ])
    .returning();

  console.log("🎉 Usuario inicial creado con exito.");
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });
