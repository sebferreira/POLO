import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useState} from "react";
import {Button, Modal, Typography} from "@mui/material";
import ModalDelete from "../DeleteModal";
import {useAuth} from "../../context/AuthContext";

export default function UsersMenu({users, boardId}) {
  const {user} = useAuth();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userFound = users.find((a) => a.username === user.username);

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{
          fontWeight: "bold",
          textTransform: "none",
          color: "white",
        }}>
        Miembros
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {users &&
          users.map((user) => (
            <MenuItem
              key={user.username}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 16,
                cursor: "pointer",
              }}>
              {user.username}
              {user.role === "owner" && <Typography>. (Owner)</Typography>}
              {userFound && userFound.role === "owner" && (
                <Button
                  onClick={handleOpenModalDelete}
                  sx={{
                    color: "inherit",
                  }}>
                  <DeleteForeverIcon fontSize="small" color="error" />
                </Button>
              )}
              <Modal
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ModalDelete
                  data={user.username}
                  type={"users"}
                  message={"¿Estas seguro de eliminar a este usuario?"}
                  boardId={boardId}
                />
              </Modal>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
