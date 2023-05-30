import Link from "next/link";
import Logo from "../Logo";
import { navData } from "./data";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AccountMenu from "./components/AccountMenu";
import MenuDrawer from "./components/Drawer";

export const activeLink = "font-semibold";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  const loginRoute = () => {
    if (!router) return;

    router.replace(`/login?from=${router.asPath}`)
  }

  return (
    <header className="h-20 bg-custom-emerald grid place-items-center px-[20px] @container z-50">
      <div className="flex flex-wrap place-content-between w-[100%] min-width z-50">
        <Logo />

        <div className="hidden @[800px]:flex gap-x-10 items-center">
          {navData.map((data) => (
            <Link
              className={router.pathname === data.path ? activeLink : ""}
              key={data.title}
              href={data.path}
            >
              <p className="text-slate-50 font-noto-sans text-base uppercase">
                {data.title}
              </p>
            </Link>
          ))}
        </div>

        <div className="hidden @[800px]:block z-50">
          {data?.user ? (
            <AccountMenu />
          ) : (
            <button
              className="bg-custom-blue px-7 py-2 rounded-md text-slate-50 uppercase"
              onClick={loginRoute}
            >
              Login
            </button>
          )}
        </div>

        <div className="block @[800px]:hidden">
          <MenuDrawer />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
