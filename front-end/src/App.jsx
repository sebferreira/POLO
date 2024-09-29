import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Box, Typography} from "@mui/material";
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
import ProfilePage from "./pages/Profile/profile";
//imagenes
import background from "./assets/fondoHomeWebp.webp";
import background2 from "./assets/wallpaperbetter1webp.webp";
import background3 from "./assets/path_clouds_landscape_237076_1920x1080.jpg";
import background4 from "./assets/8d98wrhcwlp51.webp";
import linkedin from "./assets/pngwing.com.png";
import github from "./assets/github-pages-logo-repository-fork-github-86eddab19cbc3ae293ada0fe0fb9e27d.png";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main
                  style={{
                    backgroundImage: `url(${background})`,
                    // modifique la configuracion de todas los background
                    backgroundSize: "cover",
                    height: "100dvh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "fixed",
                    overflowY: "hidden",
                  }}>
                  <Navbar />
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <main
                  style={{
                    backgroundImage: `url(${background2})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "fixed",
                    overflowY: "hidden",
                  }}>
                  <NavbarAuth />
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
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "fixed",
                    overflowY: "hidden",
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
                      height: "100vmax",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "fixed",
                      overflowY: "hidden",
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
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "fixed",
                      overflowY: "hidden",
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
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "fixed",
                      overflowY: "hidden",
                    }}>
                    <InviteUsers />
                  </main>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavbarAuth />
                  <ProfilePage />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
