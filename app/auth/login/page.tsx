import Link from "next/link";
import { FormLogin } from "./_components/form-login";

const LoginPage = () => {
  return (
    <div 
      className="w-full h-screen bg-gradient-to-r from-blue-950 to-purple-950 flex items-center justify-center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-80 p-5 rounded-lg shadow-lg">
        <div className="w-full rounded-lg" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <FormLogin />
        </div>
        <div className="mt-5">
          <p className="text-center text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="font-medium underline">
              Registrate
            </Link>
          </p>
        </div>
        <div className="mt-5">
          <p className="text-center text-muted-foreground">
            <Link href="/" className="font-medium underline">
              Volver
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
