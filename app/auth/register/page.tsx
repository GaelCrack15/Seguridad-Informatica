import Link from "next/link";
import { FormRegister } from "./_components/form-register";

const RegisterPage = () => {
  return (
    <div 
      className="w-full h-screen bg-gradient-to-r from-blue-950 to-purple-950 flex items-center justify-center"
      style={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-80 p-5 rounded-lg shadow-lg">
        <div className="w-full rounded-lg" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <FormRegister />
        </div>
        <div className="mt-5">
          <p className="text-center text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="font-medium underline">
              Ingresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
