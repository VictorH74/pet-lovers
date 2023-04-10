/* eslint-disable react-hooks/exhaustive-deps */
import { formatAddressToObj, getBaseUrl } from "@/utils/helpers";
import { Pet, PetShop, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import useUser from "@/lib/useUser";
import PetCard from "@/components/PetCard";
import EditIcon from "@mui/icons-material/Edit";
import NewPetForm from "@/components/NewPetForm";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import PetFilterBar from "@/components/PetFilterBar";

interface FinalPetShop extends PetShop {
  owner: Pick<User, "id" | "name">;
}

interface Props {
  petshopData: FinalPetShop;
}

export default function Petshop({ petshopData: p }: Props) {
  const router = useRouter();
  const libraries = useMemo(() => ["places"], []);
  const { user } = useUser();
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [deleteablePet, setDeleteablePet] = useState(false);
  const [animals, setAnimals] = useState<Pet[]>([]);
  const [editPets, setEditPets] = useState(false);

  const location = formatAddressToObj(p.location);

  const isOwner = useMemo(() => user?.id === p.owner.id, [user, p]);

  const mapCenter = {
    lat: location.lat as number,
    lng: location.lng as number,
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  useEffect(() => {
    const fetchAnimals = async () => {
      let data = (await fetchJson(
        `${window.location.origin}/api/pets?PetShopId=${p.id}`
      )) as Pet[];
      setAnimals(data);
    };
    fetchAnimals();
  }, []);

  useEffect(() => {
    if (animals.length === 0 && deleteablePet) setDeleteablePet(false);
  }, [animals, deleteablePet]);

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  function handleClickOutside(event: MouseEvent) {
    let classes = (event.target as HTMLElement).className;
    if (
      typeof classes === "string" &&
      !classes.split(" ").includes("options")
    ) {
      setEditPets(false);
    }
  }

  const addNewPet = async (values: Pet) => {
    let finalPet = { ...values, PetShopId: p.id, price: Number(values.price) };
    console.log(finalPet);

    // save
    await fetchJson("/api/pets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPet),
    });
    setAnimals((prev) => [finalPet, ...prev]);
    closeNewPetForm();
  };

  const deletePet = async (petId: number) => {
    try {
      await fetchJson(`${window.location.origin}/api/pets/${petId}`, {
        method: "DELETE",
      });
      setAnimals((prev) => prev.filter((pets) => pets.id !== petId));
    } catch (error) {
      if (error instanceof FetchError) {
        console.error(error);
      }
    }
  };

  const closeNewPetForm = () => setShowNewPetForm(false);

  if (router.isFallback || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-width m-auto pt-6 grid gap-5">
        <div className="bg-custom-blue p-14 rounded-xl text-center text-white">
          <h1 className="text-3xl">{p.name}</h1>
          {p.description && (
            <>
              <div className="h-[2px] w-24 bg-white m-auto my-2 mt-4" />
              <p className="text-lg">{p.description}</p>
            </>
          )}
        </div>
        <div className="border-2 rounded-md border-custom-blue flex flex-wrap-reverse @container">
          <div className="aspect-video @[860px]:w-[650px] w-[650px] flex-auto">
            <GoogleMap
              options={mapOptions}
              zoom={14}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onLoad={() => console.log("Map Component Loaded...")}
            >
              <MarkerF
                position={mapCenter}
                onLoad={() => console.log("Marker Loaded")}
              />
            </GoogleMap>
          </div>

          <div className="p-4 flex-[1_1_200px] @[860px]:text-left text-center">
            <p className="text-stone-600 pl-2">{location.address}</p>
            <div className="relative w-fit @[860px]:m-0 m-auto">
              <StarIcon sx={{ color: "#ffbb00", fontSize: 80 }} />
              <p className="absolute text-lg text-white font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                4.7
              </p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="w-fit m-auto flex gap-2 items-center">
            <h2 className="text-3xl text-custom-gray leading-12">Animais</h2>

            {isOwner && (
              <div className="relative">
                <button
                  onClick={() => setEditPets((prev) => !prev)}
                  className="border-2 border-custom-blue rounded-full p-1"
                >
                  <EditIcon className="text-custom-blue" />
                </button>
                <div
                  className={`bg-[#ffffff71f] border-[1px] border-custom-emerald absolute left-full top-full z-20 p-3 backdrop-blur rounded-[0_15px_15px_15px] text-left font-semibold ${
                    editPets
                      ? "opacity-1"
                      : "opacity-0 scale-90 pointer-events-none"
                  } duration-200 options`}
                >
                  <button
                    className="uppercase text-custom-blue"
                    onClick={() => setShowNewPetForm(true)}
                  >
                    Adicionar
                  </button>
                  <button
                    className="uppercase text-custom-red"
                    onClick={() => setDeleteablePet(true)}
                    disabled={deleteablePet || animals.length === 0}
                  >
                    Remover
                  </button>
                </div>
              </div>
            )}
          </div>

          {animals.length > 0 ? (
            <>
              <PetFilterBar />

              <div className="flex flex-wrap justify-center gap-4 mt-5">
                {animals.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    deleteable={deleteablePet}
                    handleDelete={deletePet}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="p-5 text-lg uppercase font-noto-sans font-semibold text-custom-gray">
              <h2>Nenhum animal disponível</h2>
            </div>
          )}
        </div>
      </div>
      {showNewPetForm && (
        <NewPetForm handleSubmit={addNewPet} close={closeNewPetForm} />
      )}
      {deleteablePet && (
        <button
          className="fixed right-9 bottom-9 bg-custom-blue text-white px-7 py-1 text-lg uppercase font-semibold rounded-md"
          onClick={() => setDeleteablePet(false)}
        >
          finalizar
        </button>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context) ({ notFound: true });

  const { req, resolvedUrl } = context;

  const baseUrl = getBaseUrl(req);
  const petshopData = await (
    await fetch(`${baseUrl}/api/${resolvedUrl}/`)
  ).json();

  return {
    props: { petshopData },
  };
};
