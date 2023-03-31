import Fields, { textFieldStyle } from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import data from "./data.json";
import { Schema } from "./validationSchema";
import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { API_KEY } from "@/utils/constants";
import { useDebounce } from "react-use";

const apiKey = API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const PetshopRegister = () => {
  const [response, setResponse] = useState<any[]>([]);
  const [addressValue, setAddress] = useState("");
  const [location, setLocation] = useState<string | undefined>(undefined);

  useEffect(() => console.log(location), [location]);

  const [, cancel] = useDebounce(
    () => {
      if (!addressValue) return;
      geocode();
    },
    1000,
    [addressValue]
  );

  const clear = () => {
    setResponse([]);
  };

  const geocode = async () => {
    clear();

    try {
      let res = await (
        await fetch(
          `${geocodeJson}?address=${addressValue}&language=pt-BR&key=${apiKey}`
        )
      ).json();

      let { results } = res;
      console.log(results);
      setResponse(results);
    } catch (e) {
      alert("Geocode was not successful for the following reason: " + e);
    }
  };

  const formatLocation = (obj: { lat: number; lng: number }) => {
    return `lat=${obj.lat}__lgn=${obj.lng}`;
  };

  return (
    <div>
      <main className="bg-custom-emerald w-[655px] rounded-lg p-20 text-center text-white m-auto my-16">
        <div>
          <Logo />
          <div className="bg-white h-[2px] w-16 m-auto" />
          <h2 className="text-2xl font-light">cadastro petshop</h2>
        </div>
        <p className="font-light">Proprietário: -</p>
        <Formik
          initialValues={{
            name: "",
            description: "",
            website: "",
            phone: "",
            address: "",
          }}
          validationSchema={Schema}
          onSubmit={(values) => console.log(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
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
                <TextField
                  autoComplete="none"
                  sx={textFieldStyle}
                  variant={"standard"}
                  className="text-white"
                  label={<p className="text-white">Endereço</p>}
                  id="address"
                  name="address"
                  value={addressValue}
                  onChange={(e) => {
                    let { value } = e.target;
                    setAddress(value);
                  }}
                  onBlur={handleBlur}
                />
                {errors["address" as keyof typeof errors] &&
                  touched["address" as keyof typeof touched] && (
                    <p className="text-right text-red-500 font-semibold uppercase text-xs">
                      {String(errors["address" as keyof typeof errors])}
                    </p>
                  )}
              </div>
              <div className="">
                <pre className="shadow-md rounded-lg mt-2 overflow-hidden text-left">
                  {response.map((address, index) => (
                    <p
                      className="hover:bg-custom-blue text-custom-gray p-2 hover:text-white cursor-pointer duration-150 truncate"
                      onClick={() => {
                        setFieldValue("address", address.formatted_address);
                        setAddress(address.formatted_address);
                        setLocation(
                          formatLocation(address?.geometry?.location)
                        );
                        cancel();
                        clear();
                      }}
                      key={index}
                    >
                      {address.formatted_address}
                    </p>
                  ))}
                </pre>
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
