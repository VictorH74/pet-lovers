import Fields, { textFieldStyle } from "@/components/InputField";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import data from "./data.json";
import { Schema } from "./validationSchema";
import { TextField } from "@mui/material";
import { useState } from "react";
import { API_KEY } from "@/utils/constants";
import { useDebounce } from "react-use";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext } from "next";
import { sessionOptions } from "@/lib/session";
import { useRouter } from "next/router";

const apiKey = API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

type ErrorMsg = {
  emptyLocation: boolean;
};

interface IFormValues {
  name: string;
  description: string;
  website: string;
  phone: string;
}

const PetshopRegister = ({ user }: { user: User }) => {
  const [response, setResponse] = useState<any[]>([]);
  const [addressValue, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined
  );
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    emptyLocation: false,
  });
  const router = useRouter()

  useDebounce(
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
      // console.log(results);
      setResponse(results);
    } catch (e) {
      alert("Geocode was not successful for the following reason: " + e);
    }
  };

  const formatLocation = (obj: { lat: number; lng: number }) => {
    return `lat=${obj.lat}__lgn=${obj.lng}`;
  };

  const handleSubmit = (values: IFormValues) => {
    if (!location) {
      setErrorMsg((prev) => ({
        ...prev,
        emptyLocation: true,
      }));
    }

    let finalValues = { ...values, location };
    console.log(finalValues);
  };

  if (!user) router.replace("/login")

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
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
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
                <TextField
                  autoComplete="none"
                  placeholder={addressValue || "Digite seu endereço"}
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
                  onBlur={() =>
                    setErrorMsg((prev) => ({
                      ...prev,
                      emptyLocation: !!location,
                    }))
                  }
                />
                {selectedAddress ? (
                  <span className="flex items-center text-xs mt-0 text-left text-white w-fit p-[4px] rounded-md bg-custom-blue font-semibold">
                    <LocationOnIcon /> {selectedAddress}
                  </span>
                ) : (
                  errorMsg.emptyLocation && (
                    <p className="text-right text-custom-red font-semibold uppercase text-xs">
                      Nenhum endereço selecionado
                    </p>
                  )
                )}
              </div>
              <div className="">
                <pre className="shadow-md rounded-lg mt-2 overflow-hidden text-left">
                  {response.map((address, index) => (
                    <p
                      className="hover:bg-custom-blue text-white text-[12px] p-2 flex items-center cursor-pointer duration-150 truncate"
                      onClick={() => {
                        setSelectedAddress(address.formatted_address);
                        setLocation(
                          formatLocation(address?.geometry?.location)
                        );
                        clear();
                      }}
                      key={index}
                    >
                      <LocationOnIcon /> {address.formatted_address}
                    </p>
                  ))}
                </pre>
              </div>
              <button
                type="submit"
                className="bg-custom-blue uppercase mt-10 px-10 py-3 rounded-3xl"
              >
                Cadastrar
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}: GetServerSidePropsContext) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

export default PetshopRegister;
