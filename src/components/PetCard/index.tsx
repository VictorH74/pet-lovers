import { Pet } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import fetchJson from "@/lib/fetchJson";

interface Props {
  pet: Pet;
  deleteable: boolean;
  handleDelete: (id: number) => Promise<void>
}

const PetCard: React.FC<Props> = ({ pet, deleteable, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePet = async () => {
    console.log("delete pet", pet.id);
    setIsDeleting(true)
    await handleDelete(pet.id)
    setIsDeleting(false)
  };

  return (
    <div className="w-fit rounded-xl overflow-hidden relative">
      <div className="z-10">
        <Image
          width={300}
          height={180}
          loading="lazy"
          src={`https://picsum.photos/300/180?random=${pet.id}`}
          alt="pet image"
        />
      </div>

      <div className="bg-custom-emerald text-white w-full m-auto py-2">
        <p className="font-semibold mb-[-7px]">Idade:</p>
        <p>{pet.age}</p>
        <p className="font-semibold mb-[-7px]">Raça:</p>
        <p>{pet.breed}</p>
        <p className="font-semibold mb-[-7px]">Detalhes Adicionais:</p>
        <p>{pet.aditionalDetails || "-"}</p>
        <p className="font-semibold text-xl mt-4">R$ {pet.price}</p>
      </div>
      {deleteable && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000070] grid place-items-center">
          <button
            className="bg-[#ffffff80] w-fit rounded-full p-1 hover:scale-110 duration-150"
            onClick={deletePet}
            disabled={isDeleting}
          >
            <DeleteIcon sx={{ color: "red", fontSize: 35 }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PetCard;
