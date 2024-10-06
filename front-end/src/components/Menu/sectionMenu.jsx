import {useState} from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  ListItemButton,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalDelete from "../DeleteModal";
import {useParams} from "react-router-dom";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import SectionModalUpdatePosicion from "../sectionModals/sectionModalUpdatePosition/SectionUpdateModalPosicion";

export default function SectionMenu({section, sections}) {
  const params = useParams();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalPosicion, setOpenModalPosicion] = useState(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleOpenModalPosicion = () => setOpenModalPosicion(true);
  const handleCloseModalPosicion = () => setOpenModalPosicion(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "1rem",
        }}>
        <Tooltip title="Menú Tarea">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              borderRadius: 2,
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <MoreVertIcon sx={{width: 40, height: 25}}></MoreVertIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
        <MenuItem onClick={(() => handleClose, handleOpenModalDelete)}>
          <ListItemButton
            sx={{
              padding: 0,
            }}>
            <ListItemIcon>
              <DeleteForeverIcon fontSize="small" />
            </ListItemIcon>
            Borrar
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={(() => handleClose, handleOpenModalPosicion)}>
          <ListItemButton
            sx={{
              padding: 0,
              width: "100%",
            }}>
            <ListItemIcon>
              <ChangeCircleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Mover de lugar
          </ListItemButton>
        </MenuItem>
      </Menu>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-colorby="modal-modal-color">
        <ModalDelete
          data={section}
          type={"section"}
          message={"¿Estas seguro de borrar la seccion?"}
          boardId={params.boardId}
        />
      </Modal>
      <Modal
        open={openModalPosicion}
        onClose={handleCloseModalPosicion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <SectionModalUpdatePosicion section={section} sections={sections} />
      </Modal>
    </>
  );
}
