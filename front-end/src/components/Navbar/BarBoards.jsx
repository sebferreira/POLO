import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import UsersMenu from "../Menu/users";

export default function BarBoards({boards}) {
  const params = useParams();
  console.log(boards);
  const boardFound = boards.find((board) => board.id_board === params.boardId);
  console.log(boardFound);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0",
          backgroundColor: "#215af3",
        }}>
        <Toolbar
          style={{
            display: "flex",
            height: "3rem",
            minHeight: "3.5rem",
          }}
          sx={{
            justifyContent: "space-between",
            flexDirection: {xs: "row-reverse", lg: "row"},
          }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: {xs: "1.25rem", xl: "1.5rem"},
              marginLeft: {xs: "0", lg: "16rem"},
            }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#FFFF",
                fontWeight: "bold",
              }}>
              {boardFound && boardFound.name}
            </Link>
          </Typography>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}>
            <Button
              style={{
                height: "100%",
                fontWeight: "bold",
                textTransform: "none",
                marginRight: "1.5rem",
              }}
              sx={{
                display: {xs: "none", lg: "flex"},
              }}
              variant="text"
              component={Link}
              to={`/${params.boardId}/invites`}>
              <Typography
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}>
                {"Agregar Miembros"}
              </Typography>
            </Button>
            <UsersMenu />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
