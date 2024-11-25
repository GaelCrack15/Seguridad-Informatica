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

function loginWithGitHub() {
  const GITHUB_CLIENT_ID = "Ov23li3w91usHIwvaBE6"; // Asegúrate de que sea el correcto
  const REDIRECT_URI = "http://localhost:3000/api/auth/github/callback";

  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`
  );
}


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

      <div className="mt-6 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={loginWithGitHub}
            disabled={isLoading}
            className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            {isLoading}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6 mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Iniciar sesión con GitHub
          </Button>
        </motion.div>
      </div>

      <CaptchaModal
        isOpen={isCaptchaOpen}
        onClose={handleCaptchaClose}
        onCaptchaVerify={handleCaptchaSubmit}
      />
    </motion.div>
  );
};

