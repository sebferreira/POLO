import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {getUsersBoard} from "../../queryFn";

export default function UsersMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const params = useParams();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await getUsersBoard(params.boardId);
      setUsers(data);
    };
    getAllUsers();
  }, [params.boardId]);

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
            <MenuItem key={user.username} onClick={handleClose}>
              {user.username}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
