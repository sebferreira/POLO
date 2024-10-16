import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {allInvitesByUsername, changeStateInvitation} from "../../queryFn";
import {useNavigate} from "react-router-dom";

export default function InvitesMenu() {
  const {user: usuario} = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [invitations, setInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAll = async () => {
      const res = await allInvitesByUsername(usuario.username);
      if (!res) return;
      setInvitations(res);
    };
    getAll();
  }, []);

  const handleChangeState = async (e, state, boardId, username) => {
    const body = {
      estado: state,
    };
    const res = await changeStateInvitation(body, boardId, username);
    if (res) {
      navigate(0);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="text"
        color="primary"
        style={{
          fontWeight: "bold",
          textTransform: "none",
          color: "white",
        }}>
        <NotificationsIcon />
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        sx={{
          width: {xs: "400px", md: "700px"},
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {invitations.length >= 1 &&
          invitations.map((invite) => (
            <MenuItem
              key={invite.id_board_invites}
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
                  width: "100%",
                  flexDirection: "column",
                }}>
                <div>
                  <Typography
                    sx={{
                      overflowY: "hidden",
                      maxWidth: 200,
                      whiteSpace: "nowrap",
                    }}>
                    {invite.ownerUser}
                  </Typography>
                  <Typography>Te ha invitado al tablero</Typography>
                  <Typography
                    sx={{
                      overflowY: "hidden",
                      maxWidth: 200,
                      whiteSpace: "nowrap",
                    }}>
                    {invite.boardName}
                  </Typography>
                </div>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    width: "100%",
                    borderTop: "1px solid lightgray",
                  }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() =>
                      handleChangeState(
                        event,
                        "Confirmado",
                        invite.boardId,
                        invite.invitado
                      )
                    }>
                    Aceptar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() =>
                      handleChangeState(
                        event,
                        "Rechazado",
                        invite.boardId,
                        invite.invitado
                      )
                    }>
                    Rechazar
                  </Button>
                </Box>
              </div>
            </MenuItem>
          ))}
        {invitations.length === 0 && (
          <Typography
            sx={{
              padding: "1rem",
            }}>
            No hay notificaciones
          </Typography>
        )}
      </Menu>
    </div>
  );
}
