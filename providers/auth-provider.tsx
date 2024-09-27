"use client";

import { useState, createContext, ReactNode, useEffect } from "react";
import { User } from "@/lib/db/schema";
import { FaSpinner } from "react-icons/fa";

export interface AuthContextProps {
  auth: User | null;
  setAuth: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User | null>;
}) => {
  const [auth, setAuth] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Para manejar la carga

  useEffect(() => {
    // Maneja la promesa de manera asíncrona
    const fetchUser = async () => {
      try {
        const user = await userPromise;
        setAuth(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userPromise]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
          <FaSpinner className="animate-spin text-blue-500 mb-3" size={36} />
          <span className="text-lg font-semibold text-gray-700">Cargando...</span>
          <p className="text-sm text-gray-500 mt-1">Por favor, espera mientras cargamos los datos.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
