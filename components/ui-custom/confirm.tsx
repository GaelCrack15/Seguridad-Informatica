"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <Dialog.Panel
          className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-6 max-w-md mx-auto shadow-lg"
          style={{ maxHeight: "80vh", maxWidth: "90%" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-black">
              Confirmación de Eliminación
            </h1>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              aria-label="Cerrar"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            <Dialog.Description>
              <div className="p-4 bg-white shadow-md rounded-lg">
                <p className="mt-2 mb-4 text-center text-gray-700">
                  ¿Estás seguro de que quieres eliminar este elemento? Esta
                  acción no se puede deshacer.
                </p>
                <div className="mt-8 flex justify-around">
                  <button
                    onClick={onConfirm}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
};

export default ConfirmationModal;
