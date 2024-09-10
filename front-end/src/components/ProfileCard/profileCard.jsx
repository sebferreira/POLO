import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import Close from "@mui/icons-material/Close";
import {updateUser} from "../../queryFn";
import {useNavigate} from "react-router-dom";
import ProfileModal from "../ModalProfile/modalProfile";

export default function ProfileCard({user, logout}) {
  const navigate = useNavigate();
  const {handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const [email, setEmail] = useState(user ? user.email : "");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setValidateErrors([]);
  };
  const onSubmit = handleSubmit(async () => {
    if (!email) {
      setValidateErrors(["Email es necesario"]);
      return;
    }
    const body = {email};
    const res = await updateUser(user.username, body);
    if (res.length > 0) {
      setValidateErrors(res);
      return;
    }
    setValidateErrors([]);
    navigate(0);
  });
  const FirsLetter = user.username
    ? user.username[0].toUpperCase()
    : user.user.username[0].toUpperCase();

  return (
    <Card
      sx={{
        maxWidth: 600,
        height: "fit-content",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 1,
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        display: "flex",
        alignItems: "flex-start",
      }}>
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "10px",
          margin: "10px 0",
        }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "24px",
            }}>
            Acerca de ti
          </Typography>
          <Typography
            sx={{
              fontSize: {xs: "12px", sm: "17px"},
            }}>
            <Typography
              sx={{
                fontSize: {xs: "12px", sm: "17px"},
                alignContent: "center",
              }}
              color="error">
              no se permite cambiar
            </Typography>
            Username: {user.username}
          </Typography>

          <form
            onSubmit={onSubmit}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            {validateErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    marginTop: "0.5rem",
                    fontSize: {xs: "12px", sm: "14px"},
                  }}
                  fontWeight="bold"
                  key={i}>
                  {error}
                </Typography>
              );
            })}
            <Box>
              <Typography
                sx={{
                  fontSize: {xs: "12px", sm: "17px"},
                  alignContent: "center",
                }}>
                Dirección:
              </Typography>
              <TextField
                id="modal-modal-title"
                type="text"
                value={email}
                onChange={updateEmail}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: 0,
                    fontSize: {xs: "12px", sm: "17px"},
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset",
                  },
                  "& :focus": {
                    border: "1px solid",
                    padding: "2px",
                  },
                  textAlign: "left",
                  color: "black",
                }}
              />
              {user.email !== email && (
                <>
                  <Button
                    color="success"
                    variant="outlined"
                    type="submit"
                    sx={{
                      marginLeft: ".4rem",
                      height: "31px",
                      fontSize: {xs: "12px", sm: "17px"},
                      textTransform: "none",
                    }}>
                    Cambiar
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => {
                      setEmail(user.email);
                      setValidateErrors([]);
                    }}
                    sx={{
                      minWidth: "40px",
                      marginLeft: ".4rem",
                      height: "31px",
                      fontSize: {xs: "12px", sm: "17px"},
                      textTransform: "none",
                      paddingLeft: "1px",
                      paddingRight: "1px",
                    }}>
                    <Close />
                  </Button>
                </>
              )}
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
            }}>
            <Typography
              sx={{fontSize: {xs: "12px", sm: "17px"}, alignContent: "center"}}>
              Contraseña
            </Typography>
            <Button
              onClick={handleOpenModal}
              color="success"
              sx={{
                textDecoration: "underline",
                fontSize: {xs: "12px", sm: "17px"},
                textTransform: "none",
              }}>
              Cambiar
            </Button>
          </Box>
          <Button
            color="error"
            variant="outlined"
            sx={{
              width: {xs: "7rem", sm: "9rem"},
              height: "fit-content",
              fontSize: {xs: "12px", sm: "14px"},
            }}
            onClick={logout}>
            Desloguearse
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: {xs: 70, sm: 130},
            height: {xs: 50, sm: 100},
            borderRadius: "50%",
            backgroundColor: "#f5f5f5",
            border: "2px solid #ccc",
          }}>
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              fontSize: {xs: "1.5rem", sm: "3rem"},
            }}>
            {FirsLetter}
          </Avatar>
        </Box>
      </CardContent>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ProfileModal username={user.username} />
      </Modal>
    </Card>
  );
}
