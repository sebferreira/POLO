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
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import ModalTaskView from "../TaskModals/taskModalView";
import ModalDelete from "../DeleteModal";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import {useNavigate, useParams} from "react-router-dom";
import {updateInChargeTask} from "../../queryFn";

export default function TaskMenu({task}) {
  const params = useParams();
  const navigate = useNavigate();
  const [openModalView, setOpenModalView] = useState(false);
  const handleOpenModalView = () => setOpenModalView(true);
  const handleCloseModalView = () => setOpenModalView(false);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  const handleInCharge = async () => {
    if (params.boardId) {
      const taskChanged = await updateInChargeTask(
        params.boardId,
        task.id_task
      );
      if (taskChanged) {
        navigate(0);
      }
    }
  };

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
        <MenuItem onClick={(() => handleClose, handleOpenModalView)}>
          <ListItemButton
            sx={{
              padding: 0,
            }}>
            <ListItemIcon>
              <ViewComfyAltIcon fontSize="small" />
            </ListItemIcon>
            Ver
          </ListItemButton>
        </MenuItem>

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
        <MenuItem onClick={() => handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
              width: "100%",
            }}
            onClick={handleInCharge}>
            <ListItemIcon>
              <EmojiPeopleIcon fontSize="small" />
            </ListItemIcon>
            Asignarse
          </ListItemButton>
        </MenuItem>
      </Menu>
      <Modal
        open={openModalView}
        onClose={handleCloseModalView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalTaskView task={task} />
      </Modal>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalDelete
          data={task}
          type={"task"}
          message={"¿Estas seguro de borrar la tarea?"}
          boardId={params.boardId}
        />
      </Modal>
    </>
  );
}
