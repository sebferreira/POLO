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
import NavDrawer from "./Drawers/NavDrawer";
import {useState} from "react";
import {navLinks, navLinksAuthenticated} from "../../scripts/NavbarLinks";
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Profile from "../Menu/profile";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {isAuthenticated, user} = useAuth();

  return (
    <>
      <AppBar position="static">
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
                display: {xs: "none", md: "flex"},
                gap: "1rem",
                height: "100%",
                alignItems: "center",
              }}>
              {isAuthenticated &&
                navLinksAuthenticated.map((item) => {
                  return (
                    <Button
                      key={item.label}
                      style={{
                        height: "100%",
                        fontSize: "16px",
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
                        }}
                        component={Link}
                        to={item.href}>
                        <Typography
                          style={{
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}>
                          {item.label}
                        </Typography>
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
                      variant="contained"
                      component={Link}
                      to={item.href}>
                      <Typography
                        style={{
                          color: "#1976d2",
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
              display: {xs: "flex", md: "none"},
            }}>
            <NavDrawer />
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
