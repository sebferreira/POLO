import Logout from "@mui/icons-material/Logout";
import {useState} from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  ListItemButton,
} from "@mui/material";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AvatarProfile from "../Avatar/AvatarProfile";

export default function Profile() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const FirsLetter = user.username
    ? user.username[0].toUpperCase()
    : user.user.username[0].toUpperCase();
  const name = user.username ? user.username : user.user.username;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "1rem",
        }}>
        <Tooltip title="Tu cuenta">
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
            <AvatarProfile color={user.color} user={user} isNavbar={true} />
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
        <MenuItem onClick={handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
            }}
            onClick={() => {
              navigate("/profile");
            }}>
            <AvatarProfile color={user.color} user={user} isNavbar={true} />
            {name}
          </ListItemButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
            }}
            onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </ListItemButton>
        </MenuItem>
      </Menu>
    </>
  );
}
