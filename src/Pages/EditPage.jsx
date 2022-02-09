import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../contexts/AdminProvider";
// import { AdminContext } from "../contexts/AdminProvider";

const EditPage = () => {
  const params = useParams();
  const { getPostToEdit, postToEdit, saveEditedPost } =
    useContext(AdminContext);
  const [postEdit, SetPostEdit] = useState(postToEdit);
  console.log(postEdit);
  const navigate = useNavigate();
  useEffect(() => {
    SetPostEdit(postToEdit);
  }, [postToEdit]);
  useEffect(() => {
    getPostToEdit(params.id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // ! Проверка на пустоту
    for (const key in postEdit) {
      if (!postEdit[key]) {
        alert("Заполните поля");
        return;
      }
    }
    saveEditedPost(postEdit);
    navigate("/admin-panel");
  };

  if (!postEdit) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <Container>
        <h3 style={{ textAlign: "center" }}>Edit Page</h3>
        <form onSubmit={handleSubmit} id="contact">
          <TextField
            onChange={(e) => SetPostEdit({ ...postEdit, name: e.target.value })}
            value={postEdit.name}
            id="outlined-basic"
            label="Введите название"
            variant="standard"
            sx={{ width: "50%", marginLeft: "25%" }}
          />

          <TextField
            onChange={(e) =>
              SetPostEdit({ ...postEdit, brand: e.target.value })
            }
            value={postEdit.brand}
            id="filled-basic"
            label="Введите бренд"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />

          <TextField
            onChange={(e) =>
              SetPostEdit({ ...postEdit, price: e.target.value })
            }
            value={postEdit.price}
            id="standard-basic"
            label="Введите цену"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />

          <TextField
            onChange={(e) =>
              SetPostEdit({ ...postEdit, image: e.target.value })
            }
            value={postEdit.image}
            id="standard-basic"
            label="Картинка"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />

          <TextField
            onChange={(e) =>
              SetPostEdit({ ...postEdit, description: e.target.value })
            }
            value={postEdit.description}
            id="standard-basic"
            label="Введите описание"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />

          <FormControl sx={{ width: "50%", ml: "25%", mt: "20px" }}>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              labelId="color-select"
              label="Выберите цвет"
              onChange={(e) =>
                SetPostEdit({ ...postEdit, color: e.target.value })
              }
              value={postEdit.color}
            >
              <MenuItem style={{ color: "black" }} value="black">
                Черный
              </MenuItem>
              <MenuItem style={{ color: "black" }} value="white">
                Белый
              </MenuItem>
              <MenuItem style={{ color: "black" }} value="gray">
                Серый
              </MenuItem>
              <MenuItem style={{ color: "black" }} value="space-gray">
                Темно-серый
              </MenuItem>
              <MenuItem style={{ color: "black" }} value="gold">
                Золотистый
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            sx={{
              ml: "25%",
              width: "50%",
              mt: "20px",
              backgroundColor: "black",
            }}
            variant="contained"
            // color="primary"
          >
            {" "}
            Сохранить ихменения
          </Button>
        </form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default EditPage;
