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
      <div className="@[500px]:p-[12%] px-[10px] py-[50px]">{children}</div>
    </div>
  );
};

export default FormBase;
