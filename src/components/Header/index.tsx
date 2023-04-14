import Link from "next/link";
import Logo from "../Logo";
import { navData } from "./data";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AccountIcon from "./components/AccountIcon";
import { signOut, useSession } from "next-auth/react";
import AccountMenu from "./components/AccountMenu";
import MenuDrawer from "./components/Drawer";

export const activeLink = "font-semibold";

const Header = () => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <header className="h-20 bg-custom-emerald grid place-items-center px-[20px] @container">
      <div className="flex flex-wrap place-content-between w-[100%] min-width">
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
        <div className="hidden @[800px]:block">
          {data?.user ? (
            <AccountMenu />
          ) : (
            <Link
              className="bg-custom-blue px-7 py-2 rounded-md text-slate-50 uppercase"
              href="/login"
            >
              Login
            </Link>
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
