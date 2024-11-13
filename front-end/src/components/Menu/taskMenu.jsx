import {useEffect, useState} from "react";
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
import {getUsersBoard, updateInChargeTask} from "../../queryFn";
import {useAuth} from "../../context/AuthContext";
import TaskModalUpdateAsign from "../TaskModals/taskModalUpdateAsign/TaskModalUpdateAsign";
import Salir from "@mui/icons-material/ExitToApp";
import TaskModalUpdatePosicion from "../TaskModals/taskModalPositionUpdate/TaskModalUpdatePosicion";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

export default function TaskMenu({task, section, sections}) {
  const {user} = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalUpdateAsign, setOpenModalUpdateAsign] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalPosicion, setOpenModalPosicion] = useState(false);

  const handleOpenModalView = () => setOpenModalView(true);
  const handleCloseModalView = () => setOpenModalView(false);

  const handleOpenModalUpdateAsign = () => setOpenModalUpdateAsign(true);
  const handleCloseModalUpdateAsign = () => setOpenModalUpdateAsign(false);

  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const handleOpenModalPosicion = () => setOpenModalPosicion(true);
  const handleCloseModalPosicion = () => setOpenModalPosicion(false);

  const handleInCharge = async (opcion) => {
    if (params.boardId) {
      if (opcion) {
        const taskChanged = await updateInChargeTask(
          user.username,
          params.boardId,
          task.id_task
        );
        if (taskChanged) {
          navigate(0);
        }
      } else {
        const taskChanged = await updateInChargeTask(
          null,
          params.boardId,
          task.id_task
        );
        if (taskChanged) {
          navigate(0);
        }
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

  let userIsPersonaAsignada = false;
  if (user) {
    userIsPersonaAsignada =
      user.username === task.personaAsignada ? true : false;
  }

  useEffect(() => {
    if (params.boardId) {
      const getAllUsers = async () => {
        const data = await getUsersBoard(params.boardId);
        setUsers(data);
      };
      getAllUsers();
    }
  }, [params.boardId]);
  const username = user.username ? user.username : user.user.username;

  const userFound = users.find((user) => user.username === username);

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
        {user &&
          userFound &&
          userFound.role === "user" &&
          !userIsPersonaAsignada &&
          !task.personaAsignada && (
            <MenuItem onClick={() => handleClose}>
              <ListItemButton
                sx={{
                  padding: 0,
                  width: "100%",
                }}
                onClick={() => {
                  handleInCharge(true);
                }}>
                <ListItemIcon>
                  <EmojiPeopleIcon fontSize="small" />
                </ListItemIcon>
                Asignarse
              </ListItemButton>
            </MenuItem>
          )}
        {user && userIsPersonaAsignada && (
          <MenuItem onClick={() => handleClose}>
            <ListItemButton
              sx={{
                padding: 0,
                width: "100%",
              }}
              onClick={() => {
                handleInCharge(false);
              }}>
              <ListItemIcon>
                <Salir fontSize="small" />
              </ListItemIcon>
              Dejar
            </ListItemButton>
          </MenuItem>
        )}
        {user && userFound && userFound.role === "owner" && (
          <MenuItem onClick={(() => handleClose, handleOpenModalUpdateAsign)}>
            <ListItemButton
              sx={{
                padding: 0,
                width: "100%",
              }}>
              <ListItemIcon>
                <EmojiPeopleIcon fontSize="small" />
              </ListItemIcon>
              Modificar Responsable
            </ListItemButton>
          </MenuItem>
        )}
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
        open={openModalView}
        onClose={handleCloseModalView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalTaskView task={task} />
      </Modal>
      <Modal
        open={openModalUpdateAsign}
        onClose={handleCloseModalUpdateAsign}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <TaskModalUpdateAsign task={task} users={users} />
      </Modal>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalDelete
          setOpenModalDelete={setOpenModalDelete}
          data={task}
          type={"task"}
          message={"¿Estas seguro de sacar la tarea?"}
          boardId={params.boardId}
        />
      </Modal>
      <Modal
        open={openModalPosicion}
        onClose={handleCloseModalPosicion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <TaskModalUpdatePosicion
          task={task}
          users={users}
          section={section}
          sections={sections}
        />
      </Modal>
    </>
  );
}
