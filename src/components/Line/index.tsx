import React from "react";

const Line: React.FC<{ children?: string }> = ({ children }) => (
  <div className="my-5 flex justify-center items-center gap-2">
    <div className="bg-white h-[2px] w-full" />
    {children && (
      <>
        <p>{children}</p>
        <div className="bg-white h-[2px] w-full" />
      </>
    )}
  </div>
);

export default Line;
