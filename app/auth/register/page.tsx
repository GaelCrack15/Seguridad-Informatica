import Link from "next/link";
import { FormRegister } from "./_components/form-register";

const RegisterPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
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
  );
};

export default RegisterPage;
