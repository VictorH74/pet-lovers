import React from "react";
import { TailSpin } from "react-loader-spinner";

interface Props {
  array: any[];
  isLoading: boolean;
  itemHandleClick: (item: any) => void;
  itemBefore?: JSX.Element | string;
  item: (item: any) => string;
}

const Options: React.FC<Props> = (props) => {
  return (
    <div className="relative ">
      <pre className="absolute left-0 right-0 shadow-md rounded-lg mt-2 overflow-hidden text-left bg-white z-50">
        {props.isLoading ? (
          <div className="p-2 m-auto w-fit">
            <TailSpin
              height="45"
              width="45"
              color="#368FC1"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          props.array.map((item, index) => (
            <p
              className="hover:bg-custom-blue hover:text-white text-custom-gray text-[12px] p-2 flex items-center cursor-pointer duration-150 truncate"
              onClick={() => props.itemHandleClick(item)}
              key={index}
            >
              {props.itemBefore && <>{props.itemBefore}&nbsp;</>}
              {props.item(item)}
            </p>
          ))
        )}
      </pre>
    </div>
  );
};

export default Options;
