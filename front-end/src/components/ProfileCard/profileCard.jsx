import {
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
import ProfileModal from "../ModalProfile/ModalProfile";
import AvatarProfile from "../Avatar/AvatarProfile";
import Cookies from "js-cookie";

export default function ProfileCard({user, logout}) {
  const navigate = useNavigate();
  const {handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const [error, setError] = useState([]);
  const [email, setEmail] = useState(user ? user.email : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [openModal, setOpenModal] = useState(false);
  const [option, setOption] = useState("");
  const [color, setColor] = useState(
    user.color ? `${user.color}` : `${user.user.color}`
  );
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setOption("email");
    setError([]);
    setValidateErrors([]);
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
    setOption("username");
    setError([]);
    setValidateErrors([]);
  };
  const updateColor = (e) => {
    setColor(e.target.value);
    setOption("color");
    setError([]);
    setValidateErrors([]);
  };
  const updateUserEmail = async () => {
    const body = {email};

    const res = await updateUser(user.username, body);
    if (res.length > 0) {
      setValidateErrors(res);
      console.log(res);
      return;
    }
    setValidateErrors([]);
    console.log(res);
    navigate(0);
  };
  const updateUserColor = async () => {
    const body = {color};

    const res = await updateUser(user.username, body);
    if (res.length > 0) {
      setValidateErrors(res);
    }
    setValidateErrors([]);
    navigate(0);
  };
  const updateUserUsername = async () => {
    const body = {usernameSended: username};

    const res = await updateUser(user.username, body);
    if (res.length > 0) {
      setError(res);
    }
    setError([]);
    navigate(0);
  };
  const onSubmit = handleSubmit(async () => {
    if (!email && color === user.color) {
      setValidateErrors(["Email es necesario"]);
      return;
    }
    switch (option) {
      case "email":
        await updateUserEmail();
        break;
      case "username":
        await updateUserUsername();
        break;
      case "color":
        await updateUserColor();
        break;
      default:
        break;
    }
  });

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "#f7f7f7",
              border: "2px solid #edecec",
              padding: "7px",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {xs: 70, sm: 100},
                height: {xs: 70, sm: 100},
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                border: "2px solid #edecec",
              }}>
              <AvatarProfile color={color} user={user} isNavbar={false} />
            </Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                marginLeft: "10px",
              }}>
              {user.username}
            </Typography>
          </Box>

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
              <Box>
                <Typography
                  sx={{
                    fontSize: {xs: "12px", sm: "17px"},
                    alignContent: "center",
                    fontWeight: "bold",
                  }}>
                  Cambiar color de perfil
                </Typography>
                <TextField
                  id="modal-modal-title"
                  value={color}
                  onChange={updateColor}
                  variant="outlined"
                  type="color"
                  sx={{
                    width: "4rem",
                    padding: "0rem",
                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: ".3rem",
                      },
                    marginBottom: "1rem",
                  }}
                />
                {user.color !== color && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "row",
                      width: "fit-content",
                      alignItems: "center",
                    }}>
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
                        setColor(user.color);
                        setError([]);
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
                  </Box>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: {xs: "12px", sm: "17px"},
                    alignContent: "center",
                    fontWeight: "bold",
                  }}>
                  Cambiar mombre de usuario
                </Typography>
                {error.map((error, i) => {
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
                <TextField
                  id="modal-modal-title"
                  type="text"
                  value={username}
                  onChange={updateUsername}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: 0,
                      fontSize: {xs: "12px", sm: "17px"},
                      width: "100%",
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
                    padding: "7px",
                    width: "65%",
                    "&:hover": {
                      backgroundColor: "#f3f1f1",
                      width: "65%",
                      borderRadius: "15px",
                    },
                  }}
                />
                {user.username !== username && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "row",
                      width: "fit-content",
                      alignItems: "center",
                    }}>
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
                        setUsername(user.username);
                        setError([]);
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
                  </Box>
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: {xs: "12px", sm: "17px"},
                  alignContent: "center",
                  fontWeight: "bold",
                }}>
                Correo electrónico
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}>
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
                      width: "100%",
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
                    padding: "7px",
                    width: "65%",
                    "&:hover": {
                      backgroundColor: "#f3f1f1",
                      width: "65%",
                      borderRadius: "15px",
                    },
                  }}
                />
                {user.email !== email && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "row",
                      width: "fit-content",
                      alignItems: "center",
                    }}>
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
                        console.log(user.email);
                        setColor(user.email);
                        setError([]);
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
                  </Box>
                )}
              </Box>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              onClick={handleOpenModal}
              color="info"
              variant="outlined"
              sx={{
                marginLeft: "5px",
                fontSize: {xs: "12px", sm: "17px"},
                textTransform: "none",
              }}>
              Cambiar Contraseña
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
            Cerrar Sesión
          </Button>
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
