import {Box, Button, Modal, TextField} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateSection} from "../../queryFn";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalDelete from "../DeleteModal";
import {useNavigate, useParams} from "react-router-dom";

export default function InputSection({section}) {
  const [title, setTitle] = useState(section.title);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const {handleSubmit} = useForm();
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const onSubmit = handleSubmit(async () => {
    const body = {title};
    if (body.title) {
      await UpdateSection(section.id_section, body, params.boardId);
      navigate(0);
    }
  });
  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <Box>
          <TextField
            id="modal-modal-title"
            type="text"
            value={title}
            onChange={updateTitle}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: 0,
                fontWeight: "bold",
                fontSize: {xs: "1.1rem", xl: "1.2rem"},
                width: "100%",
                color: "#172b4d",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
              "&:hover": {
                backgroundColor: "#dddddf",
              },
              "& :focus": {
                border: "1px solid",
                padding: "2px",
              },
              textAlign: "left",

              marginBottom: "1px",
              width: {xs: "60%", sm: "60%", md: "75%"},
            }}
          />
          {title != section.title && (
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                width: "10%",
                fontSize: "10px",
                textTransform: "none",
              }}>
              Guardar
            </Button>
          )}
          {title === section.title && (
            <Button
              onClick={handleOpenModalDelete}
              sx={{
                color: "inherit",
              }}>
              <DeleteForeverIcon fontSize="small" color="error" />
            </Button>
          )}
        </Box>
      </form>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalDelete
          data={section}
          type={"section"}
          message={"¿Estas seguro de borrar la seccion?"}
          boardId={params.boardId}
        />
      </Modal>
    </>
  );
}
