"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "@/actions/login";
import { formSchemaLogin } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import {
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import CaptchaModal from "@/components/ui-custom/captcha";
import { AiOutlineGoogle } from "react-icons/ai"; // Asegúrate de tener la librería instalada
import { signIn as signInNext } from "next-auth/react";

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
    setIsLoading(true);
  
    if (!captchaToken) {
      setIsCaptchaOpen(true);
      setIsLoading(false);
      return;
    }
  
    const res = await signInNext("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  
    if (res?.error) {
      toast.error(res.error);  // Enviar el error si es que hay
    } else {
      // Redirigir en caso de éxito
      router.push("/dashboard");
    }
  
    setIsLoading(false);
  };

  // Verificación del Captcha
  const handleCaptchaSubmit = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);
      setIsCaptchaOpen(false);
      form.handleSubmit(onSubmit)();
    } else {
      toast.error("Captcha no verificado. Inténtalo de nuevo.");
    }
  };

  const handleCaptchaClose = () => {
    setIsCaptchaOpen(false);
    if (captchaToken) {
      form.handleSubmit(onSubmit)();
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg rounded-lg"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Iniciar Sesión
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          {/* Agregar botón de inicio de sesión con Google */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button
              type="button"
              className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
              onClick={() => signInNext("google")}
            >
              <AiOutlineGoogle className="mr-2" />
              Iniciar sesión con Google
            </Button>
          </motion.div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-white">
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@test.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                    className="border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 text-gray-900"
                  />
                </FormControl>
                {errors.email && (
                  <div className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2">
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    <span className="text-sm font-medium">
                      {errors.email.message}
                    </span>
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-white">
                  Contraseña
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="*********"
                      type={showPassword ? "text" : "password"}
                      disabled={isLoading}
                      {...field}
                      className="border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 text-gray-900"
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
                  </div>
                </FormControl>
                {errors.password && (
                  <div className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2">
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    <span className="text-sm font-medium">
                      {errors.password.message}
                    </span>
                  </div>
                )}
              </FormItem>
            )}
          />

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

      <CaptchaModal
        isOpen={isCaptchaOpen}
        onClose={handleCaptchaClose}
        onCaptchaVerify={handleCaptchaSubmit}
      />
    </motion.div>
  );
};
