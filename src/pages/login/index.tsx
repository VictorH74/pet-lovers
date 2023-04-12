import { loginSchema } from "./validationSchema";
import data from "./data.json";
import { useRouter } from "next/router";
import FormLogo from "@/components/FormLogo";
import FormBase from "@/components/FormBase";
import GoogleBtn from "@/components/GoogleBtn";
import Line from "@/components/Line";
import WithFormik from "@/components/WithFormik";
import Link from "next/link";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<{ message: string; status?: number }>({
    message: "",
  });

  const handleSubmit = async ({ email, password }: IFormValues) => {
    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  if (session?.user) router.replace("/");

  return (
    <div className="@container">
      <div className="h-screen place-items-center @[500px]:grid block">
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
            fieldVariant="outlined"
            belowTheFields={
              <>
                {error?.message && (
                  <p className="text-red-500 text-right uppercase">
                    {error.message}
                  </p>
                )}
                <Link href="/signup">Fazer cadastro</Link>
              </>
            }
            fieldsContainerClassName="w-full mb-6"
          />

          <Line>OU</Line>
          <GoogleBtn onClick={() => alert("Em desenvolvimento")} />
        </FormBase>
      </div>
    </div>
  );
};
export default Login;
