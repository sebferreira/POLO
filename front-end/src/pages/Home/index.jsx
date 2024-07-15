import {Box, Container, Typography} from "@mui/material";

export default function Home() {
  return (
    <>
      <Container
        className="contenedor"
        style={{
          marginLeft: "0.5rem",
          display: "flex",
          alignItems: "stretch",
          flexDirection: "row",
        }}>
        <Box
          sx={{
            width: {xs: "15rem", sm: "32rem"},
            marginTop: "5rem",
          }}>
          <Typography
            component="p"
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: {xs: "1.5rem", sm: "3rem"},
              marginBottom: "2rem",
            }}>
            Con Polo puedes organizarte mejor.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: {xs: "0.8rem", sm: "1.2rem"},
            }}>
            Polo unifica tus tareas, compañeros de equipo y herramientas.
            <br />
            Te ayudamos a organizar tus areas laborales para una mayor
            productividad.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
