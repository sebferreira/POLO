import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded"; /* 
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded"; */
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

export const navLinks = [
  {
    label: "Iniciar Sesion",
    href: "/login",
    icon: <LoginRoundedIcon />,
  },
  {
    label: "Registrarse",
    href: "/register",
    icon: <HowToRegRoundedIcon />,
  },
];
export const navLinksAuthenticated = [
  {
    label: "Mis Tableros",
    href: "/tables",
    icon: <AutoAwesomeMosaicIcon />,
  },
  {
    label: "Cerrar Sesion",
    href: "/logout",
    icon: <ExitToAppRoundedIcon />,
  },
  /* 
   {
    label: "Profile",
    href: "/profile",
    icon: <AccountBoxRoundedIcon />,
  },  */
];
