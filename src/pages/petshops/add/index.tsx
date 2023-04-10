import Fields, { textFieldStyle } from "@/components/Fields";
import Logo from "@/components/Logo";
import { Form, Formik } from "formik";
import data from "./data.json";
import { Schema } from "./validationSchema";
import { TextField } from "@mui/material";
import { useState } from "react";
import { API_KEY } from "@/utils/constants";
import { useDebounce } from "react-use";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PetShop } from "@prisma/client";
import { useRouter } from "next/router";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import { formatAddressToString } from "@/utils/helpers";
import AddIcon from "@mui/icons-material/Add";
import Button from "@/components/Button";
import Options from "@/components/Options";

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

const PetshopRegister = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: "/signup" });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [specieInputValue, setSpecieInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    undefined
  );
  const [response, setResponse] = useState<any[]>([]);
  const [petSpecies, setSpecieList] = useState<string[]>([]);
  const [location, setLocation] = useState<
    { lat: number; lng: number; address: string } | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    emptyLocation: false,
  });

  useDebounce(
    () => {
      if (!locationInputValue) return;
      geocode();
    },
    1000,
    [locationInputValue]
  );

  const clear = () => setResponse([]);

  const geocode = async () => {
    clear();

    try {
      setLoadingLocation(true);
      let res = await (
        await fetch(
          `${geocodeJson}?address=${locationInputValue}&language=pt-BR&key=${apiKey}`
        )
      ).json();

      let { results } = res;
      setResponse(results);
      setLoadingLocation(false);
    } catch (e) {
      alert("Geocode was not successful for the following reason: " + e);
    }
  };

  const addSpecie = () => {
    if (!specieInputValue) return;

    let finalSpecie =
      specieInputValue.slice(0, 1).toUpperCase() +
      specieInputValue.slice(1).toLowerCase();

    if (petSpecies.includes(finalSpecie)) return;

    setSpecieList((prev) => [...prev, finalSpecie]);
    setSpecieInputValue("");
  };

  const removeSpecie = (specieInputValue: string) => {
    setSpecieList((prev) => prev.filter((str) => str !== specieInputValue));
  };

  const handleSubmit = async (values: IFormValues) => {
    if (!location) {
      setErrorMsg((prev) => ({
        ...prev,
        emptyLocation: true,
      }));
    }

    let finalValues = {
      ...values,
      location: formatAddressToString(
        location ||
          (() => {
            throw new Error("location object not defined");
          })()
      ),
      petSpecies,
      userId: user?.id,
    };
    // console.log(finalValues)

    let res: Pick<PetShop, "id"> = await fetchJson("/api/petshops/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalValues),
    });
    router.replace(`petshops/${res.id}`);
  };

  if (!user) router.replace("/signup");

  return (
    <div>
      <main className="bg-custom-emerald w-[655px] rounded-lg p-20 text-center text-white m-auto my-16">
        <div>
          <Logo />
          <div className="bg-white h-[2px] w-16 m-auto" />
          <h2 className="text-2xl font-light">cadastro petshop</h2>
        </div>
        <p className="font-light">Proprietário(a): {user?.name}</p>
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
                <div className="relative">
                  <TextField
                    autoComplete="none"
                    sx={textFieldStyle}
                    variant={"standard"}
                    className="text-white"
                    label={<p className="text-white">Espécies</p>}
                    id="specieInputValue"
                    name="specieInputValue"
                    value={specieInputValue}
                    onChange={(e) => {
                      let { value } = e.target;
                      setSpecieInputValue(value);
                    }}
                  />
                  {specieInputValue && (
                    <span className="absolute right-0 bottom-1">
                      <button type="button" onClick={addSpecie}>
                        <AddIcon />
                      </button>
                    </span>
                  )}
                </div>
                {petSpecies.length > 0 && (
                  <div className="flex gap-2 overflow-x-scroll white-scrollbar">
                    {petSpecies.map((specie) => (
                      <span key={specie}>
                        <p
                          onClick={() => removeSpecie(specie)}
                          className="bg-custom-blue px-2 mb-1 rounded cursor-pointer hover:bg-custom-red"
                        >
                          {specie}
                        </p>
                      </span>
                    ))}
                  </div>
                )}

                <TextField
                  autoComplete="none"
                  placeholder={locationInputValue || "Digite seu endereço"}
                  sx={textFieldStyle}
                  variant={"standard"}
                  className="text-white"
                  label={<p className="text-white">Endereço</p>}
                  id="address"
                  name="address"
                  value={locationInputValue}
                  onChange={(e) => {
                    let { value } = e.target;
                    setLocationInputValue(value);
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
                    <LocationOnIcon />
                    &nbsp;{selectedAddress}
                  </span>
                ) : (
                  errorMsg.emptyLocation && (
                    <p className="text-right text-custom-red font-semibold uppercase text-xs">
                      Nenhum endereço selecionado
                    </p>
                  )
                )}
              </div>
              <Options
                array={response}
                isLoading={loadingLocation}
                item={(item) => item.formatted_address}
                itemBefore={<LocationOnIcon />}
                itemHandleClick={(item) => {
                  setSelectedAddress(item.formatted_address);
                  setLocation({
                    ...item?.geometry?.location,
                    address: item.formatted_address,
                  });
                  clear();
                }}
              />
              <Button type="submit" className=" mt-10 rounded-3xl">
                Cadastrar
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default PetshopRegister;
