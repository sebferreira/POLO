import {Box, Card, CardContent} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import ProfileCard from "../../components/ProfileCard/profileCard";

export default function ProfilePage() {
  const {user, logout} = useAuth();
  return (
    <>
      {user && (
        <Box
          sx={{
            marginTop: {xs: "20px", sm: "100px"},
          }}>
          <Card
            sx={{
              maxWidth: {xs: 320, sm: 600},
              height: "fit-content",
              margin: "auto",
              padding: "1rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}>
            <CardContent>
              <h1>Pagina del Perfil</h1>
              <ProfileCard user={user} logout={logout} />
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
