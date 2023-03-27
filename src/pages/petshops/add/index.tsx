import Fields from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import data from "./data.json";
import { Schema } from "./validationSchema";

const PetshopRegister = () => {
  return (
    <div >
      <main className="bg-custom-emerald w-[655px] rounded-lg p-20 text-center text-white m-auto my-16">
        <div>
          <Logo />
          <div className="bg-white h-[2px] w-16 m-auto" />
          <h2 className="text-2xl font-light">cadastro petshop</h2>
        </div>
        <p className="font-light">Proprietário: -</p>
        <Formik
          initialValues={{}}
          validationSchema={Schema}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div className="grid gap-4">
                <Fields
                  fieldArray={data[0]}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <h3 className="mt-[40px] text-xl">Endereço</h3>
              <div className="grid grid-cols-2 gap-4">
                <Fields
                  fieldArray={data[1]}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
              <button className="bg-custom-blue uppercase mt-10 px-10 py-3 rounded-3xl">
                Cadastrar
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default PetshopRegister;
