import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {navLinks, navLinksAuthenticated} from "../../scripts/NavbarLinks";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";

export default function NavDrawer() {
  const {isAuthenticated, logout} = useAuth();
  return (
    <>
      <Box sx={{width: 200}}>
        <nav>
          <List>
            {isAuthenticated &&
              navLinksAuthenticated.map((item) => {
                if (item.label === "Cerrar Sesion") {
                  return (
                    <ListItem disablePadding key={item.label}>
                      <ListItemButton onClick={logout}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
                return (
                  <ListItem disablePadding key={item.label}>
                    <ListItemButton component={Link} to={item.href}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            {!isAuthenticated &&
              navLinks.map((item) => {
                return (
                  <ListItem disablePadding key={item.label}>
                    <ListItemButton component={Link} to={item.href}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </nav>
      </Box>
    </>
  );
}
