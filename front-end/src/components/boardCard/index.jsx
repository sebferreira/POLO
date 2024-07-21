import {ListItem, ListItemText, ListItemButton} from "@mui/material";
import {Link} from "react-router-dom";

export default function BoardCard({board}) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={`/boards/${board.id_board}`}
        sx={{
          color: "#1e1e1e",
        }}>
        <ListItemText primary={board.name} />
      </ListItemButton>
    </ListItem>

    /*  <Card
      style={{
        margin: "1rem",
        padding: "1rem",
        width: "15rem",
        height: "10rem",
        borderRadius: "10px",
        backgroundColor: "#1976d2",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        boxShadow: "0px 0px, 3px 3px rgba(0, 0, 0, 0.4)",
      }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {board.name}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          style={{
            marginTop: "1rem",
            borderRadius: 7,
            fontWeight: "bold",
          }}>
          <Link
            to={`/boards/${board.id_board}`}
            style={{
              color: "#1e1e1e",
              textDecoration: "none",
              fontWeight: "bold",
            }}>
            Ver tablero
          </Link>
        </Button>
      </CardContent>
    </Card> */
  );
}
