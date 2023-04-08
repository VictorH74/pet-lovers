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
    <FormBase>
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
      />
      <Line>OU</Line>
      <GoogleBtn onClick={() => alert("Em desenvolvimento")} />
    </FormBase>
  );
};

export default Login;
