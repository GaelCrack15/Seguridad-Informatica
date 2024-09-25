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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { motion } from "framer-motion"; // Importar Framer Motion

export const FormLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
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
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Iniciar Sesión</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
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
                  <FormLabel className="font-semibold text-white">Correo electrónico</FormLabel>
                </motion.div>
                <FormControl>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }} 
                  >
                    <Input
                      placeholder="test@test.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                      className="border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 text-gray-900"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <FormLabel className="font-semibold text-white">Contraseña</FormLabel>
                </motion.div>
                <FormControl>
                  <motion.div
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.1 }} 
                  >
                    <Input
                      placeholder="*********"
                      type="password"
                      disabled={isLoading}
                      {...field}
                      className="border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 text-gray-900"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Button type="submit" className="w-full mt-4 bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-200" disabled={isLoading}>
              {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
              Ingresar
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};
