import Fields from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import { Schema } from "./validationSchema";
import data from "./data.json";
import Image from "next/image";
import fetchJson from "@/lib/fetchJson";
import { useRouter } from "next/router";

const googleSvg =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

const UserRegister = () => {
  const router = useRouter()
  const handleSubmit = async (values: IFormValues) => {
    // console.log(values);
    let res = await fetchJson("api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
    console.log(res)
    alert("Conta criada com sucesso!")
    router.replace("/login")
  };
  return (
    <div className="@container">
      <main className="bg-custom-emerald max-w-[482px] @[500px]:rounded-lg text-center text-white m-auto @[500px]:my-[4%]">
        <div className="p-[12%]">
          <div className="mb-8">
            <Logo />
            <div className="bg-white h-[2px] w-16 m-auto my-2" />
            <h2 className="text-2xl font-light uppercase">cadastrar usuário</h2>
          </div>
          <button className="flex justify-center rounded-3xl py-2 m-auto w-full bg-white">
            <Image width={28} height={28} src={googleSvg} alt="google icon" />
            <p className="text-custom-gray">
              &nbsp;&nbsp;Continuar com o Google
            </p>
          </button>
          <div className="my-5 flex justify-center items-center gap-2">
            <div className="bg-white h-[2px] w-full" />
            <p>OU</p>
            <div className="bg-white h-[2px] w-full" />
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={Schema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="grid gap-4 my-6">
                  <Fields
                    fieldArray={data}
                    fieldVariant="outlined"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
                <button className="bg-custom-blue uppercase px-10 py-3 rounded-3xl hover:px-14 duration-200">
                  cadastrar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default UserRegister;
