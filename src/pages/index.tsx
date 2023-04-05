import Presentation from "@/components/sections/Presentation";
import Benefits from "@/components/sections/Benefits";
import RegisterPetshop from "@/components/sections/RegisterPetshop";
import ThreeFirstPetshops from "@/components/sections/ThreeFirstPetshops";


export default function Home() {
  console.log(process.env.TEST)
  return (
    <div>
      <Presentation />
      <Benefits />
      <ThreeFirstPetshops />
      <RegisterPetshop />
    </div>
  );
}
