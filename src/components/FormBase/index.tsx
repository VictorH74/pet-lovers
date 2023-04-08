import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const FormBase: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div
      className={
        "bg-custom-emerald w-full max-w-[482px] text-center text-white" + " " +
        className
      }
    >
      <div className="p-[12%]">{children}</div>
    </div>
  );
};

export default FormBase;
