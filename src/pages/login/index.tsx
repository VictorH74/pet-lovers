import { loginSchema } from "./validationSchema";
import data from "./data.json";
import { useRouter } from "next/router";
import FormLogo from "@/components/FormLogo";
import FormBase from "@/components/FormBase";
import GoogleBtn from "@/components/GoogleBtn";
import Line from "@/components/Line";
import WithFormik from "@/components/WithFormik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import ErrorMsg from "@/components/ErrorMsg";

type ErrorsStr =
  | "notEmailAndPassword"
  | "invalidEmail"
  | "invalidPassword"
  | string;

interface IFormValues {
  email: string;
  password: string;
}

const getErrorMsg = (str: ErrorsStr): string => {
  switch (str) {
    case "notEmailAndPassword":
      return "Por favor, informe o email e senha.";
    case "invalidEmail":
      return "Email inválido.";
    case "invalidPassword":
      return "Senha inválida.";
    default:
      return "Ocorreu algum erro inesperado.";
  }
};

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<{ message: string; status?: number }>({
    message: "",
  });

  useEffect(() => {
    if (router.query.error) {
      let msg = String(router.query.error) as ErrorsStr;
      setError({ message: getErrorMsg(msg) });
    }
  }, [router]);

  const handleSubmit = async ({ email, password }: IFormValues) => {
    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  if (session?.user) router.replace("/");

  return (
    <div className="@container">
      <div className="@[500px]:h-screen place-items-center @[500px]:grid block">
        <FormBase className="@[500px]:rounded-lg">
          <FormLogo text="Faça seu login" />
          <WithFormik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
            fieldArray={data}
            submitBtnLabel="Entrar"
            submitBtnClassName="w-full"
            fieldVariant="outlined"
            belowTheFields={
              <>
                {error?.message && <ErrorMsg>{error.message}</ErrorMsg>}
                <Link href="/signup">Fazer cadastro</Link>
              </>
            }
            fieldsContainerClassName="w-full mb-6"
          />

          <Line>OU</Line>
          <GoogleBtn />
        </FormBase>
      </div>
    </div>
  );
};
export default Login;
