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
import { motion } from "framer-motion"; // Importar Framer Motion
import { AiOutlineExclamationCircle } from "react-icons/ai";
import CaptchaModal from "@/components/ui-custom/captcha";

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    if (!captchaToken) {
      setIsCaptchaOpen(true);
      return;
    }

    setIsLoading(true);
    const res = await signIn(values);

    if (res?.response === "success") {
      router.push("/dashboard");
    } else {
      toast.error(res?.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const onCaptchaVerify = (token: string | null) => {
    setCaptchaToken(token);
    setIsCaptchaOpen(false);
    form.handleSubmit(onSubmit)();
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
                    {errors.email && (
                      <span className="text-sm font-medium">
                        {errors.email.message}
                      </span>
                    )}
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
                  <Input
                    placeholder="*********"
                    type="password"
                    disabled={isLoading}
                    {...field}
                    className="border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 text-gray-900"
                  />
                </FormControl>
                {errors.password && (
                  <div className="flex items-center text-red-600 mt-1 bg-red-50 border border-red-300 rounded-md p-2">
                    <AiOutlineExclamationCircle className="mr-1 text-red-600" />
                    {errors.password && (
                      <span className="text-sm font-medium">
                        {errors.password.message}
                      </span>
                    )}
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

      {/* Modal para el captcha */}
      <CaptchaModal
        isOpen={isCaptchaOpen}
        onClose={() => setIsCaptchaOpen(false)}
        onCaptchaVerify={onCaptchaVerify}
      />
    </motion.div>
  );
};
