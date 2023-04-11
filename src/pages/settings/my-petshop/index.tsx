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
  formatLocationToObj,
  formatLocationToString,
  getBaseUrl,
} from "@/utils/helpers";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import { API_KEY } from "@/utils/constants";
import { validateLocation } from "@/utils/validations";
import Button from "@/components/Button";
import LocationField from "@/components/LocationField";

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
  const [location, setLocation] = useState<string | null>(null);

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
      if (!validateLocation(location))
        return alert("Formato de localização inválida: " + location);
      finalData.location = location;
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
            <LocationField
              inputElement={<SimpleInputField label="Endereço" />}
              itemHandleClick={(locationObj) =>
                setLocation(formatLocationToString(locationObj))
              }
              value={formatLocationToObj(petshop.location).address}
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
          <Button className="w-64 m-auto">Salvar</Button>
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
