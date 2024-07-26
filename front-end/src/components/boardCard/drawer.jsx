import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function BoardDrawer({boards}) {
  const dash = <DashboardIcon sx={{color: "white"}} />;

  const params = useParams();
  return (
    <>
      <Box
        sx={{
          width: 260,
          height: "100%",
          backgroundColor: "#1976d2",
          display: "flex",
          flexDirection: "column",
        }}>
        <Divider />
        <List
          style={{
            overflow: "auto",
            scrollbarColor: "#262626 transparent",
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
            direction: "ltr",
          }}>
          <Typography
            component="span"
            variant="h6"
            sx={{
              marginTop: "1rem",
              fontWeight: "bold",
              marginLeft: "1rem",
            }}>
            <Divider textAlign="left">Tus tableros</Divider>
          </Typography>
          {boards.map((item) => {
            if (item.id_board === params.boardId) {
              return (
                <ListItem disablePadding key={item.id_board}>
                  <ListItemButton
                    component={Link}
                    to={`/boards/${item.id_board}`}
                    sx={{
                      marginTop: "1rem",
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "#2196f3",
                      "&:hover": {
                        backgroundColor: "#2196f3",
                      },
                      "&:active": {
                        backgroundColor: "#1565c0",
                      },
                    }}>
                    <ListItemIcon>{dash}</ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{
                        "& .MuiTypography-root": {
                          width: " 10rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            } else {
              return (
                <ListItem disablePadding key={item.id_board}>
                  <ListItemButton
                    component={Link}
                    to={`/boards/${item.id_board}`}
                    sx={{
                      marginTop: "1rem",
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "#215af3",
                      },
                      "&:active": {
                        backgroundColor: "#1565c0",
                      },
                      "& .MuiTypography-root": {
                        width: " 10rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      },
                    }}>
                    <ListItemIcon>{dash}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Box>
    </>
  );
}
