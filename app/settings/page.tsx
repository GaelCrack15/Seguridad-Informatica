"use client"; // Asegúrate de que este archivo sea un componente de cliente

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { FaSave, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { updateUser } from "@/actions/userActions"; // Asegúrate de que updateUser esté disponible
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

const UserSettings = () => {
  const { auth } = useAuth();
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del usuario autenticado
  useEffect(() => {
    if (auth) {
      setName(auth.full_name);
      setEmail(auth.email);
      setRole(auth.role);
      setBirthdate(auth.birthdate || "");
      setAddress(auth.address || "");
      setPhoneNumber(auth.phone_number || "");
      setGender(auth.gender || "");
    }
  }, [auth]);

  const handleUpdate = async () => {
    const updatedUser = {
      ...auth, // Asume que auth tiene la información necesaria
      full_name,
      email,
      role,
      birthdate: birthdate || undefined,
      address: address || undefined,
      phone_number: phone_number || undefined,
      gender: gender || undefined,
    };

    // Solo agregar la contraseña si hay un valor en el input
    if (password) {
      updatedUser.password = password; // Solo agregar si la contraseña no está vacía
    } else {
      delete updatedUser.password; // Eliminar la propiedad si está vacía
    }

    if (!auth) {
      setError("Usuario no autenticado.");
      return;
    }

    setLoading(true);
    const { response, message } = await updateUser(auth.id, updatedUser);
    setLoading(false);

    if (response === "success") {
      setPassword(""); // Limpiar la contraseña
      toast.success("Cambios guardados con éxito!");
    } else {
      toast.error(message);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-2 text-center">
        Configuración de Usuario
      </h2>
      {loading && (
        <div className="flex items-center justify-center mb-2">
          <FaSpinner className="animate-spin text-blue-500 mr-2" size={24} />
          <span>Cargando...</span>
        </div>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleUpdate} className="space-y-2">
        <input
          type="text"
          placeholder="Nombre"
          value={full_name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          placeholder="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="tel"
          placeholder="Número de Teléfono"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <select
          title="Género"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Seleccionar Género</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <div className="flex justify-end space-x-2">
          <Link
            href="/dashboard"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Regresar
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
          >
            <FaSave className="mr-2" /> Guardar Cambios
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserSettings;
