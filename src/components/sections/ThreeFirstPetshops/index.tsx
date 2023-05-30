import PetshopCard from "@/components/PetshopCard";
import { PetShop } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";

const ThreeFirstPetshops = () => {
    const [petshops, setPetshops] = useState<PetShop[] | []>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const threeFirstsPetshops = await (
          await fetch("api/petshops/?limit=3")
        ).json();
        setPetshops(threeFirstsPetshops.data);
      };
      fetchData();
    }, []);
  
    return (
      <section className="text-center my-[50px]">
        <h1 className="font-noto-sans text-5xl text-custom-emerald font-semibold">
          Petshops Cadastradas
        </h1>
        {petshops.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-5 justify-center items-center my-[30px]">
              {petshops.map((petshop) => (
                <PetshopCard key={petshop.id} {...petshop} />
              ))}
            </div>
            <Link
              className="font-noto-sans font-bold text-xl text-stone-600"
              href="/petshops"
            >
              LISTAR TODOS <EastIcon />
            </Link>
          </>
        ) : (
          <h2 className="text-stone-600 my-6">Nenhuma Petshop encontrada.</h2>
        )}
      </section>
    );
  };

  export default ThreeFirstPetshops