import {Box, Drawer} from "@mui/material";
import BoardDrawer from "../../components/boardCard/drawer";
import BarBoards from "../../components/Navbar/BarBoards";
import {useBoard} from "../../hooks/useBoard";
import SectionCard from "../../components/sectionCard";
import ModalSections from "../../components/sectionModals/sectionModal";

export default function Boards() {
  const {boards} = useBoard();
  return (
    <>
      <nav>
        <BarBoards boards={boards} />
      </nav>
      <Box
        sx={{
          marginLeft: {xs: "0", lg: "16rem"},
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          overflowX: "auto",
          scrollbarColor: "#262626 transparent",
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        style={{
          height: "calc(100vh - 112px)",
        }}>
        <SectionCard boards={boards} />
        <ModalSections />
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
            width: 260,
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
