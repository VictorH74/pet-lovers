/* eslint-disable react-hooks/exhaustive-deps */
import { Pet } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  pet: Pet;
  deleteable: boolean;
  handleDelete: (id: number) => Promise<void>;
}

async function convertBufferToImageURL(buffer: Buffer) {
  const bufferData = Buffer.from(buffer);
  const imageURL = `data:image/jpeg;base64,${bufferData.toString('base64')}`;
  return imageURL;
}

const PetCard: React.FC<Props> = ({ pet, deleteable, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [image, setImage] = useState("/img-placeholder.jpg");

  useEffect(() => {
    if (pet.image) {
      convertBufferToImageURL(pet.image).then(data => {
        setImage(data);
      })
    }
  }, [])

  const deletePet = async () => {
    console.log("delete pet", pet.id);
    setIsDeleting(true);
    await handleDelete(pet.id);
    setIsDeleting(false);
  };

  return (
    <div className="w-fit rounded-xl overflow-hidden relative">
      <div className="z-10">
        <Image
          loading="lazy"
          width={300}
          height={180}
          className="h-48 object-cover"
          src={image}
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
