import {Box, Button, Container, Typography} from "@mui/material";
import mockup from "./../../assets/mockup.png";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <Container
        className="contenedor"
        style={{
          display: "flex",
          alignItems: "stretch",
          flexDirection: "row",
          width: "100%",
        }}>
        <Box
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}>
          <Box
            sx={{
              width: {xs: "15rem", sm: "35rem", md: "50rem"},
              marginTop: {xs: "1rem", sm: "1rem", md: "1rem"},
            }}>
            <Typography
              component="p"
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: {xs: "1rem", sm: "1rem"},
              }}
              fontSize={{xs: "1.5rem", sm: "3rem", lg: "3rem", xl: "4rem"}}
              color={"#ffffff"}>
              Con Polo puedes organizarte mejor.
            </Typography>
            <Typography
              component="p"
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: {xs: "0.8rem", sm: "1.1rem", md: "1.5rem"},
              }}
              color={"#0b0838"}>
              Polo unifica tus tareas, compañeros de equipo y herramientas. Te
              ayudamos a organizar tus areas laborales para una mayor
              productividad.
            </Typography>
          </Box>
          <Box
            className="cajaImg"
            sx={{
              width: {xs: "100%"},
              backgroundColor: "#f8f9fa6b",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: {xs: "column", sm: "row", md: "row"},
              alignItems: "center",
              backdropFilter: "blur(8px)",
              // modifique esto marginBottom: {xs: "6rem", sm: "8rem", md: "6rem", lg: "6rem", xxl: "6rem"},
              marginTop: "1rem",
            }}>
            <img
              src={mockup}
              alt="Home"
              className="mockup"
              style={{
                padding: "1rem",
              }}
            />
            <Box
              sx={{
                height: "100%",

                display: "flex",
                flexDirection: "column",
              }}>
              <Typography
                component="p"
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: {xs: "0.7rem", sm: "1.2rem", md: "1.6rem"},
                  padding: "1rem",
                  marginTop: {sx: 0, sm: "1rem"},
                }}
                color={"#1c1a42"}>
                Puedes crear tableros donde se podran invitar miembros, guardar
                y organizar las secciones y tareas. En las secciones se
                guardaran las tareas a hacer, las pendientes o las completadas.
                Luego se encuentran las tareas que nos muestra la información a
                hacer.
              </Typography>
              {!isAuthenticated && (
                <Box
                  sx={{
                    margin: "1rem",
                    display: "flex",
                    justifyContent: {xs: "center", md: "flex-end"},
                    flexDirection: {xs: "row", md: "column"},
                    alignItems: "flex-end",
                    borderRadius: "1.5rem",
                    height: "100%",
                    paddingBottom: "2rem",
                    width: "calc(100% - 64px)",
                  }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: {xs: "8rem", sm: "10rem"},
                      fontSize: {xs: "0.6rem", sm: "1.2rem"},
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "0.7rem",
                      backgroundColor: "#1c1a42",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#1c1a42",
                      },
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}>
                    Empieza ahora
                  </Button>
                </Box>
              )}
              {isAuthenticated && (
                <Box
                  sx={{
                    margin: "1rem",
                    display: "flex",
                    justifyContent: {xs: "center", md: "flex-end"},
                    flexDirection: {xs: "row", md: "column"},
                    alignItems: "flex-end",
                    borderRadius: "1.5rem",
                    height: "100%",
                    paddingBottom: "2rem",
                    width: "calc(100% - 64px)",
                  }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: {xs: "8rem", sm: "10rem"},
                      fontSize: {xs: "0.6rem", sm: "1.2rem"},
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "0.7rem",
                      backgroundColor: "#1c1a42",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#1c1a42",
                      },
                    }}
                    onClick={() => {
                      navigate("/tables");
                    }}>
                    Crea tus tableros
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
