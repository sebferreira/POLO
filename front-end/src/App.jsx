import {BrowserRouter, Routes, Route} from "react-router-dom";
//providers
import {AuthProvider} from "./context/AuthContext";
//navbars
import Navbar from "./components/Navbar";
import NavbarAuth from "./components/Navbar/NavbarAuth";
import NavbarBoards from "./components/Navbar/NavbarBoards";
import NewBoard from "./pages/NewBoards";
//paginas
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import ProtectedRoute from "./ProtectedRoute";
import Boards from "./pages/Boards";
import InviteUsers from "./pages/InviteUsers";
//imagenes
import background from "./assets/fondoHomeWebp.webp";
import background2 from "./assets/wallpaperbetter1webp.webp";
import background3 from "./assets/path_clouds_landscape_237076_1920x1080.jpg";
import background4 from "./assets/8d98wrhcwlp51.webp";
import linkedin from "./assets/pngwing.com.png";
import github from "./assets/github-pages-logo-repository-fork-github-86eddab19cbc3ae293ada0fe0fb9e27d.png";
import {Box, Typography} from "@mui/material";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: "cover",
                    height: "100%",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    overflowY: "hidden",
                  }}>
                  <Home />
                </main>
                <footer
                  style={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#222",
                    color: "#fff",
                    padding: "0.5rem",
                    textAlign: "center",
                  }}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}>
                    <Typography
                      component="p"
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {xs: "1rem", md: "1.5rem"},
                        marginBottom: "2rem",
                        marginTop: "1rem",
                      }}>
                      Contactos
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                      }}>
                      <a
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
                      </a>
                      <a href="https://github.com/sebferreira">
                        <img
                          src={github}
                          alt="github"
                          style={{
                            width: "25px",
                            height: "25px",
                          }}
                        />
                      </a>
                    </div>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: {xs: "0.9rem", md: "1.1rem"},
                      }}
                      style={{
                        marginTop: "2rem",
                        marginBottom: "1rem",
                      }}>
                      2024 POLO.
                    </Typography>
                  </Box>
                </footer>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <NavbarAuth />
                <main
                  style={{
                    backgroundImage: `url(${background2})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                  }}>
                  <Signin />
                </main>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <NavbarAuth />
                <main
                  style={{
                    backgroundImage: `url(${background2})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                  }}>
                  <Signup />
                </main>
              </>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/tables"
              element={
                <>
                  <NavbarBoards />
                  <Tables />
                </>
              }
            />
            <Route
              path="/boards/:boardId"
              element={
                <>
                  <main
                    style={{
                      backgroundImage: `url(${background4})`,
                      backgroundSize: "cover",
                      minHeight: "100vh",
                      maxHeight: "100vh",
                      width: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }}>
                    <NavbarBoards />
                    <Boards />
                  </main>
                </>
              }
            />
            <Route
              path="/boards/new"
              element={
                <>
                  <NavbarAuth />
                  <main
                    style={{
                      backgroundImage: `url(${background3})`,
                      backgroundSize: "cover",
                      height: "100vh",
                      width: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }}>
                    <NewBoard />
                  </main>
                </>
              }
            />
            <Route
              path="/:boardId/invites"
              element={
                <>
                  <NavbarAuth />
                  <main
                    style={{
                      backgroundImage: `url(${background3})`,
                      backgroundSize: "cover",
                      height: "100vh",
                      width: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed",
                    }}>
                    <InviteUsers />
                  </main>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
