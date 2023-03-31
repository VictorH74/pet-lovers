import { API_KEY } from "@/utils/constants";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDebounce } from "react-use";

const apiKey = API_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

export default function Loc() {
  const [response, setResponse] = useState([]);
  const [inputValue, setValue] = useState("");

  useDebounce(
    () => {
      if (!inputValue) return;
      geocode()
    },
    1000,
    [inputValue]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setValue(value);
  };

  const clear = () => {
    setValue("");
    setResponse([]);
  };

  const geocode = async () => {
    clear();

    try {
      let res = await (
        await fetch(
          `${geocodeJson}?address=${inputValue}&language=pt-BR&key=${apiKey}`
        )
      ).json();

      let { results } = res;
      console.log(results);
      setResponse(results);
    } catch (e) {
      alert("Geocode was not successful for the following reason: " + e);
    }
  };

  const getLngAndLat = (obj: { lat: number; lng: number }) => {
    return `lat=${obj.lat}__lgn=${obj.lng}`;
  };

  return (
    <div className="m-auto w-fit my-10 text-center">
        <input
          type="text"
          autoComplete="none"
          className="border-b-2 border-b-custom-blue outline-none"
          onChange={handleChange}
          placeholder="Enter a location"
        />


      <div className="response-container">
        <pre className="shadow-md rounded-lg mt-2 overflow-hidden text-left">
          {response.map((address, index) => (
            <p
              className="hover:bg-custom-blue text-custom-gray p-2 hover:text-white cursor-pointer duration-150"
              onClick={() => alert(getLngAndLat(address?.geometry?.location))}
              key={index}
            >
              {address.formatted_address}
            </p>
          ))}
        </pre>
      </div>
    </div>
  );
}
