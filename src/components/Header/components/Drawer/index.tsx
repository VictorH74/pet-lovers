import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";
import AccountIcon from "../AccountIcon";
import { navData } from "../../data";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import PawIcon from "@/components/PawIcon";


const getIcon = (route: string) => {
  switch (route) {
    case "/":
      return <HomeIcon sx={{fontSize: 27, color: "#5E5E5E"}} />
    case "/petshops":
      return <PawIcon color="#5E5E5E" />
    case "/about":
      return <InfoIcon sx={{color: "#5E5E5E"}} />
    case "/contact":
      return <ContactsIcon sx={{color: "#5E5E5E"}} />
    default:
      return <HomeIcon sx={{fontSize: 27, color: "#5E5E5E"}} />
  }
}


export default function MenuDrawer() {
  const { data: session } = useSession();
  const [show, setShow] = React.useState(false);
  const router = useRouter();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setShow(open);
    };

  return (
    <div>
      <React.Fragment>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
        <Drawer anchor={"right"} open={show} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem className="">
                <ListItemIcon className="m-auto">
                  <AccountIcon
                    size={50}
                    image={session?.user?.image}
                    color="#5E5E5E"
                    className="ml-[1px]"
                  />
                </ListItemIcon>
              </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    selected={router.pathname.split("/").includes("settings")}
                    onClick={() => router.replace("/settings/user")}
                  >
                    <ListItemText
                      className="text-center"
                      primary="Minha conta"
                    />
                  </ListItemButton>
                </ListItem>
           
            </List>
            <Divider />
            <List>
              {navData.map((data) => (
                <ListItem key={data.title} disablePadding>
                  <ListItemButton
                    selected={router.pathname === data.path}
                    onClick={() => router.replace(data.path)}
                  >
                    <ListItemIcon>
                      {getIcon(data.path)}
                    </ListItemIcon>
                    <ListItemText primary={data.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
