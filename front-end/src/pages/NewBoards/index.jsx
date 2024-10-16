import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {createBoards} from "../../queryFn";

export default function NewBoard() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(null);
  const [newBoardErrors, setNewBoardErrors] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const onClick = (e) => {
    if (!boardId && !loaded) {
      let boton = e.target;
      boton.disabled = true;
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoaded(false);
    const response = await createBoards(data);
    if (response.length >= 0) {
      setNewBoardErrors(response);
    }
    setBoardId(response.newBoard.id_board);
    setNewBoardErrors([]);
  });
  useEffect(() => {
    if (newBoardErrors.length > 0) {
      const timer1 = setTimeout(() => {
        setNewBoardErrors([]);
      }, 5000);
      return () => clearTimeout(timer1);
    }
  });
  useEffect(() => {
    if (boardId) {
      navigate(`/${boardId}/invites`);
    }
  }, [navigate, boardId]);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}>
      <Card
        sx={{
          mt: {xs: "3rem", md: "5rem", xl: "10rem"},
          width: {xs: "15rem", md: "20rem", lg: "25rem"},
          height: {lg: "25rem"},
        }}
        style={{
          padding: "1.7rem",
          backgroundColor: "#fff",
          borderRadius: 12,
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: {xs: 2, md: 5},
              fontSize: {xs: "1.1rem", md: "1.5rem"},
            }}>
            Crear Tablero
          </Typography>
          <form onSubmit={onSubmit}>
            {newBoardErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  fontWeight="bold"
                  key={i}>
                  {error}
                </Typography>
              );
            })}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Nombre del tablero
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
              }}
              type="text"
              fontWeight="bold"
              {...register("name", {required: true})}
              size="small"
              variant="outlined"
            />
            {errors.name && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                Board name is required
              </Typography>
            )}
            <Button
              variant="contained"
              size="medium"
              color="primary"
              disabled={boardId ? true : false}
              style={{
                marginTop: "2.5rem",
                width: "100%",
                backgroundColor: "rgb(24 32 68)",
                color: "#fff",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={onClick}
              type="submit">
              Crear tableros
            </Button>
          </form>
          <Typography
            variant="subtitle1"
            component="p"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginTop: "1rem",
              color: "black",
            }}>
            <Link to="/tables" style={{textDecoration: "none"}}>
              <Typography
                sx={{
                  color: "rgb(24 32 68)",
                  "&:hover": {
                    color: "#010206",
                  },
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}>
                ¿Deseas volver?
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
