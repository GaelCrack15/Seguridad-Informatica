"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaDatabase, FaUserShield, FaUsers, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useState } from "react";
import ModalPrivacy from "@/components/ui-custom/privacy";

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
                <span className="block text-blue-500">Faster Than Ever</span>
              </h1>
              <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Manage your employees and products securely with our platform, designed for efficiency and safety.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/auth/register">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                    Get Started
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
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Main Features</h2>
            <p className="mt-3 text-lg text-gray-500">Explore the key benefits of Adminify that make your work easier.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Employee Management", "Product Management", "Secure Login & Sign Up"].map((feature, index) => (
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
                  {index === 1 && "Keep track of your products effortlessly and securely."}
                  {index === 2 && "Protect your data with our robust authentication features."}
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
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">See Adminify in Action</h2>
            <p className="mt-3 text-lg text-gray-500">Check out how Adminify works in real-life scenarios.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Efficiency", image: "/eficiencia.jpg", description: "See how Adminify improves efficiency in managing teams." },
              { title: "Product Managment", image: "/gestion.png", description: "Experience seamless product management with Adminify." },
              { title: "Security", image: "/seguridad-datos.jpg", description: "Learn how Adminify secures your business data effectively." }
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
              <h3 className="text-lg font-semibold text-white">About Adminify</h3>
              <p className="mt-2 text-base text-gray-400 hover:text-white">
                Adminify is your all-in-one solution for managing employee and product data securely, ensuring efficient operations and a safe user experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-2 text-gray-400">
                <li className="text-gray-400 hover:text-white">
                  <Link href="/auth/login">Login</Link>
                </li>
                <li className="text-gray-400 hover:text-white">
                  <Link href="/auth/register">Sign Up</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
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
              <h3 className="text-lg font-semibold text-white">Terms and conditions</h3>
              <div className="mt-2 flex justify-center space-x-4">
                <ul className="mt-2 text-gray-400">
                  <li className="text-gray-400 hover:text-white">

                    
      
                  </li>
                  <li className="text-gray-400 hover:text-white">
                    <button
                      type="button"
                      onClick={() => setPrivacyModalOpen(true)}
                    >
                      Política de privacidad
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
          <p className="mt-8 text-sm text-gray-400">&copy; 2024 Adminify. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
