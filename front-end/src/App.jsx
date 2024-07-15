import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import NavbarAuth from "./components/Navbar/NavbarAuth";
import Tables from "./pages/Tables";
import ProtectedRoute from "./ProtectedRoute";
import background from "./assets/fondoHome.jpg";
import background2 from "./assets/wallpaperbetter1.jpg";

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
                  }}>
                  <Home />
                </main>
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
                  <Navbar />
                  <Tables />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
