import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavDrawer from "./Drawers/NavDrawer";
import polo from "../../assets/polo_blanco.png";
import {useState} from "react";
import {navLinks, navLinksAuthenticated} from "../../scripts/NavbarLinks";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Profile from "../Menu/profile";
import {ButtonsNavbar} from "./Drawers/ButtonsDrawers";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {isAuthenticated, user} = useAuth();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00000024",
          boxShadow: "0",
          backdropFilter: "blur(2px)",
        }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "3rem",

            minHeight: "3.5rem",
          }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              display: {xs: "flex", md: "none"},
            }}>
            <MenuIcon />
          </IconButton>
          <Box
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "flex-end",
            }}>
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
              }}>
              <img
                src={polo}
                alt="polo"
                className="logoNavbar"
                style={{
                  width: {xs: "20px", m: "30px", xl: "40px"},
                  height: {xs: "15px", m: "20px", xl: "30px"},
                }}
              />
            </Link>
            <Typography
              variant="h6"
              sx={{fontSize: {xs: "1.25rem", xl: "1.5rem"}}}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#FFFF",
                  fontWeight: "bold",
                }}>
                POLO
              </Link>
            </Typography>
          </Box>
          <div
            style={{
              display: "flex",
              height: "100%",
            }}>
            <Box
              sx={{
                display: {xs: "none", md: "flex"},
                gap: "1rem",
                height: "100%",
                alignItems: "center",
              }}>
              {isAuthenticated &&
                navLinksAuthenticated.map((item) => {
                  return ButtonsNavbar(item, "#FFF", "transparent");
                })}
              {!isAuthenticated &&
                navLinks.map((item) => {
                  if (item.label === "Iniciar Sesion") {
                    return ButtonsNavbar(item, "#FFF", "transparent");
                  }
                  return ButtonsNavbar(item, "#1c1a42", "#FFF");
                })}
            </Box>
            {user && <Profile user={user} />}
          </div>
          <Drawer
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            sx={{
              display: {xs: "flex", md: "none"},
            }}>
            <NavDrawer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
