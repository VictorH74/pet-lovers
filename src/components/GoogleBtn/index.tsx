import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const googleSvg =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg";

const GoogleBtn = () => {
  const handleSignInWithGoogle = () => {
    signIn("google");
  };

  return (
    <button
      className="flex justify-center rounded-3xl py-2 m-auto w-full bg-white px-3"
      onClick={handleSignInWithGoogle}
    >
      <Image width={28} height={28} src={googleSvg} alt="google icon" />
      <p className="text-custom-gray truncate">&nbsp;&nbsp;Continuar com o Google</p>
    </button>
  );
};

export default GoogleBtn;
