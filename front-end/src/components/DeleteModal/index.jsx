import {Box, Button, Typography} from "@mui/material";
import {
  DeleteBoard,
  DeleteSections,
  DeleteTask,
  DeleteUserfromBoard,
} from "../../queryFn";
import {useNavigate} from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  color: "black",
};

export default function ModalDelete({
  data,
  type,
  message,
  boardId,
  setOpenModalDelete,
}) {
  let handleDelete;
  const navigate = useNavigate();

  switch (type) {
    case "section":
      handleDelete = async () => {
        await DeleteSections(data.id_section, boardId);
        navigate(0);
      };
      break;
    case "task":
      handleDelete = async () => {
        await DeleteTask(data.id_task, boardId);
        navigate(0);
      };
      break;
    case "board":
      handleDelete = async () => {
        await DeleteBoard(data.id_board);
        navigate("/tables");
      };
      break;
    case "users":
      handleDelete = async () => {
        await DeleteUserfromBoard(data, boardId);
        navigate(0);
      };
      break;
    case "Salir":
      handleDelete = async () => {
        await DeleteUserfromBoard(data, boardId);
        navigate("/tables");
      };
      break;
  }
  let msjDelete = type === "Salir" ? type : "Sacar";
  if (msjDelete === "Sacar" && type === "board") msjDelete = "Borrar";

  return (
    <Box sx={[style, {width: {xs: 250, lg: 400}}]}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginLeft: "1rem",
          }}>
          {message ? message : "¿Está Seguro de sacar esta sección?"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "4rem",
            alignItems: "center",
          }}>
          <Button
            onClick={() => {
              setOpenModalDelete(false);
            }}
            variant="contained"
            color="inherit"
            style={{
              marginLeft: "auto",
              color: "#000",
              borderRadius: "12px",
              padding: "8px 16px",
              transition: "all 0.3s ease",
              marginRight: "2rem",
            }}>
            Cerrar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            style={{
              marginLeft: "auto",
              backgroundColor: "#D32F2F",
              color: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
              padding: "8px 16px",
              transition: "all 0.3s ease",
            }}>
            {msjDelete}
          </Button>
        </Box>
      </div>
    </Box>
  );
}
