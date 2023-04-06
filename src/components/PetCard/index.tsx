import { Pet } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PetCard: React.FC<Pet> = (pet) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showDetails, setShow] = useState(false);

  useEffect(() => {
    if (ref.current) {
      // ref.current.style.opacity = showDetails ? 1 : 0
      ref.current.style.transform = `translateY(${showDetails ? "0" : "-70%"})`;
    }
  }, [showDetails]);

  return (
    <div className="w-fit flex flex-col">
      <div className="z-10">
        <Image
          className="rounded-md"
          width={300}
          height={180}
          src={`https://picsum.photos/300/180?random=${pet.id}`}
          alt="pet image"
        />
      </div>

      <div
        ref={ref}
        className="bg-custom-emerald text-white w-full m-auto duration-150 rounded-[0_0_5px_5px]"
      >
        <p className="font-semibold mb-[-7px]">Idade:</p>
        <p>{pet.age}</p>
        <p className="font-semibold mb-[-7px]">Raça:</p>
        <p>{pet.breed}</p>
        <p className="font-semibold mb-[-7px]">Detalhes Adicionais:</p>
        <p>-</p>
        <p className="font-semibold text-xl mt-4">R$ {pet.price}</p>
        <button className="w-full" onClick={() => setShow((prev) => !prev)}>
          <ExpandMoreIcon
            sx={{ fontSize: 30 }}
            className={`${showDetails ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PetCard;
