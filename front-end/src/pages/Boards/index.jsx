import {Box, Drawer} from "@mui/material";
import BoardDrawer from "../../components/boardCard/drawer";
import BarBoards from "../../components/Navbar/BarBoards";
import {useBoard} from "../../hooks/useBoard";
import SectionCard from "../../components/sectionCard";
import ModalSections from "../../components/sectionModal";
import {useEffect} from "react";

export default function Boards() {
  const {boards} = useBoard();
  useEffect(() => {}, [boards]);

  return (
    <>
      <nav>
        <BarBoards boards={boards} />
      </nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Box
          sx={{
            marginLeft: {xs: "0", lg: "16rem"},
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            overflowX: "auto",
            scrollbarColor: "#262626 transparent",
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}>
          <SectionCard boards={boards} />
          <ModalSections />
        </Box>
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
