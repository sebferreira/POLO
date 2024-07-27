import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {useState} from "react";
import {Button, Modal, Typography} from "@mui/material";
import ModalDelete from "../DeleteModal";
import {useAuth} from "../../context/AuthContext";
import BorrarUser from ".";

export default function UsersMenu({users, boardId}) {
  const {user: usuario} = useAuth();

  const [openModalLeave, setOpenModalLeave] = useState(false);

  const handleOpenModalLeave = () => setOpenModalLeave(true);
  const handleCloseModalLeave = () => setOpenModalLeave(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userFound = users.find((a) => a.username === usuario.username);

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
              <div
                style={{
                  display: "flex",
                }}>
                {user.username}
                {user.role === "owner" && <Typography> (Owner)</Typography>}
              </div>
              {userFound &&
                userFound.role === "owner" &&
                userFound.username != user.username && (
                  <>
                    <BorrarUser user={user} boardId={boardId} />
                  </>
                )}
              {userFound && userFound.username === user.username && (
                <>
                  <Button
                    onClick={handleOpenModalLeave}
                    sx={{
                      color: "inherit",
                    }}>
                    <PersonRemoveIcon fontSize="small" color="error" />
                  </Button>
                  <Modal
                    open={openModalLeave}
                    onClose={handleCloseModalLeave}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <ModalDelete
                      data={user.username}
                      type={"leave"}
                      message={"¿Estas seguro de salir?"}
                      boardId={boardId}
                    />
                  </Modal>
                </>
              )}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
