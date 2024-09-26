"use client"; // Asegúrate de tener esto al inicio del archivo

import React, { useEffect, useState, useCallback } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "@/actions/productActions"; // Asegúrate de que addProduct esté disponible
import { FaCheck, FaEdit, FaSpinner, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth"; // Tu hook personalizado para la autenticación
import { useRouter } from "next/navigation";

// Define la interfaz de Product
interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  [key: string]: string | number | boolean | Date | null | undefined;
}

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // Variables de paginación
  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirsProduct = indexOfLastProduct - rowsPerPage;

  useEffect(() => {
    // Filtrado por búsqueda
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Ordenar los resultados por ID
    results.sort((a, b) => a.id - b.id); // Asumiendo que `id` es un número
    setFilteredProducts(results);
  }, [searchTerm, products]);

  // Estado para el modal de edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number>(0);

  // Estado para agregar un nuevo producto
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>("");
  const [newStock, setNewStock] = useState<number>(0);

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

  // Efecto para ordenar productos
  useEffect(() => {
    if (sortConfig !== null) {
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        const aValue = a[sortConfig.key] ?? ""; // Asigna un valor por defecto
        const bValue = b[sortConfig.key] ?? ""; // Asigna un valor por defecto

        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
      setFilteredProducts(sortedProducts);
    }
  }, [sortConfig, filteredProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          response,
          products: fetchedProducts = [],
          pagination,
          message = null,
        } = await getProducts(currentPage, rowsPerPage);
        if (response === "success") {
          setProducts(
            fetchedProducts.map((product) => ({
              ...product,
              description: product.description ?? undefined,
            }))
          );
          setFilteredProducts(
            fetchedProducts.map((product) => ({
              ...product,
              description: product.description ?? undefined,
            }))
          );

          // Extrae totalProducts y totalPages de pagination
          if (pagination) {
            setTotalProducts(pagination.totalProducts); // Establece el total de productos
            setTotalPages(pagination.totalPages); // Establece el total de páginas
          }
        } else {
          toast.error(message);
        }
      } catch {
        toast.error("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setPrice(currentProduct.price);
      setDescription(currentProduct.description || "");
      setStock(currentProduct.stock || 0);
    }
  }, [currentProduct]);

  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth && (auth.role === "distribuidor" || auth.role === "admin")) {
      // No hacer nada si el usuario es un distribuidor
    } else if (auth && auth.role === "cliente") {
      router.replace("/settings"); // Redirigir a la página de configuración si no
    } else {
      router.replace("/"); // Redirigir a la página de configuración si no
    }
  }, [auth, router]);

  // Mostrar un mensaje de carga o nada mientras se verifica el auth
  if (!auth || (auth.role !== "admin" && auth.role !== "distribuidor")) {
    return null; // O puedes mostrar un spinner o mensaje de acceso restringido
  }

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

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true); // Abrir el modal
  };

  const handleDelete = async (id: number) => {
    console.log("Eliminar producto con ID:", id);
    const { response, message } = await deleteProduct(id);
    if (response === "success") {
      setProducts(products.filter((product) => product.id !== id));
      setFilteredProducts(
        filteredProducts.filter((product) => product.id !== id)
      ); // Actualiza la lista filtrada
    } else {
      toast.error(message);
    }
  };

  const handleUpdate = async () => {
    if (currentProduct) {
      const updatedProduct = {
        ...currentProduct,
        name,
        price,
        description,
        stock,
      };
      const { response, message } = await updateProduct(
        currentProduct.id,
        updatedProduct
      );

      if (response === "success") {
        setProducts(
          products.map((product) =>
            product.id === currentProduct.id
              ? { ...updatedProduct, updatedAt: new Date() }
              : product
          )
        );
        setFilteredProducts(
          filteredProducts.map((product) =>
            product.id === currentProduct.id
              ? { ...updatedProduct, updatedAt: new Date() }
              : product
          )
        );
        setIsEditing(false); // Cerrar el modal
      } else {
        toast.error(message);
      }
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: newName,
      price: newPrice.toString(), // Convert price to string
      description: newDescription || undefined,
      stock: newStock || undefined,
    };

    const {
      response,
      message,
      product: addedProduct,
    } = await addProduct(newProduct);

    if (response === "success" && addedProduct) {
      setProducts([
        ...products,
        {
          ...addedProduct,
          price: addedProduct.price,
          description: addedProduct.description ?? undefined,
        },
      ]);
      setFilteredProducts([
        ...filteredProducts,
        {
          ...addedProduct,
          price: addedProduct.price,
          description: addedProduct.description ?? undefined,
        },
      ]);
      setNewName(""); // Limpiar el campo de nombre
      setNewPrice(0); // Limpiar el campo de precio
      setNewDescription(""); // Limpiar el campo de descripción
      setNewStock(0); // Limpiar el campo de stock
      setIsAdding(false); // Cerrar el modal de agregar
    } else {
      toast.error(message);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Formato de fecha y hora
  };

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
      <h1 className="text-2xl font-bold mb-4">Gestion de Productos</h1>

      {/* Botón para agregar nuevo usuario */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Agregar Producto
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
        />
      </div>
      {/* Tabla de productos */}
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
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
                onClick={() => requestSort("name")}
              >
                Nombre del Producto
              </th>
              <th
                className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("category")}
              >
                Descripcion
              </th>
              <th
                className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("price")}
              >
                Precio
              </th>
              <th
                className="py-3 px-6 border-b-2 border-gray-300 font-semibold text-left text-gray-700 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("stock")}
              >
                Stock
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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b border-gray-300">
                  {product.id}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {product.name}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {product.description}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {product.price}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {product.stock}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {formatDateTime(product.createdAt.toString())}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {formatTime(product.updatedAt.toString())}
                </td>
                <td className="py-3 px-6 flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <FaEdit className="mr-2" size={20} /> Editar
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <MdDelete className="mr-2" size={20} /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          {indexOfLastProduct + 1} -{" "}
          {indexOfFirsProduct > filteredProducts.length
            ? filteredProducts.length
            : indexOfLastProduct}{" "}
          de {totalProducts} usuarios
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
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>

            <input
              type="text"
              placeholder="Nombre del Producto"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Descripción"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Precio"
              value={newPrice || ""}
              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Stock"
              value={newStock || ""}
              onChange={(e) => setNewStock(parseInt(e.target.value))}
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
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {isEditing && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 scale-95 hover:scale-100">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

            <input
              type="text"
              placeholder="Nombre del Producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Precio"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock || ""}
              onChange={(e) => setStock(parseInt(e.target.value))}
              className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

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
