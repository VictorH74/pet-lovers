import { signupSchema } from "./validationSchema";
import data from "./data.json";
import fetchJson from "@/lib/fetchJson";
import { useRouter } from "next/router";
import FormBase from "@/components/FormBase";
import FormLogo from "@/components/FormLogo";
import GoogleBtn from "@/components/GoogleBtn";
import Line from "@/components/Line";
import WithFormik from "@/components/WithFormik";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

const UserRegister = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (values: IFormValues) => {
    console.log(values);
    let res = await fetchJson("api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });
    console.log(res);
    alert("Conta criada com sucesso!");
    router.replace("/login");
  };

  if (session?.user) router.replace("/");

  return (
    <div className="@container">
      <div className="h-screen place-items-center @[500px]:grid block">
        <FormBase className="@[500px]:rounded-lg">
          <FormLogo text="cadastrar usuário" />
          <GoogleBtn />
          <Line>OU</Line>
          <WithFormik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
            fieldArray={data}
            fieldVariant="outlined"
            submitBtnLabel="Cadastrar"
            belowTheFields={
              <Link href="/login">Já possui uma conta? Fazer login</Link>
            }
            fieldsContainerClassName="w-full mb-6"
          />
        </FormBase>
      </div>
    </div>
  );
};

export default UserRegister;
