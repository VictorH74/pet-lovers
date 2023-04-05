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
  const router = useRouter();
  const libraries = useMemo(() => ["places"], []);

  const location = formatAddress(p.location);
  console.log(location);

  const mapCenter = { lat: location.lat, lng: location.lng };

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

  if (router.isFallback || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-width m-auto pt-6 grid gap-5 @container">
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
