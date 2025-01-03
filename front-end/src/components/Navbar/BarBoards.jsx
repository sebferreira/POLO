import {
  AppBar,
  Box,
  Button,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import UsersMenu from "../Menu/users";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getUsersBoard, UpdateBoard} from "../../queryFn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAuth} from "../../context/AuthContext";
import ModalDelete from "../DeleteModal";

export default function BarBoards({boards}) {
  const {handleSubmit} = useForm();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [name, setName] = useState(false);
  const [users, setUsers] = useState([]);

  const {user} = useAuth();
  const username = user.username ? user.username : user.user.username;
  const params = useParams();
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await getUsersBoard(params.boardId);
      console.log(data);
      setUsers(data);
    };
    getAllUsers();
  }, [params.boardId]);

  const boardFound =
    boards.find((board) => board.id_board === params.boardId) || false;
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  const userFound = users.find((a) => a.username === username);
  const navigate = useNavigate();

  useEffect(() => {
    if (boardFound) {
      setName(boardFound.name);
    }
  }, [boardFound]);
  const updateName = (e) => {
    setName(e.target.value);
  };
  const onSubmit = handleSubmit(async () => {
    const body = {name};
    if (body.name) {
      await UpdateBoard(boardFound.id_board, body);
      navigate(0);
    }
  });

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          width: {xs: "100%", lg: "calc(100% - 260px)"},
        }}>
        <Toolbar
          style={{
            display: "flex",
            height: "3rem",
            minHeight: "3.5rem",
          }}
          sx={{
            justifyContent: "space-between",
            flexDirection: {xs: "row-reverse", lg: "row"},
            paddingRight: {sm: 0, lg: "1rem"},
          }}>
          {boardFound && userFound && userFound.role === "user" && (
            <Typography
              sx={{
                fontSize: {xs: "1.25rem", xl: "1.5rem"},
                fontWeight: "bold",
              }}>
              {name}
            </Typography>
          )}
          {boardFound && userFound && userFound.role === "owner" && (
            <form
              onSubmit={onSubmit}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                {boardFound && name != boardFound.name && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                      width: "10%",
                      fontSize: "10px",
                      textTransform: "none",
                      marginLeft: "1rem",
                    }}>
                    Guardar
                  </Button>
                )}
                {boardFound && name === boardFound.name && (
                  <Button onClick={handleOpenModalDelete}>
                    <DeleteForeverIcon
                      fontSize="small"
                      variant="contained"
                      color="error"
                      style={{
                        marginLeft: "auto",
                        backgroundColor: "#D32F2F",
                        color: "#FFFFFF",
                        borderRadius: "7px",
                        boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
                        padding: "4px 16px",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </Button>
                )}
                <TextField
                  id="modal-modal-title"
                  type="text"
                  value={name}
                  onChange={updateName}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: 0,
                      color: "#FFFF",
                      fontWeight: "bold",
                      fontSize: {xs: "1.25rem", xl: "1.5rem"},
                      width: "100%",
                      transition: "color 0.3s ease",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "unset",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                    "& :focus": {
                      border: "1px solid",
                      padding: "2px",
                    },

                    textAlign: "left",
                    color: "black",
                    marginBottom: "1px",
                    width: {xs: "60%", sm: "60%", md: "75%", xl: "80%"},
                  }}
                />
              </Box>
            </form>
          )}
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}>
            {boardFound && userFound && userFound.role === "owner" && (
              <Button
                style={{
                  height: "100%",
                  fontWeight: "bold",
                  textTransform: "none",
                  marginRight: "1.5rem",
                }}
                sx={{
                  display: {xs: "none", lg: "flex"},
                }}
                variant="text"
                component={Link}
                to={`/${params.boardId}/invites`}>
                <Typography
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}>
                  {"Agregar Miembros"}
                </Typography>
              </Button>
            )}

            <UsersMenu users={users} boardId={params.boardId} />
          </div>
        </Toolbar>
      </AppBar>

      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalDelete
          setOpenModalDelete={setOpenModalDelete}
          data={boardFound}
          type={"board"}
          message={"¿Estas seguro de borrar el tablero?"}
        />
      </Modal>
    </>
  );
}
