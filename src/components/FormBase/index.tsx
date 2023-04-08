import React from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const FormBase: React.FC<Props> = ({ children }) => {
  return (
    <div className="@container">
      <div className="bg-custom-emerald max-w-[482px] @[500px]:rounded-lg text-center text-white m-auto @[500px]:my-[4%]">
      <div className="p-[12%]">{children}</div>
    </div>
    </div>
    
  );
};

export default FormBase;
