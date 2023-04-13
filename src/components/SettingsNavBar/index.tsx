import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import data from "./data.json";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const activeLink = "border-b-2";

const SettingsNavBar: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <div className="flex flex-row gap-2 min-h-[89vh] p-2 justify-center min-width m-auto relative @container">
      <div
        className={`
          absolute
          ${showNavBar ? "left-2" : "-left-[201px]"}
          bottom-2
          top-2
          border-2
          @[870px]:border-0
          @[870px]:static
          w-[200px]
          duration-300
        bg-custom-emerald p-4 text-white rounded-xl z-50
        `}
      >
        <div className="border-t-2 border-r-2 border-b-2 @[870px]:hidden grid place-items-center absolute bg-custom-emerald left-[99.9%] h-20 w-10 rounded-[0_15px_15px_0] overflow-hidden">
          <button
            className=" h-full w-full "
            onClick={() => setShowNavBar((prev) => !prev)}
          >
            <ArrowForwardIosIcon
              className={`${showNavBar ? "rotate-180" : ""} duration-300`}
            />
          </button>
        </div>
        <nav>
          <ul>
            {data.map((link) => (
              <li key={link.route} className="mb-4">
                <Link
                  href={`/settings/${link.route}`}
                  className={`${
                    router.pathname === `/settings/${link.route}`
                      ? activeLink
                      : ""
                  } uppercase font-noto-sans font-semibold`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-custom-emerald h-fit rounded-xl w-full  p-8">
        <div className="flex flex-col gap-10 @container">{children}</div>
      </div>
    </div>
  );
};

export default SettingsNavBar;
