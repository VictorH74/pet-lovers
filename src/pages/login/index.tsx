import { loginSchema } from "./validationSchema";
import data from "./data.json";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { useRouter } from "next/router";
import FormLogo from "@/components/FormLogo";
import FormBase from "@/components/FormBase";
import GoogleBtn from "@/components/GoogleBtn";
import Line from "@/components/Line";
import WithFormik from "@/components/WithFormik";
import Link from "next/link";

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { user, mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const router = useRouter();

  const handleSubmit = async (values: IFormValues) => {
    try {
      mutateUser(
        await fetchJson("/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
        false
      );
    } catch (error) {
      if (error instanceof FetchError) {
        // setErrorMsg(error.data.message);
        console.log(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  if (user) router.replace("/");

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
              <Link href="/signup">Fazer cadastro</Link>
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
