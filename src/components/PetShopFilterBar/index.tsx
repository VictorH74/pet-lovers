import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SortIcon from "@mui/icons-material/Sort";
import PawIcon from "../PawIcon";
import React, { useState } from "react";

interface Props {
  disabled: boolean;
  onClick: (str: string) => void;
}

const data = [
  { text: "Classificação", Icon: <StarIcon />, value: "sortByRating" },
  { text: "Distância", Icon: <LocationOnIcon />, value: "sortByDistance" },
  {
    text: "Pet",
    Icon: <PawIcon size={25} color="#5E5E5E" />,
    value: "sortByPet",
  },
  { text: "Filtrar", Icon: <SortIcon />, value: "others" },
];

const PetShopFilterBar: React.FC<Props> = ({ disabled, onClick }) => {
  const [selected, setSelected] = useState("");

  return (
    <div
      className={`flex flex-wrap w-fit gap-4 m-auto my-4 justify-center ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      {data.map(({ text, value, Icon }) => (
        <button
          key={text}
          className={`${
            selected === value
              ? "text-white bg-custom-emerald"
              : "text-custom-gray"
          } border-[1px] border-custom-emerald rounded-3xl px-5 py-2 cursor-pointer flex items-center gap-2 duration-150`}
          onClick={() => {
            if (selected === value) return;
            setSelected(value);
            onClick(value);
          }}
        >
          {text} {Icon}
        </button>
      ))}
    </div>
  );
};

export default PetShopFilterBar;
