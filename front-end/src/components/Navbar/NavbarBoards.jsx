import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import {BoardLinks} from "../../scripts/NavbarLinks";
import {Link} from "react-router-dom";
import NavDrawerBoards from "./Drawers/DrawerNavbarBoard";
import {useAuth} from "../../context/AuthContext";
import Profile from "../Menu/profile";

export default function NavbarBoards() {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
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
              display: {xs: "flex", lg: "none"},
            }}>
            <MenuIcon />
          </IconButton>
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
          <div
            style={{
              display: "flex",
              height: "100%",
            }}>
            <Box
              sx={{
                display: {xs: "none", lg: "flex"},
                gap: "1rem",
                height: "100%",
                alignItems: "center",
              }}>
              {BoardLinks.map((item) => {
                if (item.label === "Volver") {
                  return;
                } else if (item.label === "Agregar Miembros") {
                  return;
                }
                return (
                  <Button
                    key={item.label}
                    style={{
                      height: "100%",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                    variant="text"
                    component={Link}
                    to={item.href}>
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}>
                      {item.label}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
            {user && <Profile user={user} />}
          </div>
          <Drawer
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            sx={{
              display: {xs: "flex", lg: "none"},
            }}>
            <NavDrawerBoards />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
