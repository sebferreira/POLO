import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
} from "@mui/material";
import {Link} from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function BoardList({board}) {
  const dash = <SpaceDashboardOutlinedIcon />;
  return (
    <ListItem
      disablePadding
      sx={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#f5f5f5",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        "&:active": {
          backgroundColor: "#d3d3d3",
        },
        "&:focus": {
          backgroundColor: "#d3d3d3",
        },
      }}>
      <ListItemButton
        component={Link}
        to={`/boards/${board.id_board}`}
        onClick={() => {
          sessionStorage.setItem("previousPath", "/tables");
          sessionStorage.setItem("actualPath", `/boards/${board.id_board}`);
        }}
        sx={{
          color: "#1e1e1e",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
          "&:active": {
            backgroundColor: "#d3d3d3",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0",
          marginLeft: "10px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <ListItemIcon>{dash}</ListItemIcon>
          <Box>
            <ListItemText
              primary={board.name}
              sx={{
                "& .MuiTypography-root": {
                  width: " 10rem",
                  overflow: "hidden",
                  textOverflow: {xs: "ellipsis", sm: "initial"},
                  whiteSpace: "nowrap",
                },
              }}
            />
            <ListItemText
              primary={new Date(board.updatedAt).toLocaleString()}
              style={{
                fontSize: "0.8rem",
                color: "#757575",
                marginLeft: "5px",
              }}
            />
          </Box>
        </div>
        <ArrowForwardIosIcon
          sx={{
            color: "#757575",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
