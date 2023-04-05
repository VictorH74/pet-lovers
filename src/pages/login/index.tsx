import Fields from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import { Schema } from "./validationSchema";
import data from "./data.json";
import Image from "next/image";
import useUser from "@/lib/useUser";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { useRouter } from "next/router";

const googleSvg =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg";

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
      <main className="bg-custom-emerald max-w-[482px] text-center text-white m-auto @[500px]:my-[4%] @[500px]:rounded-lg">
        <div className="p-[12%]">
          <div className="mb-8">
            <Logo />
            <div className="bg-white h-[2px] w-16 m-auto my-2" />
            <h2 className="text-2xl font-light uppercase">Faça seu login</h2>
          </div>
          <Formik
            initialValues={{
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
                <button
                  type="submit"
                  className="bg-custom-blue uppercase px-10 py-3 rounded-3xl hover:px-14 duration-200 "
                >
                  Entrar
                </button>
              </Form>
            )}
          </Formik>
          <div className="my-5 flex justify-center items-center gap-2">
            <div className="bg-white h-[2px] w-full" />
            <p>OU</p>
            <div className="bg-white h-[2px] w-full" />
          </div>
          <button
            type="button"
            className="flex justify-center rounded-3xl py-2 m-auto w-full bg-white"
          >
            <Image width={28} height={28} src={googleSvg} alt="google icon" />
            <p className="text-custom-gray">
              &nbsp;&nbsp;Continuar com o Google
            </p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
