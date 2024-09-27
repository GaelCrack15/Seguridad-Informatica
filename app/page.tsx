"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaDatabase, FaUserShield, FaUsers, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useState } from "react";
import ModalPrivacy from "@/components/ui-custom/privacy";
import ModalTerms2 from "@/components/ui-custom/terms2";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};



export default function HomePage() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  return (
    <main>
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              initial="hidden"
              animate="visible"
              variants={slideIn}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Adminify
                <span className="block text-blue-500">Más Rápido Que Nunca</span>
              </h1>
              <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
               Gestione a sus empleados y productos de manera segura con nuestra plataforma diseñada para la eficacia y la seguridad
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/auth/register">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                    Comenzar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="bg-gray-400 hover:bg-gray-500 text-white rounded-full text-lg px-8 py-4 ml-5 inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                    Iniciar sesión
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
            >
              <Image
                src="/UsersHeader.jpg"
                alt="Adminify"
                className="w-full h-auto rounded-lg shadow-lg"
                width={800}
                height={350}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Características */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Características Principales</h2>
            <p className="mt-3 text-lg text-gray-500">Explore los beneficios principales de Adminify que ocasiona que su trabajo sea más fácil.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Gestión de Empleados", "Gestión de Productos", "Inicio de sesión y registro seguros"].map((feature, index) => (
              <motion.div
                key={feature}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeInOut" }}
              >
                {index === 0 && <FaUsers className="h-12 w-12 text-blue-500" />}
                {index === 1 && <FaDatabase className="h-12 w-12 text-blue-500" />}
                {index === 2 && <FaUserShield className="h-12 w-12 text-blue-500" />}
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature}</h3>
                <p className="mt-2 text-base text-gray-500">
                  {index === 0 && "Efficiently manage your team with our user-friendly interface."}
                  {index === 1 && "Haga un seguimiento de sus productos sin esfuerzo y de forma segura."}
                  {index === 2 && "Proteja sus datos con nuestras sólidas funciones de autenticación."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nueva Sección: Ejemplos de uso */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¡Vea a "Adminify" en acción!</h2>
            <p className="mt-3 text-lg text-gray-500">Observe cómo Adminify trabaja con escenarios de la vida real.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Eficiencia", image: "/eficiencia.jpg", description: "Vea cómo Adminify mejora la eficiencia in managing teams." },
              { title: "Gestión de Productos", image: "/gestion.png", description: "Experience seamless product management with Adminify." },
              { title: "Seguridad", image: "/seguridad-datos.jpg", description: "Descubra cómo Adminify protege los datos de su empresa de forma efectiva." }
            ].map((useCase, index) => (
              <motion.div
                key={useCase.title}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeInOut" }}
              >
                <Image
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-48 object-cover rounded-md"
                  width={800}
                  height={400}
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{useCase.title}</h3>
                <p className="mt-2 text-base text-gray-500">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">Acerca de Adminify</h3>
              <p className="mt-2 text-base text-gray-400 hover:text-white">
                Adminify es su solución todo en uno para gestionar los datos de empleados y productos de forma segura, garantizando operaciones eficientes y una experiencia de usuario segura.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Acceso Rápido</h3>
              <ul className="mt-2 text-gray-400">
                <li className="text-gray-400 hover:text-white">
                  <Link href="/auth/login">Inicie Sesión</Link>
                </li>
                <li className="text-gray-400 hover:text-white">
                  <Link href="/auth/register">Regítrese</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Síganos</h3>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="https://twitter.com" className="text-gray-400 hover:text-white" title="Twitter">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://facebook.com" className="text-gray-400 hover:text-white" title="Facebook">
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white" title="LinkedIn">
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Políticas</h3>
              <div className="mt-2 flex justify-center space-x-4">
                <ul className="mt-2 text-gray-400">
                  <li className="text-gray-400 hover:text-white">
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                  >
                    Términos y condiciones
                  </button>
                  <ModalTerms2
                    isOpen={isTermsModalOpen}
                    onClose={() => setTermsModalOpen(false)}
                  />
                  </li>
                  <li className="text-gray-400 hover:text-white">
                    <button
                      type="button"
                      onClick={() => setPrivacyModalOpen(true)}
                    >
                      Aviso de privacidad
                    </button> 
                    <ModalPrivacy
                      isOpen={isPrivacyModalOpen}
                      onClose={() => setPrivacyModalOpen(false)}
                    />

                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-400">&copy; 2024 Adminify. Todos los derechos reservados</p>
        </div>
      </footer>
    </main>
  );
}
