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

  const onSubmit = handleSubmit(async (data) => {
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
          backgroundColor: "#F1F2F4",
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
              marginBottom: 2,
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
                marginBottom: "1rem",
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
              style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "#3181FA",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
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
            <Link to="/tables" style={{color: "black", textDecoration: "none"}}>
              ¿Deseas volver?
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
