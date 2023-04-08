import Image from "next/image";
import React from "react";

const googleSvg =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg";

interface Props {
  onClick: () => void;
}

const GoogleBtn: React.FC<Props> = ({ onClick }) => (
  <button
    className="flex justify-center rounded-3xl py-2 m-auto w-full bg-white"
    onClick={onClick}
  >
    <Image width={28} height={28} src={googleSvg} alt="google icon" />
    <p className="text-custom-gray">&nbsp;&nbsp;Continuar com o Google</p>
  </button>
);

export default GoogleBtn
