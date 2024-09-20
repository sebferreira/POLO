import {Box, Typography} from "@mui/material";
import linkedin from "../../assets/pngwing.com.png";
import github from "../../assets/github-pages-logo-repository-fork-github-86eddab19cbc3ae293ada0fe0fb9e27d.png";
import {Link} from "react-router-dom";
export default function Footer() {
  return (
    <footer
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000",
        color: "#fff",
        padding: "0.5rem",
        textAlign: "center",
      }}>
      <Box style={{}}>
        <Typography
          component="p"
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontSize: {xs: "3rem", md: "5rem"},
            marginBottom: "2rem",
            marginTop: "1rem",
          }}>
          POLO
        </Typography>
        {/* <Typography
                      component="p"
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {xs: "1rem", md: "1.5rem"},
                        marginTop: "2rem",
                      }}>
                      CONTACTO
                    </Typography>
                    <Typography
                      component="p"
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {xs: "1rem", md: "1.5rem"},
                        marginTop: "2rem",
                      }}>
                      DESARROLLADORES
                    </Typography> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: {xs: "0px", sm: "10rem"},
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {xs: "1rem", sm: "2rem"},
          }}>
          <Link
            href="https://www.linkedin.com/in/sebastian-galarza-3a9b48262/"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}>
            <img
              src={linkedin}
              alt="linkedin"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </Link>
          <Link href="https://github.com/sebferreira">
            <img
              src={github}
              alt="github"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </Link>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: {xs: "0.9rem", md: "1.1rem"},
            fontWeight: "bold",
          }}
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
          }}>
          2024 POLO.
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: {xs: "0.9rem", md: "1.1rem"},
            fontWeight: "bold",
          }}
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
          }}>
          TECNICA 4
        </Typography>
      </Box>
    </footer>
  );
}