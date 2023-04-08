import React from "react";
import Logo from "../Logo";

const FormLogo: React.FC<{ text: string }> = ({ text }) => (
  <div className="mb-8">
    <Logo />
    <div className="bg-white h-[2px] w-16 m-auto my-2" />
    <h2 className="text-2xl font-light uppercase">{text}</h2>
  </div>
);

export default FormLogo;
