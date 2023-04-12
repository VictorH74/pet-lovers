import Presentation from "@/components/sections/Presentation";
import Benefits from "@/components/sections/Benefits";
import RegisterPetshop from "@/components/sections/RegisterPetshop";
import ThreeFirstPetshops from "@/components/sections/ThreeFirstPetshops";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  console.log(data);

  return (
    <div>
      <Presentation />
      <Benefits />
      <ThreeFirstPetshops />
      <RegisterPetshop />
    </div>
  );
}
