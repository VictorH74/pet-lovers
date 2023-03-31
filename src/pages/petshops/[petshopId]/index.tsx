import { formatAddress, getBaseUrl } from "@/utils/helpers";
import { PetShop } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import StarIcon from "@mui/icons-material/Star";
import { useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

interface Props {
  petshopData: PetShop;
}

export default function Petshop({ petshopData: p }: Props) {
  console.log(p)
  const router = useRouter();
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: -5.187232, lng: -42.782848 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  const { zip, address, number, neighborhood, city, stateUF } = formatAddress(
    p.address
  );

  if (router.isFallback || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-width m-auto pt-6 grid gap-5">
      <div className="bg-custom-blue p-14 rounded-xl text-center text-white">
        <h1 className="text-3xl">{p.name}</h1>
        {p.description && (
          <>
            <div className="h-[2px] w-24 bg-white m-auto my-2 mt-4" />
            <p className="text-lg">{p.description}</p>
          </>
        )}
      </div>
      <div className="border-2 rounded-md border-custom-blue flex flex-row">
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "653px", height: "390px" }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          <MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />
        </GoogleMap>
        <div className="p-4">
          <p>{zip}</p>
          <p>{`${address}, N° ${number}, ${city} - ${stateUF}`}</p>
          <p className="text-stone-600">
            <StarIcon sx={{ color: "#F6E757" }} /> 4.7
          </p>
        </div>
      </div>
    </main>
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
