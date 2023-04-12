import React, {
  ChangeEvent,
  ReactElement,
  cloneElement,
  useState,
} from "react";
import Options from "./Options";
import { GOOGLE_MAPS_API_KEY } from "@/utils/constants";
import { useDebounce } from "react-use";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const apiKey = GOOGLE_MAPS_API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

type ErrorMsg = {
  emptyLocation: boolean;
};

interface Props {
  inputElement: ReactElement;
  required?: boolean;
  value?: string;
  itemHandleClick: (item: any) => void;
}

const LocationField: React.FC<Props> = (props) => {
  const [locationInputValue, setLocationInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<string>(
    props.value || ""
  );
  const [response, setResponse] = useState<any[]>([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
    emptyLocation: false,
  });

  useDebounce(
    () => {
      if (!locationInputValue) return;
      geocode();
    },
    1000,
    [locationInputValue]
  );

  const clear = () => setResponse([]);

  const hundlerBlur = () => {
    if (props.required) {
      setErrorMsg((prev) => ({
        ...prev,
        emptyLocation: !selectedAddress,
      }));
    }
  };

  const geocode = async () => {
    clear();

    try {
      setLoadingLocation(true);
      let res = await (
        await fetch(
          `${geocodeJson}?address=${locationInputValue}&language=pt-BR&key=${apiKey}`
        )
      ).json();

      let { results } = res;
      setResponse(results);
      setLoadingLocation(false);
    } catch (e) {
      alert("Geocode was not successful for the following reason: " + e);
    }
  };
  return (
    <>
      {cloneElement(props.inputElement, {
        name: "location",
        value: locationInputValue,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          let { value } = e.target;
          setLocationInputValue(value);
        },
        onBlur: () => hundlerBlur()
      })}

      {selectedAddress ? (
        <span className="flex items-center text-xs mt-0 text-left text-white w-fit p-[4px] rounded-md bg-custom-blue font-semibold">
          <LocationOnIcon />
          &nbsp;{selectedAddress}
        </span>
      ) : (
        errorMsg.emptyLocation && (
          <p className="text-right text-custom-red font-semibold uppercase text-xs">
            Nenhum endereço selecionado
          </p>
        )
      )}
      <Options
        array={response}
        isLoading={loadingLocation}
        item={(item) => item.formatted_address}
        itemBefore={<LocationOnIcon />}
        itemHandleClick={(item) => {
          setSelectedAddress(item.formatted_address);
          let addressObj = {
            ...item?.geometry?.location,
            address: item.formatted_address,
          };
          props.itemHandleClick(addressObj);
          clear();
        }}
      />
    </>
  );
};

export default LocationField;
