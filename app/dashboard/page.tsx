"use client"; // Asegúrate de tener esto al inicio del archivo

import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUser,
  addUser,
} from "@/actions/userActions"; // Asegúrate de que addUser esté disponible

// Define la interfaz de User
interface User {
  id: number;
  name: string | null; // El nombre puede ser nulo
  email: string; // Email del usuario
  password?: string; // Propiedad opcional si no se utiliza
  role?: string; // Propiedad opcional si no se utiliza
  createdAt: Date; // Cambiado a string para coincidir con el formato recibido de la API
  updatedAt: Date; // Cambiado a string para coincidir con el formato recibido de la API
  deletedAt?: Date | null; // Propiedad opcional
  [key: string]: string | number | boolean | Date | null | undefined; // Permite el uso de claves dinámicas con tipos específicos
}

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estado para el modal de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // Campo para la contraseña

  // Estado para agregar un nuevo usuario
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>(""); // Campo para la nueva contraseña

  // Estado para el orden de las columnas
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        response,
        users: fetchedUsers = [],
        message = null,
      } = await getUsers();

      if (response === "success") {
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Inicialmente, los usuarios filtrados son todos los usuarios
      } else {
        setError(message);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios según el término de búsqueda
  useEffect(() => {
    const results = users.filter(
      (user) =>
        (user.name &&
          user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Ordenar usuarios según la configuración de orden
  useEffect(() => {
    if (sortConfig !== null) {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue != null && bValue != null && aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue != null && bValue != null && aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredUsers(sortedUsers);
    }
  }, [sortConfig, filteredUsers]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true); // Abrir el modal
  };

  const handleDelete = async (id: number) => {
    console.log("Eliminar usuario con ID:", id);
    const { response, message } = await deleteUser(id);
    if (response === "success") {
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Actualiza la lista filtrada
    } else {
      setError(message);
    }
  };

  const handleUpdate = async () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, name, email, password }; // Incluye la contraseña
      const { response, message } = await updateUser(
        currentUser.id,
        updatedUser
      );

      if (response === "success") {
        setUsers(
          users.map((user) =>
            user.id === currentUser.id
              ? { ...updatedUser, updatedAt: new Date() }
              : user
          )
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === currentUser.id
              ? { ...updatedUser, updatedAt: new Date() }
              : user
          )
        );
        setIsEditing(false); // Cerrar el modal
        setPassword(""); // Limpiar la contraseña
      } else {
        setError(message || "Error al actualizar el usuario");
      }
    }
  };

  const handleAddUser = async () => {
    const newUser = {
      name: newName,
      email: newEmail,
      password: newPassword, // Asegúrate de que newPassword esté definido
    };

    const { response, message, user: addedUser } = await addUser(newUser);

    // Verifica que addedUser tenga un valor válido antes de usarlo
    if (response === "success" && addedUser) {
      setUsers([...users, addedUser]);
      setFilteredUsers([...filteredUsers, addedUser]);
      setNewName(""); // Limpiar el campo de nombre
      setNewEmail(""); // Limpiar el campo de email
      setNewPassword(""); // Limpiar el campo de contraseña
      setIsAdding(false); // Cerrar el modal de agregar
    } else {
      setError(message || "Error al agregar el usuario");
    }
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formato de fecha y hora
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página de Dashboard</h1>

      {/* Botón para agregar nuevo usuario */}
      <button
        onClick={() => setIsAdding(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Agregar Usuario
      </button>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b font-semibold text-left cursor-pointer"
              onClick={() => requestSort("id")}
            >
              ID
            </th>
            <th
              className="py-2 px-4 border-b font-semibold text-left cursor-pointer"
              onClick={() => requestSort("name")}
            >
              Nombre
            </th>
            <th
              className="py-2 px-4 border-b font-semibold text-left cursor-pointer"
              onClick={() => requestSort("email")}
            >
              Email
            </th>
            <th
              className="py-2 px-4 border-b font-semibold text-left cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              Fecha de Creación
            </th>
            <th
              className="py-2 px-4 border-b font-semibold text-left cursor-pointer"
              onClick={() => requestSort("updatedAt")}
            >
              Última Modificación
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                {formatDateTime(user.createdAt.toString())}
              </td>
              <td className="py-2 px-4">
                {formatDateTime(user.updatedAt.toString())}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar un nuevo usuario */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {isEditing && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100">
            <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
