CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" varchar(20) DEFAULT 'default' NOT NULL,
	"birthdate" date,  -- Nuevo campo: Fecha de nacimiento
	"address" text,    -- Nuevo campo: Dirección
	"phone_number" varchar(15),  -- Nuevo campo: Teléfono
	"gender" varchar(10),  -- Nuevo campo: Género (Opcional)
	"terms_accepted" boolean DEFAULT false NOT NULL,  -- Nuevo campo: Aceptación de términos
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

