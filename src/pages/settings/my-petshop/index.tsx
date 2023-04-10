import SettingsNavBar from "@/components/SettingsNavBar";
import petshopFieldsData from "./petshopFieldsData.json";
import SimpleInputField from "@/components/SimpleInputField";
import { FormEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext } from "next";
import { sessionOptions } from "@/lib/session";
import { PetShop } from "@prisma/client";
import {
  formatAddressToObj,
  formatAddressToString,
  getBaseUrl,
} from "@/utils/helpers";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { API_KEY } from "@/utils/constants";
import { useDebounce } from "react-use";
import Options from "@/components/Options";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { validateLocation } from "@/utils/validations";
import Button from "@/components/Button";

const apiKey = API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

type PetshopData = {
  name: string;
  description: string;
  website: string;
  phone: string;
};

type FinalPetshopData = {
  petSpecies: string[];
  website: string | null;
  description: string | null;
  name: string;
  phone: string;
  location?: string;
};

type ErrorMsg = {
  emptyLocation: boolean;
};

const PetShopSettings = ({ petshop }: { petshop: PetShop }) => {
  const [petshopData, setPetshopData] = useState<PetshopData>({
    name: petshop.name,
    description: petshop.description || "",
    website: petshop.website || "",
    phone: petshop.phone,
  });
  const [petSpecies, setPetSpecies] = useState<string[]>(
    petshop?.petSpecies || []
  );
  const [specieInputValue, setSpecieInputValue] = useState<string>("");
  const router = useRouter();
  const [locationInputValue, setLocationInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    formatAddressToObj(petshop.location).address
  );
  const [response, setResponse] = useState<any[]>([]);
  const [location, setLocation] = useState<
    { lat: number; lng: number; address: string } | undefined
  >(undefined);
  const [loadingLocation, setLoadingLocation] = useState(false);
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

    setPetSpecies((prev) => [...prev, finalSpecie]);
    setSpecieInputValue("");
  };

  const removeSpecie = (specieInputValue: string) => {
    setPetSpecies((prev) => prev.filter((str) => str !== specieInputValue));
  };

  const saveData = async (e: FormEvent) => {
    e.preventDefault();

    let [website, description] = [
      petshopData.website || null,
      petshopData.description || null,
    ];
    let finalData: FinalPetshopData = {
      ...petshopData,
      petSpecies,
      website,
      description,
    };

    if (location) {
      let locationStr = formatAddressToString(
        location ||
          (() => {
            throw new Error("location object not defined");
          })()
      );
      if (!validateLocation(locationStr))
        return alert("Formato de localização inválida: " + locationStr);
      finalData["location"] = locationStr;
    }

    console.log("finalData", finalData);

    try {
      const res = await fetchJson(
        `${window.location.origin}/api/petshops/${petshop.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );
      console.log(res);
      alert("Petshop atualizado! 🙂👍");
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error.data);
        // setError(error.data);
      } else {
        console.error("An unexpected error happened:", error);
      }
    }
  };

  return (
    <SettingsNavBar>
      {petshop?.id ? (
        <form className="grid gap-10" onSubmit={saveData}>
          <div className="w-full max-w-[500px] m-auto">
            <div className="">
              {petshopFieldsData.map((data) => (
                <SimpleInputField
                  key={data.name}
                  {...data}
                  value={petshopData[data.name as keyof typeof petshopData]}
                  onChange={(e) => {
                    const { name, value } = e.currentTarget;
                    setPetshopData((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                />
              ))}
              <SimpleInputField
                name="location"
                label="Endereço"
                value={locationInputValue}
                onChange={(e) => {
                  let { value } = e.target;
                  setLocationInputValue(value);
                }}
              />
            </div>
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
          </div>

          <div className="bg-white h-1 w-full rounded-xl" />

          <div className="w-full max-w-[500px] m-auto">
            <div className="relative">
              <SimpleInputField
                name="specieInputValue"
                label="Adicionar espécie"
                value={specieInputValue}
                onChange={(e) => setSpecieInputValue(e.currentTarget.value)}
              />
              {specieInputValue && (
                <span className="absolute right-1 bottom-1">
                  <button
                    className="text-custom-blue"
                    type="button"
                    onClick={addSpecie}
                  >
                    <AddIcon />
                  </button>
                </span>
              )}
            </div>
            {petSpecies.length > 0 && (
              <div className="border-[1px] mt-2 rounded-md p-2 flex flex-wrap gap-2 items-center justify-center max-h-32 overflow-y-auto white-scrollbar">
                {petSpecies.map((s) => (
                  <p
                    onClick={() => removeSpecie(s)}
                    className="text-white bg-custom-blue px-7 py-1 rounded-xl cursor-pointer relative overflow-hidden"
                    key={s}
                  >
                    {s}
                    <span className="absolute top-0 bottom-0 left-0 right-0 hover:opacity-100 opacity-0 bg-[#00000048] grid place-items-center text-red-500 duration-150">
                      <DeleteIcon />
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
          <Button className="w-64 m-auto">
            Salvar
          </Button>
        </form>
      ) : (
        <div className="text-white uppercase grid place-items-center gap-4">
          <h1 className="">Você não possui petshop</h1>
          <Button
            className="w-64 m-auto"
            onClick={() => router.replace("/petshops/add")}
          >
            Criar
          </Button>
        </div>
      )}
    </SettingsNavBar>
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
        petshop: null,
      },
    };
  }

  const baseUrl = getBaseUrl(req);

  const petshop = await fetchJson(
    `${baseUrl}/api/petshops/my?userId=${user?.id}`
  );

  return {
    props: { petshop },
  };
},
sessionOptions);

export default PetShopSettings;
