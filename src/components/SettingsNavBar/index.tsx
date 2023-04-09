import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import data from "./data.json";

interface Props {
  children: JSX.Element;
}

const activeLink = "border-b-2";

const SettingsNavBar: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-2 h-[89vh] p-2 justify-center min-width m-auto relative">
      <div className="bg-custom-emerald w-52 p-4 text-white rounded-xl">
        <nav>
          <ul>
            {data.map((link) => (
              <li key={link.route} className="mb-4">
                <Link
                  href={`/settings/${link.route}`}
                  className={`${router.pathname === `/settings/${link.route}`
                  ? activeLink
                  : ""} uppercase font-noto-sans font-semibold`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-custom-emerald h-fit rounded-xl w-full  p-8">
        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </div>
  );
};

export default SettingsNavBar;
