import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const ButtonsNavbar = (item, color, bgColor) => {
  return (
    <Button
      key={item.label}
      style={{
        backgroundColor: bgColor,
        borderRadius: 0,
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "none",
        paddingInline: "1.2rem",
        margin: 0,
        height: "100%",
        boxShadow: "none",
      }}
      variant="contained"
      component={Link}
      to={item.href}>
      <Typography
        style={{
          color: color,
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}>
        {item.label}
      </Typography>
    </Button>
  );
};
