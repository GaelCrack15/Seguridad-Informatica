import Link from "next/link";
import { FormLogin } from "./_components/form-login";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
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
    </div>
  );
};

export default LoginPage;
