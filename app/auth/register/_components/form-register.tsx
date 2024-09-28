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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import ModalPrivacy from "@/components/ui-custom/privacy";
import ModalTerms from "@/components/ui-custom/terms";
import { motion } from "framer-motion"; // Importar Framer Motion
import { FaUser } from "react-icons/fa";
import { AiOutlineExclamationCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Ícono de advertencia

export const FormRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleAcceptTerms = () => {
    setIsTermsAccepted(true);
    form.setValue("terms_accepted", true); // Actualiza el valor en el formulario
    setTermsModalOpen(false);
  };

  const handleDenyTerms = () => {
    setIsTermsAccepted(false);
    form.setValue("terms_accepted", false); // Actualiza el valor en el formulario
    setTermsModalOpen(false);
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

  const {
    formState: { errors },
  } = form; // Obtener los errores desde formState

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
                {errors.full_name && ( // Verifica si hay un error para full_name
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    <span className="text-sm font-medium">
                      {errors.full_name.message}
                    </span>
                  </motion.div>
                )}
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
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Input
                      placeholder="test@test.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                    />
                  </motion.div>
                </FormControl>
                {errors.email && ( // Verifica si hay un error para email
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.email && (
                      <span className="text-sm font-medium">
                        {errors.email.message}
                      </span>
                    )}
                  </motion.div>
                )}
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormLabel className="font-semibold text-white">
                    Contraseña
                  </FormLabel>
                </motion.div>
                <FormControl>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative"
                  >
                    <Input
                      placeholder="*********"
                      type={showPassword ? "text" : "password"}
                      disabled={isLoading}
                      {...field}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </motion.div>
                </FormControl>
                {errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    <span className="text-sm font-medium">
                      {errors.password.message}
                    </span>
                  </motion.div>
                )}
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
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Input
                      type="date"
                      disabled={isLoading}
                      {...field}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                    />
                  </motion.div>
                </FormControl>
                {errors.birthdate && ( // Verifica si hay un error para birthdate
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.birthdate && (
                      <span className="text-sm font-medium">
                        {errors.birthdate.message}
                      </span>
                    )}
                  </motion.div>
                )}
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
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Input
                      placeholder="Ingresa tu dirección"
                      disabled={isLoading}
                      {...field}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                    />
                  </motion.div>
                </FormControl>
                {errors.address && ( // Verifica si hay un error para address
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.address && (
                      <span className="text-sm font-medium">
                        {errors.address.message}
                      </span>
                    )}
                  </motion.div>
                )}
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
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Input
                      placeholder="(123) 456-7890"
                      type="tel"
                      disabled={isLoading}
                      {...field}
                      className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                    />
                  </motion.div>
                </FormControl>
                {errors.phone_number && ( // Verifica si hay un error para phone_number
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.phone_number && (
                      <span className="text-sm font-medium">
                        {errors.phone_number.message}
                      </span>
                    )}
                  </motion.div>
                )}
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
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
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
                  </motion.div>
                </FormControl>
                {errors.gender && ( // Verifica si hay un error para gender
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.gender && (
                      <span className="text-sm font-medium">
                        {errors.gender.message}
                      </span>
                    )}
                  </motion.div>
                )}
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
                      {...field}
                      value={field.value ? "true" : "false"}
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
                {errors.terms_accepted && ( // Verifica si hay un error para full_name
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2"
                  >
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    <span className="text-sm font-medium">
                      {errors.terms_accepted.message}
                    </span>
                  </motion.div>
                )}
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
              <FaUser className="inline-block mr-2" /> {/* Ícono de usuario */}
              Registrarse
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
