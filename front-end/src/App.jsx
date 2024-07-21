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
import background from "./assets/fondoHome.jpg";
import background2 from "./assets/wallpaperbetter1.jpg";
import background3 from "./assets/path_clouds_landscape_237076_1920x1080.jpg";
import background4 from "./assets/landscape_art_road_127350_1920x1080.jpg";

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
                    height: "100vh",
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
                  <p>2024 POLO. All rights reserved.</p>
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
                      height: "100vh",
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
