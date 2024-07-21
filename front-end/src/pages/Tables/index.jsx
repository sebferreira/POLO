import {Box, Drawer, List, Typography} from "@mui/material";
import BoardCard from "../../components/boardCard";
import BoardDrawer from "../../components/boardCard/drawer";
import {useBoard} from "../../hooks/useBoard";

export default function Tables() {
  const {boards} = useBoard();
  console.log(boards);

  return (
    <>
      <Box sx={{display: {sx: "flex", lg: "none"}}}>
        <Typography
          component="p"
          variant="h6"
          sx={{
            marginTop: "1rem",
            fontWeight: "bold",
            marginLeft: "1rem",
            color: "#1e1e1e",
          }}>
          Tus tableros
        </Typography>
        <List>
          {boards.map((board) => (
            <BoardCard board={board} key={board.id_board} />
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: {xs: "none", lg: "flex"},
          justifyContent: "center",
          marginTop: "5rem",
        }}>
        <Typography
          component="p"
          variant="h4"
          sx={{
            color: "#1e1e1e",
          }}>
          Elige su tablero o cree uno nuevo
        </Typography>
      </Box>

      <Drawer
        container={window.document.body}
        variant="permanent"
        anchor="left"
        open={true}
        sx={{
          display: {xs: "none", lg: "flex"},
          zIndex: 0,
        }}
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            color: "white",
            borderRight: 0,
            width: "25rem",
            marginTop: "3.5rem",
            overflowY: "auto",
            top: 0,
          },
        }}>
        <BoardDrawer boards={boards} />
      </Drawer>
    </>
  );
}
