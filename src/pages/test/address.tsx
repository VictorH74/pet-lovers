import LocationField from "@/components/LocationField";
import { useEffect, useMemo, useState } from "react";

export default function Andress() {
  const [values, setValues] = useState<
    { lat: number; lng: number; address: string }[]
  >([]);

  const valuesStr = useMemo<string[]>(() => {
    return values.map((v) => `${v.lat}__${v.lng}__${v.address}`);
  }, [values]);

  useEffect(() => {
    console.log(valuesStr);
  }, [valuesStr]);

  return (
    <div className="m-auto w-96 my-5">
      <LocationField
        itemHandleClick={(value) => setValues((prev) => [...prev, value])}
      />
      {valuesStr.length > 0 && (
        <div className="bg-[#272727d2] my-3 rounded-xl p-3 text-white">
          {valuesStr.map((v, i) => (
            <p className="text-xs my-2" key={i}>
              [{i}] {v}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
