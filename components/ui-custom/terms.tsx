"use client";

import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
} from "react-icons/ai"; // Icono de cerrar

interface ModalTermsProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void; // Nueva prop para manejar la aceptación
  onDeny: () => void; // Nueva prop para manejar la denegación
}

const ModalTerms = ({ isOpen, onClose, onAccept, onDeny }: ModalTermsProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel
          className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-6 max-w-md mx-auto shadow-lg transition-transform transform-gpu"
          style={{ maxHeight: "70vh", maxWidth: "90%", overflowY: "auto" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-blue-600">
              Términos y Condiciones
            </h1>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              aria-label="Cerrar"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <Dialog.Description>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <p className="mb-4">
                Bienvenido a <strong>Adminify</strong>. Al utilizar nuestros
                servicios, usted acepta cumplir con estos términos y
                condiciones. Si no está de acuerdo, no debe utilizar nuestros
                servicios.
              </p>

              <h2 className="text-xl font-semibold mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="mb-4">
                Al acceder y utilizar nuestra plataforma, usted acepta estar
                sujeto a estos términos. Si no está de acuerdo con alguno de
                estos términos, deberá interrumpir su uso inmediatamente.
              </p>

              <h2 className="text-xl font-semibold mb-4">
                2. Modificaciones a los Términos
              </h2>
              <p className="mb-4">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Le notificaremos sobre los cambios mediante
                una publicación en nuestra plataforma. Su uso continuado de los
                servicios después de la modificación de los términos constituirá
                su aceptación de los nuevos términos.
              </p>

              <h2 className="text-xl font-semibold mb-4">
                3. Uso de la Plataforma
              </h2>
              <p className="mb-4">
                Usted se compromete a utilizar la plataforma únicamente con
                fines legales y de acuerdo con las leyes aplicables. No debe
                utilizar la plataforma de ninguna manera que pueda dañar,
                deshabilitar, sobrecargar o perjudicar cualquier servidor, red o
                sistema.
              </p>

              <h2 className="text-xl font-semibold mb-4">
                4. Propiedad Intelectual
              </h2>
              <p className="mb-4">
                Todos los contenidos, marcas registradas y otros derechos de
                propiedad intelectual en la plataforma son propiedad de{" "}
                <strong>Adminify</strong> o de sus licenciantes. Queda
                estrictamente prohibida la reproducción, distribución o
                modificación sin nuestro consentimiento por escrito.
              </p>

              <h2 className="text-xl font-semibold mb-4">
                5. Limitación de Responsabilidad
              </h2>
              <p className="mb-4">
                En la medida máxima permitida por la ley,{" "}
                <strong>Adminify</strong> no será responsable de ningún daño
                directo, indirecto, incidental, especial o consecuente que surja
                del uso o la imposibilidad de uso de la plataforma.
              </p>

              <h2 className="text-xl font-semibold mb-4">6. Ley Aplicable</h2>
              <p className="mb-4">
                Estos términos se regirán e interpretarán de acuerdo con las
                leyes de <strong>México</strong>, sin dar efecto a ningún
                principio de conflictos de leyes.
              </p>

              <h2 className="text-xl font-semibold mb-4">7. Contacto</h2>
              <p className="mb-4">
                Si tiene alguna pregunta sobre estos términos, no dude en
                ponerse en contacto con nosotros a través de{" "}
                <strong>contacto@adminify.com</strong>.
              </p>
            </div>
          </Dialog.Description>
          <div className="flex space-x-4 mt-6">
            <Button
              onClick={() => {
                onAccept(); // Llama a la función onAccept
                onClose(); // Cierra el modal
              }}
              className="flex items-center justify-center w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <AiOutlineCheck className="mr-2" /> Aceptar
            </Button>
            <Button
              onClick={() => {
                onDeny(); // Llama a la función onDeny
                onClose(); // Cierra el modal
              }}
              className="flex items-center justify-center w-full bg-red-600 text-white hover:bg-red-700"
            >
              <AiOutlineCloseCircle className="mr-2" /> Denegar
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalTerms;
