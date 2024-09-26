"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signUp } from "@/actions/sign-up";
import { formSchemaRegister } from "@/types/user";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import ModalPrivacy from "@/components/ui-custom/privacy";
import ModalTerms from "@/components/ui-custom/terms";
import { motion } from "framer-motion"; // Importar Framer Motion

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
    setIsTermsAccepted(true);
  };

  const handleDenyTerms = () => {
    setIsTermsAccepted(false);
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      birthdate: "",
      address: "",
      phone_number: "",
      gender: undefined,
      terms_accepted: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaRegister>) {
    setIsLoading(true);
    const res = await signUp(values);

    if (res?.response === "success") {
      router.push("/dashboard");
    } else {
      toast.error(res?.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      toast.error("Lea antes los términos y condiciones");
    } else {
      setIsTermsAccepted(false);
    }
  };

  // Variantes para animación
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const inputVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }} // Duración de la animación del contenedor
    >
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Registro
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          {/* Nombre completo */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Nombre completo
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }} 
                  >
                  <Input
                    placeholder="Jorge Alberto Valenzuela Castañón"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Correo electrónico */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Correo electrónico
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <Input
                    placeholder="test@test.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Contraseña */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Contraseña
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <Input
                    placeholder="*********"
                    type="password"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Fecha de nacimiento */}
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Fecha de nacimiento
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <Input
                    type="date"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Dirección */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Dirección
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu dirección"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Número de teléfono */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Número de teléfono
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <Input
                    placeholder="(123) 456-7890"
                    type="tel"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Género */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Género
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <select
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full p-2"
                  >
                    <option value="" disabled selected>
                      Selecciona tu género
                    </option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Aceptar términos y condiciones */}
          <FormField
            control={form.control}
            name="terms_accepted"
            render={({ field }) => (
              <FormItem>
                <motion.div
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isTermsAccepted}
                      onChange={handleCheckboxChange} // Cambiar aquí
                      className="h-4 w-4 border border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="font-semibold text-white">
                      Acepto los{" "}
                      <button
                        type="button"
                        onClick={() => setTermsModalOpen(true)}
                        className="text-red-300 underline"
                      >
                        términos y condiciones
                      </button>
                    </span>
                  </div>
                </motion.div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Botón de registro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button
              type="submit"
              className="w-full mt-4 bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-200"
              disabled={isLoading}
            >
              {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
              Ingresar
            </Button>
          </motion.div>
        </form>
      </Form>

      {/* Botón para ver política de privacidad */}
      <button
        type="button"
        onClick={() => setPrivacyModalOpen(true)}
        className="mt-4 text-red-300 underline"
      >
        Política de privacidad
      </button>

      {/* Modal para política de privacidad */}
      <ModalPrivacy
        isOpen={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
      <ModalTerms
        isOpen={isTermsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={handleAcceptTerms}
        onDeny={handleDenyTerms}
      />
    </motion.div>
  );
};
