"use client";

import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai"; // Icono de cerrar

interface ModalPrivacyProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPrivacy = ({ isOpen, onClose }: ModalPrivacyProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel
                    className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-6 max-w-md mx-auto shadow-lg transition-transform transform-gpu"
                    style={{ maxHeight: "70vh", maxWidth: "90%", overflowY: "auto" }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-blue-600">Aviso de Privacidad</h1>
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
                            <p className="mb-4 text-gray-700">
                                En <strong>Adminify</strong>, estamos comprometidos con la
                                protección de su privacidad. Esta política de privacidad
                                describe cómo recopilamos, usamos y compartimos su información
                                personal cuando utiliza nuestros servicios.
                            </p>

                            <h2 className="text-xl font-semibold mb-2 text-blue-500">
                                Información que recopilamos
                            </h2>
                            <p className="mb-2 text-gray-700">
                                Recopilamos la siguiente información personal cuando utiliza
                                nuestra plataforma:
                            </p>
                            <ul className="list-disc ml-6 mb-4 text-gray-700">
                                <li>Nombre completo</li>
                                <li>Correo electrónico</li>
                                <li>Fecha de nacimiento</li>
                                <li>Dirección</li>
                                <li>Número de teléfono</li>
                                <li>Género</li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2 text-blue-500">
                                Cómo utilizamos su información
                            </h2>
                            <p className="mb-2 text-gray-700">
                                Utilizamos la información recopilada para los siguientes fines:
                            </p>
                            <ul className="list-disc ml-6 mb-4 text-gray-700">
                                <li>Proporcionar y mejorar nuestros servicios</li>
                                <li>Procesar transacciones</li>
                                <li>Enviar notificaciones importantes</li>
                                <li>Cumplir con las obligaciones legales</li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2 text-blue-500">
                                Compartir información con terceros
                            </h2>
                            <p className="mb-2 text-gray-700">
                                No compartimos su información personal con terceros, excepto en
                                los siguientes casos:
                            </p>
                            <ul className="list-disc ml-6 mb-4 text-gray-700">
                                <li>Para cumplir con las leyes y regulaciones aplicables</li>
                                <li>Para proteger nuestros derechos o los derechos de otros</li>
                                <li>En caso de fusión, adquisición o venta de activos</li>
                            </ul>

                            <h2 className="text-xl font-semibold mb-2 text-blue-500">Sus derechos</h2>
                            <p className="mb-2 text-gray-700">
                                Usted tiene derecho a acceder, rectificar o eliminar su
                                información personal. También puede oponerse al procesamiento de
                                sus datos o solicitar la portabilidad de los mismos.
                            </p>

                            <h2 className="text-xl font-semibold mb-2 text-blue-500">
                                Cambios a esta política
                            </h2>
                            <p className="mb-2 text-gray-700">
                                Nos reservamos el derecho de actualizar esta política de
                                privacidad en cualquier momento. Le notificaremos de cualquier
                                cambio importante a través de nuestra plataforma o por correo
                                electrónico.
                            </p>

                            <p className="mb-4 text-gray-700">
                                Si tiene alguna pregunta sobre esta política de privacidad, no
                                dude en ponerse en contacto con nosotros a través de{" "}
                                <strong>contacto@adminify.com</strong>.
                            </p>
                        </div>
                    </Dialog.Description>
                    <Button 
                        className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200" 
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ModalPrivacy;
