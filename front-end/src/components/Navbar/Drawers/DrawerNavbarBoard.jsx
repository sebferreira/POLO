import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import {Link, useParams} from "react-router-dom";
import {BoardLinks} from "../../../scripts/NavbarLinks";

export default function NavDrawerBoards() {
  const params = useParams();
  return (
    <>
      <Box sx={{width: 200}}>
        <nav>
          <List>
            {BoardLinks.map((item) => {
              if (item.label === "Volver") {
                if (params.boardId) {
                  return (
                    <ListItem disablePadding key={item.label}>
                      <ListItemButton component={Link} to={item.href}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                } else {
                  return;
                }
              } else if (item.label === "Agregar Miembros") {
                if (params.boardId) {
                  return (
                    <ListItem disablePadding key={item.label}>
                      <ListItemButton
                        component={Link}
                        to={`/${params.boardId}/invites`}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                } else {
                  return null;
                }
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
          </List>
        </nav>
      </Box>
    </>
  );
}
