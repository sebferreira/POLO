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
import ProfilePage from "./pages/Profile/profile";
//imagenes
import background from "./assets/fondoHomeWebp.webp";
import background3 from "./assets/path_clouds_landscape_237076_1920x1080.jpg";
//import background4 from "./assets/8d98wrhcwlp51.webp";
import background4 from "./assets/tim-oun-0Og_pvK5I4Q-unsplash.jpg";
import background6 from "./assets/montañas5img.jpg";
/* 
import background5 from "./assets/background5.jpg"; */
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
                    objectFit:"cover",
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
                    backgroundImage: `url(${background6})`,
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
                <main
                  style={{
                    backgroundImage: `url(${background6})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "fixed",
                    overflowY: "hidden",
                  }}>
                  <NavbarAuth />

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
                  <main
                    style={{
                      backgroundImage: `url(${background6})`,
                      backgroundSize: "cover",
                      height: "100vmax",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "fixed",
                      overflowY: "hidden",
                    }}>
                    <NavbarBoards />
                    <Tables />
                  </main>
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
                      height: "100dvh",
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
                    <NavbarAuth />
                    <NewBoard />
                  </main>
                </>
              }
            />
            <Route
              path="/:boardId/invites"
              element={
                <>
                  <main
                    style={{
                      backgroundImage: `url(${background6})`,
                      backgroundSize: "cover",
                      height: "100vh",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "fixed",
                      overflowY: "hidden",
                    }}>
                    <NavbarAuth />
                    <InviteUsers />
                  </main>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {" "}
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
                    <NavbarAuth />
                    <ProfilePage />
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
