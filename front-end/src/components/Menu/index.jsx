import {useState} from "react";
import {Button, Modal} from "@mui/material";
import ModalDelete from "../DeleteModal";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function BorrarUser({user, boardId}) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  return (
    <>
      <Button
        onClick={handleOpenModalDelete}
        sx={{
          color: "inherit",
        }}>
        <PersonRemoveIcon fontSize="small" color="error" />
      </Button>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalDelete
          setOpenModalDelete={setOpenModalDelete}
          data={user.username}
          type={"users"}
          message={"¿Estas seguro de sacar a este usuario?"}
          boardId={boardId}
        />
      </Modal>
    </>
  );
}
