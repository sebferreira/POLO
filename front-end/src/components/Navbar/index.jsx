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
import NavDrawer from "./NavDrawer";
import {useState} from "react";
import {navLinks, navLinksAuthenticated} from "../../scripts/NavbarLinks";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {isAuthenticated, logout} = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "3rem",
          }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              display: {xs: "flex", sm: "none"},
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
          <Box
            sx={{
              display: {xs: "none", sm: "flex"},
              gap: "1rem",
              height: "100%",
              alignItems: "center",
            }}>
            {isAuthenticated &&
              navLinksAuthenticated.map((item) => {
                if (item.label === "Cerrar Sesion") {
                  return (
                    <Button
                      key={item.label}
                      variant="contained"
                      color="error"
                      style={{
                        borderRadius: 0,
                        height: "100%",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        color: "#FFF",
                      }}
                      onClick={logout}>
                      {item.label}
                    </Button>
                  );
                }
                return (
                  <Button
                    key={item.label}
                    style={{
                      height: "100%",
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                    variant="text">
                    <Link
                      to={item.href}
                      style={{
                        color: "#FFF",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}>
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            {!isAuthenticated &&
              navLinks.map((item) => {
                if (item.label === "Iniciar Sesion") {
                  return (
                    <Button
                      key={item.label}
                      variant="text"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        paddingInline: "1.2rem",
                        margin: 0,
                        height: "100%",
                      }}>
                      <Link
                        to={item.href}
                        style={{
                          color: "#FFF",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}>
                        {item.label}
                      </Link>
                    </Button>
                  );
                }
                return (
                  <Button
                    key={item.label}
                    style={{
                      backgroundColor: "#FFFF",
                      borderRadius: 0,
                      fontSize: "16px",
                      fontWeight: "bold",
                      textTransform: "none",
                      paddingInline: "1.2rem",
                      margin: 0,
                      height: "100%",
                    }}
                    variant="contained">
                    <Link
                      to={item.href}
                      style={{
                        color: "#3181FA",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}>
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
          </Box>
          <Drawer
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            sx={{
              display: {xs: "flex", sm: "none"},
            }}>
            <NavDrawer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
