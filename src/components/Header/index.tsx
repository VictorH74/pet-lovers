import Link from "next/link";
import Logo from "../Logo";
import { navData } from "./data";

const Header = () => {
  return (
    <header className="h-20 bg-custom-emerald grid place-items-center px-[20px]">
      <div className="flex place-content-between w-[100%] min-width">
        <Logo />
        <div className="flex gap-x-10 items-center">
          {navData.map((data) => (
            <Link className="header-link" key={data.title} href={data.path}>
              <p className="text-slate-50 font-noto-sans text-lg uppercase">
                {data.title}
              </p>
            </Link>
          ))}
        </div>
        <div>
          <button className="bg-custom-blue px-7 py-2 rounded-md text-slate-50 uppercase">
            Loggin
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
