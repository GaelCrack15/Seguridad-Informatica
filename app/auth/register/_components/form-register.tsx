"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
      terms_accepted: true,
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

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
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
                <FormLabel className="font-semibold text-gray-800">
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jorge Alberto Valenzuela Castañón"
                    disabled={isLoading}
                    {...field}
                    className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 p-2"
                  />
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
                <FormLabel className="font-semibold text-gray-800">
                  Correo electrónico
                </FormLabel>
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
                <FormLabel className="font-semibold text-gray-800">
                  Contraseña
                </FormLabel>
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
                <FormLabel className="font-semibold text-gray-800">
                  Fecha de nacimiento
                </FormLabel>
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
                <FormLabel className="font-semibold text-gray-800">
                  Dirección
                </FormLabel>
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
                <FormLabel className="font-semibold text-gray-800">
                  Número de teléfono
                </FormLabel>
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
                <FormLabel className="font-semibold text-gray-800">
                  Género
                </FormLabel>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    readOnly
                    {...field}
                    value={field.value ? "true" : "false"}
                    className="h-4 w-4 border border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-semibold text-gray-800">
                    Acepto los{" "}
                    <button
                      type="button"
                      onClick={() => setTermsModalOpen(true)}
                      className="text-blue-600 underline"
                    >
                      términos y condiciones
                    </button>
                  </span>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 p-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader className="w-4 h-4 mr-3 animate-spin inline-block" />
            )}
            Ingresar
          </button>
        </form>
      </Form>

      {/* Botón para ver política de privacidad */}
      <button
        type="button"
        onClick={() => setPrivacyModalOpen(true)}
        className="mt-4 text-blue-600 underline"
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
    </div>
  );
};
