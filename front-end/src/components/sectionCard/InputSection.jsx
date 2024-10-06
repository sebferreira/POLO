import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateSection} from "../../queryFn";
import {useNavigate, useParams} from "react-router-dom";
import SectionMenu from "../Menu/sectionMenu";

export default function InputSection({section, sections}) {
  const [title, setTitle] = useState(section.title);
  const navigate = useNavigate();
  const params = useParams();
  const {handleSubmit} = useForm();
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}>
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
            <SectionMenu section={section} sections={sections} />
          )}
        </Box>
      </form>
    </>
  );
}
