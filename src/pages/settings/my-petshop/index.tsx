import SettingsNavBar from "@/components/SettingsNavBar";
import petshopFieldsData from "./petshopFieldsData.json";
import SimpleInputField from "@/components/SimpleInputField";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext } from "next";
import { sessionOptions } from "@/lib/session";
import { PetShop } from "@prisma/client";
import { formatAddressToObj, getBaseUrl } from "@/utils/helpers";
import { useRouter } from "next/router";

type PetshopData = {
  name: string;
  description: string;
  website: string;
  phone: string;
  location: string;
};

const PetShopSettings = ({ petshop }: { petshop: PetShop }) => {
  const [petshopData, setPetshopData] = useState<PetshopData>({
    name: petshop.name,
    description: petshop.description || "",
    website: petshop.website || "",
    phone: petshop.phone,
    location: formatAddressToObj(petshop.location).address || "",
  });
  const [petSpecies, setPetSpecies] = useState<string[]>(
    petshop?.petSpecies || []
  );
  const [specie, setSpecie] = useState<string>("");
  const router = useRouter()

  const addSpecie = () => {
    if (!specie) return;

    let finalSpecie =
      specie.slice(0, 1).toUpperCase() + specie.slice(1).toLowerCase();

    if (petSpecies.includes(finalSpecie)) return;

    setPetSpecies((prev) => [...prev, finalSpecie]);
    setSpecie("");
  };

  const removeSpecie = (specie: string) => {
    setPetSpecies((prev) => prev.filter((str) => str !== specie));
  };

  return (
    <SettingsNavBar>
      {petshop?.id ? (
        <form className="grid gap-10">
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
            </div>
          </div>

          <div className="bg-white h-1 w-full rounded-xl" />

          <div className="w-full max-w-[500px] m-auto">
            <div className="relative">
              <SimpleInputField
                name="specie"
                label="Adicionar espécie"
                value={specie}
                onChange={(e) => setSpecie(e.currentTarget.value)}
              />
              {specie && (
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
          <button className="text-white bg-custom-blue py-2 px-7 w-64 rounded-md m-auto uppercase">
            Salvar
          </button>
        </form>
      ) : (
        <div className="text-white uppercase grid place-items-center gap-4">
          <h1 className="">Você não possui petshop</h1>
          <button className="text-white bg-custom-blue py-2 px-7 w-64 rounded-md m-auto uppercase" onClick={() => router.replace("/petshops/add")}>
            Criar
          </button>
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

  const data = await fetch(`${baseUrl}/api/petshops/my?userId=${user?.id}`);
  const petshop = await data.json();

  return {
    props: { petshop },
  };
},
sessionOptions);

export default PetShopSettings;
