import {Card, CardContent, Typography} from "@mui/material";

export default function BoardCard({board}) {
  return (
    <Card
      sx={{
        width: {md: "7rem", lg: "10rem", xl: "15rem"},
        height: {md: "7rem", lg: "10rem"},
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#1976d2",
          color: "white",
        },
        padding: "2rem",
        margin: "1rem",
      }}>
      <CardContent
        sx={{
          fontSize: "1rem",
          textAlign: "center",
          margin: 0,
          padding: 0,
          paddingTop: {md: 0, xl: "1rem"},
          paddingBottom: {md: 0, xl: "1rem"},
          marginBottom: "0",

          overflow: "hidden",
          maxWidth: "100%",
        }}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          sx={{
            margin: {md: 0, xl: "1rem"},
            padding: 0,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}>
          {board.name}
        </Typography>
        <Typography
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0",
            fontSize: {md: "0.7rem", lg: "1rem"},
          }}>
          Ultima modificacion: <br />
          {new Date(board.updatedAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
