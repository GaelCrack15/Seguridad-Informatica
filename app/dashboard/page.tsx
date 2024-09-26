"use client"; // Asegúrate de tener esto al inicio del archivo

import React, { useEffect, useState, useCallback } from "react";
import {
  getUsers,
  deleteUser,
  updateUser,
  addUser,
} from "@/actions/userActions"; // Asegúrate de que addUser esté disponible
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

// Define la interfaz de User
interface User {
  id: number;
  full_name: string | null;
  email: string;
  password?: string;
  role?: string;
  birthdate?: string | null;
  address?: string | null;
  phone_number?: string | null;
  gender?: string | null;
  terms_accepted?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  [key: string]: string | number | boolean | Date | null | undefined;
}

const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // Variables de paginación
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;

  useEffect(() => {
    // Filtrado por búsqueda
    // Filtrado por búsqueda
    const results = users.filter(
      (user) =>
        (user.full_name &&
          user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.role &&
          user.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.birthdate &&
          user.birthdate.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.address &&
          user.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.phone_number &&
          user.phone_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.gender &&
          user.gender.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.terms_accepted &&
          user.terms_accepted
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
    // Ordenar los resultados por ID
    results.sort((a, b) => a.id - b.id); // Asumiendo que `id` es un número
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Estado para el modal de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [terms_accepted, setTermsAccepted] = useState(false);

  // Estado para agregar un nuevo usuario
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>(""); // Campo para la nueva contraseña
  const [newRole, setNewRole] = useState<string>("");
  const [newBirthdate, setNewBirthdate] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [newGender, setNewGender] = useState<string>("");

  // Estado para el orden de las columnas
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  // Función para manejar cambios de orden
  const requestSort = useCallback(
    (key: string) => {
      let direction = "ascending";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  // Efecto para ordenar usuarios
  useEffect(() => {
    if (sortConfig !== null) {
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortConfig.key] ?? ""; // Asigna un valor por defecto
        const bValue = b[sortConfig.key] ?? ""; // Asigna un valor por defecto

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
      setFilteredUsers(sortedUsers);
    }
  }, [sortConfig, filteredUsers]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {
          response,
          users: fetchedUsers = [],
          pagination,
          message = null,
        } = await getUsers(currentPage, rowsPerPage);
        if (response === "success") {
          setUsers(fetchedUsers);
          setFilteredUsers(fetchedUsers);

          // Extrae totalUsers y totalPages de pagination
          if (pagination) {
            setTotalUsers(pagination.totalUsers); // Establece el total de usuarios
            setTotalPages(pagination.totalPages); // Establece el total de páginas
          }
        } else {
          toast.error(message);
        }
      } catch {
        toast.error("Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, rowsPerPage]);

  // Filtrar usuarios según el término de búsqueda
  useEffect(() => {
    const results = users.filter(
      (user) =>
        (user.full_name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.role ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.birthdate ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user.address ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone_number ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (user.gender ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.full_name || "");
      setEmail(currentUser.email);
      setRole(currentUser.role || "");
      setBirthdate(currentUser.birthdate || "");
      setAddress(currentUser.address || "");
      setPhoneNumber(currentUser.phone_number || "");
      setGender(currentUser.gender || "");
      setTermsAccepted(currentUser.terms_accepted || false);
    }
  }, [currentUser]);

  if (loading) return <div className="text-center">Cargando...</div>;

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
      toast.error(message);
    }
  };

  const handleUpdate = async () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        full_name,
        email,
        password,
        role,
        birthdate: birthdate || undefined, // Ensure birthdate is string or undefined
        address: address || undefined,
        phone_number: phone_number || undefined,
        gender: gender || undefined,
        terms_accepted: true,
      };
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
        toast.error(message);
      }
    }
  };

  const handleAddUser = async () => {
    const newUser = {
      full_name: newName,
      email: newEmail,
      password: newPassword, // Asegúrate de que newPassword esté definido
      role: newRole,
      birthdate: newBirthdate || undefined,
      address: newAddress || undefined,
      phone_number: newPhoneNumber || undefined,
      gender: newGender || undefined,
      terms_accepted: true,
    };

    const { response, message, user: addedUser } = await addUser(newUser);

    // Verifica que addedUser tenga un valor válido antes de usarlo
    if (response === "success" && addedUser) {
      setUsers([...users, addedUser]);
      setFilteredUsers([...filteredUsers, addedUser]);
      setNewName(""); // Limpiar el campo de nombre
      setNewEmail(""); // Limpiar el campo de email
      setNewPassword(""); // Limpiar el campo de contraseña
      setNewRole(""); // Limpiar el campo de rol
      setNewBirthdate(""); // Limpiar el campo de fecha de nacimiento
      setNewAddress(""); // Limpiar el campo de dirección
      setNewPhoneNumber(""); // Limpiar el campo de número de teléfono
      setNewGender(""); // Limpiar el campo de género
      setIsAdding(false); // Cerrar el modal de agregar
    } else {
      toast.error(message);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formato de fecha y hora
  };

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const utcDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return utcDate.toLocaleDateString(undefined, options);
  }

  function formatTime(dateString: string | number | Date): string {
    const date = new Date(dateString);
    const now = new Date();

    // Calcular la diferencia en milisegundos
    const diffInMilliseconds = now.getTime() - date.getTime();

    // Convertir la diferencia a segundos
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    // Calcular la diferencia en minutos, horas y días
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Determinar el formato de la salida
    if (diffInDays > 0) {
      return `hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
    } else if (diffInHours > 0) {
      return `hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    } else if (diffInMinutes > 0) {
      return `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
    } else {
      return "hace menos de un minuto";
    }
  }

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Resetea a la primera página al cambiar filas por página
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Verifica límites
    setCurrentPage(newPage);
  };

  // Renderiza usuarios actuales
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página de Dashboard</h1>

      {/* Botón para agregar nuevo usuario */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Agregar Usuario
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
        />
      </div>
      {/*Tabla de usuarios*/}
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("id")}
            >
              ID
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("full_name")}
            >
              Nombre
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("email")}
            >
              Email
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("role")}
            >
              Rol
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("birthdate")}
            >
              Fecha de Nacimiento
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("address")}
            >
              Dirección
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("phone_number")}
            >
              Número de Teléfono
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("gender")}
            >
              Género
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("terms_accepted")}
            >
              Términos Aceptados
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("createdAt")}
            >
              Fecha de Creación
            </th>
            <th
              className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort("updatedAt")}
            >
              Última Modificación
            </th>
            <th className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-6 border-b border-gray-300">{user.id}</td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.full_name}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.email}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.role}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.birthdate ? formatDate(user.birthdate.toString()) : "N/A"}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.address}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.phone_number}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.gender}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {user.terms_accepted ? "Sí" : "No"}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {formatDateTime(user.createdAt.toString())}
              </td>
              <td className="py-3 px-6 border-b border-gray-300">
                {formatTime(user.updatedAt.toString())}
              </td>
              <td className="py-3 px-6 flex flex-col items-center space-y-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <FaEdit className="mr-2" size={20} /> Editar
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <MdDelete className="mr-2" size={20} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        {/* Botón de página anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {/* Información de la página actual */}
        <span className="text-gray-700 font-medium">
          Página <span className="font-bold">{currentPage}</span> de{" "}
          {totalPages}
        </span>

        {/* Rango de usuarios visibles en esta página */}
        <span className="text-gray-700 font-medium">
          {indexOfFirstUser + 1} -{" "}
          {indexOfLastUser > filteredUsers.length
            ? filteredUsers.length
            : indexOfLastUser}{" "}
          de {totalUsers} usuarios
        </span>

        {/* Selector para cambiar filas por página */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Filas por página:</span>
          <select
            title="Filas por página"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Botón de página siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>

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

            <input
              type="text"
              placeholder="Rol"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              value={newBirthdate || ""}
              onChange={(e) => setNewBirthdate(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Dirección"
              value={newAddress || ""}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Número de Teléfono"
              value={newPhoneNumber || ""}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              title="Género"
              value={newGender || ""}
              onChange={(e) => setNewGender(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccionar Género
              </option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="otro">Otro</option>
            </select>

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
              value={full_name}
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

            <input
              type="text"
              placeholder="Rol"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              placeholder="Número de Teléfono"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              title="Género"
              value={gender || ""}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccionar Género
              </option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>

            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-200 flex items-center"
              >
                <FaTimes className="mr-2" /> {/* Ícono de cancelar */}
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 flex items-center"
              >
                <FaCheck className="mr-2" /> {/* Ícono de actualizar */}
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
