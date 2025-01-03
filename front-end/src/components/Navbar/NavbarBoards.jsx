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
import {useEffect, useState} from "react";
import {BoardLinks} from "../../scripts/NavbarLinks";
import {Link, useNavigate, useParams} from "react-router-dom";
import NavDrawerBoards from "./Drawers/DrawerNavbarBoard";
import {useAuth} from "../../context/AuthContext";
import Profile from "../Menu/profile";
import polo from "../../assets/polo_blanco.png";
import InvitesMenu from "../Menu/invitaciones";

export default function NavbarBoards() {
  const {user} = useAuth();
  const [open, setOpen] = useState(false);
  const previousValue = sessionStorage.getItem("previousPath");
  const [pathPrevio, setPathPrevio] = useState(
    previousValue ? previousValue : ""
  );
  const navigate = useNavigate();
  const params = useParams();
  useState(() => {
    if (previousValue) {
      console.log(previousValue);
      setPathPrevio(previousValue);
    }
  }, [previousValue]);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          backgroundColor: "#1D2125", // Aquí
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
          <Box
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "flex-end",
            }}>
            <Link
              to="/tables"
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
                to="/tables"
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
                display: {xs: "none", lg: "flex"},
                gap: "1rem",
                height: "100%",
                alignItems: "center",
              }}>
              {BoardLinks.map((item) => {
                if (item.label === "Volver") {
                  if (params.boardId) {
                    return (
                      <Button
                        key={item.label}
                        sx={{
                          height: "100%",
                          width: "5rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          backgroundColor: "##1D2125",
                          color: "#fff",
                          paddingX: "3rem",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={() => {
                          const actualPath =
                            sessionStorage.getItem("actualPath");
                          if (actualPath === `/boards/${params.boardId}`) {
                            const previo =
                              sessionStorage.getItem("previousPath");
                            sessionStorage.setItem("actualPath", previo);
                            sessionStorage.setItem(
                              "previousPath",
                              `/boards/${params.boardId}`
                            );
                            navigate(previo);
                          }
                        }}
                        variant="text">
                        <Typography
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                          }}>
                          {item.label}
                        </Typography>
                      </Button>
                    );
                  } else {
                    return;
                  }
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
            {user && (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  height: "100%",
                }}>
                <InvitesMenu />
                <Profile user={user} />
              </Box>
            )}
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
