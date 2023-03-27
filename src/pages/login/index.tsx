import Fields from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import { Schema } from "./validationSchema";
import data from "./data.json";
import Image from "next/image";

const googleSvg =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg";

const Login = () => {
  return (
    <div className="">
      <main className="bg-custom-emerald w-[482px] rounded-lg p-20 text-center text-white m-auto my-16">
        <div className="mb-8">
          <Logo />
          <div className="bg-white h-[2px] w-16 m-auto my-2" />
          <h2 className="text-2xl font-light uppercase">Faça seu login</h2>
        </div>
        <Formik
          initialValues={{}}
          validationSchema={Schema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div className="grid gap-4 my-6">
                <Fields
                  fieldArray={data}
                  fieldVariant="outlined"
                  labelColor="text-custom-gray"
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <button className="bg-custom-blue uppercase px-10 py-3 rounded-3xl">
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
        <button className="flex justify-center rounded-3xl py-2 m-auto w-full bg-white">
          <Image width={28} height={28} src={googleSvg} alt="google icon" />
          <p className="text-custom-gray">&nbsp;&nbsp;Continuar com o Google</p>
        </button>
      </main>
    </div>
  );
};

export default Login;
