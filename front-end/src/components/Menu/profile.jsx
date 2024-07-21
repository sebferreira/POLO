import Avatar from "@mui/material/Avatar";
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
  Typography,
} from "@mui/material";
import {useAuth} from "../../context/AuthContext";

export default function Profile() {
  const {user, logout} = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
        <Tooltip title="Account settings">
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
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: "white",
                fontSize: "1.1rem",
                marginRight: "0.5rem",
                display: {xs: "none", md: "flex"},
              }}>
              {name}
            </Typography>
            <Avatar sx={{width: 32, height: 32}}>{FirsLetter}</Avatar>
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
          <Avatar sx={{width: 27, height: 27, marginRight: "0.3rem"}} />
          {name}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemButton
            sx={{
              padding: 0,
            }}
            onClick={logout}>
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
