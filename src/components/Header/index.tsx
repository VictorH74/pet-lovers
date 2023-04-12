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
import AccountIcon from "../AccountIcon";
import { signOut, useSession } from "next-auth/react";

const activeLink = "font-semibold";

const Header = () => {
  const { data } = useSession()
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

  const logout = async () => {
    signOut({callbackUrl: "/login"})
  };

  return (
    <header className="h-20 bg-custom-emerald grid place-items-center px-[20px]">
      <div className="flex flex-wrap place-content-between w-[100%] min-width">
        <Logo />
        <div className="flex gap-x-10 items-center">
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
        <div>
          {data?.user ? (
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <AccountIcon size={50} image={data?.user?.image} />
              </Button>
              <Popper
                className="z-10"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocus={open}
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={handleClose}>
                            <Link href="/settings/user">Minha conta</Link>
                          </MenuItem>
                          <MenuItem onClick={logout}>Sair</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <Link
              className="bg-custom-blue px-7 py-2 rounded-md text-slate-50 uppercase"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
