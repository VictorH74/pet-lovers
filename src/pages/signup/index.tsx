import { signupSchema } from "./validationSchema";
import data from "./data.json";
import fetchJson from "@/lib/fetchJson";
import { useRouter } from "next/router";
import FormBase from "@/components/FormBase";
import FormLogo from "@/components/FormLogo";
import GoogleBtn from "@/components/GoogleBtn";
import Line from "@/components/Line";
import WithFormik from "@/components/WithFormik";


interface IFormValues {
  name: string;
  email: string;
  password: string;
}

const UserRegister = () => {
  const router = useRouter();
  const handleSubmit = async (values: IFormValues) => {
    // console.log(values);
    let res = await fetchJson("api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(res);
    alert("Conta criada com sucesso!");
    router.replace("/login");
  };


  return (
    <FormBase>
      <FormLogo text="cadastrar usuário" />
      <GoogleBtn onClick={() => alert("Em desenvolvimento")} />
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
      />
    </FormBase>
  );
};

export default UserRegister;
