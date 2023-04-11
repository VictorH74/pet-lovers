import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SortIcon from "@mui/icons-material/Sort";
import PawIcon from "../PawIcon";

const optionClassName =
  "text-custom-gray border-[1px] border-custom-emerald rounded-3xl px-5 py-2 cursor-pointer flex items-center gap-2";

const PetShopFilterBar = () => {
  return (
    <div className=" flex flex-wrap w-fit gap-4 m-auto my-4 justify-center">
      <p className={optionClassName}>
        CLASSIFICAÇÃO <StarIcon />
      </p>
      <p className={optionClassName}>
        DISTÂNCIA <LocationOnIcon />
      </p>
      <p className={optionClassName}>
        PET <PawIcon size={25} color="#5E5E5E" />
      </p>
      <p className={optionClassName}>
        FILTRAR <SortIcon />
      </p>
    </div>
  );
};

export default PetShopFilterBar;
