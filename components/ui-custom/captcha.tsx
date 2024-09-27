"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { signIn } from "@/actions/login";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptchaVerify: (token: string | null) => void;
}

const CaptchaModal = ({
  isOpen,
  onClose,
  onCaptchaVerify,
}: CaptchaModalProps) => {
  const TEST_SITE_KEY = "6LcmH3gpAAAAAJMyOYQ3i5K6O8pJ_apRs84A4nOg";

  const handleCaptchaVerify = (token: string | null) => {
    if (token) {
      onCaptchaVerify(token);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

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
            <h1 className="text-3xl font-bold text-blue-600">
              Verificación Captcha
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
                <p className="mb-4">
                  Por favor, completa el siguiente Captcha para continuar.
                </p>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={TEST_SITE_KEY}
                    onChange={handleCaptchaVerify}
                  />
                </div>
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
};


export default CaptchaModal;
