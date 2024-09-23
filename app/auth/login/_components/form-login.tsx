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

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-800">Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@test.com"
                    type="email"
                    disabled={isLoading}
                    {...field}
                    className="border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
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
                <FormLabel className="font-semibold text-gray-800">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    type="password"
                    disabled={isLoading}
                    {...field}
                    className="border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700" disabled={isLoading}>
            {isLoading && <Loader className="w-4 h-4 mr-3 animate-spin" />}
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
};
