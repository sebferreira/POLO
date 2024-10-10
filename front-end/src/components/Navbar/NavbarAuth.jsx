import {AppBar, Toolbar, Typography} from "@mui/material";
import polo from "../../assets/polo_blanco.png";
import {Link} from "react-router-dom";
import {Box} from "@mui/material";
export default function NavbarAuth() {
  return (
    <div
      style={{
        position: "relative",
      }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00000024",
          boxShadow: "0",
          backdropFilter: "blur(2px)",
        }}>
        <Toolbar
          style={{
            height: "3rem",
            minHeight: "3.5rem",
          }}>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
