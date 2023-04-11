import React, { ChangeEvent } from "react";

interface Props {
  name?: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
}

const SimpleInputField: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col text-white">
      <label htmlFor={props.name} className={props.labelClassName}>
        {props.label}
      </label>
      <input
        className={
          "bg-transparent border-[1px] h-[35px] rounded-md px-3 outline-none" +
            " " +
            props.inputClassName || ""
        }
        id={props.name}
        name={props.name}
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default SimpleInputField;
