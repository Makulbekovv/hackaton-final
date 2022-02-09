import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../contexts/AdminProvider";

const AddPage = (props) => {
  const [newPost, setNewPost] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    color: "",
  });

  const { addPost } = useContext(AdminContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newPost);
    for (const key in newPost) {
      if (!newPost[key]) {
        alert("Заполните поля");
        return;
      }
    }

    addPost(newPost);
    setNewPost({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      color: "",
    });
  };
  return (
    <div style={{ marginBottom: "50px" }}>
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Add</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: "50px" }}>
          <TextField
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            value={newPost.name}
            id="outlined-basic"
            label="Name"
            variant="standard"
            sx={{ width: "50%", marginLeft: "25%" }}
          />
          <TextField
            onChange={(e) => setNewPost({ ...newPost, brand: e.target.value })}
            value={newPost.brand}
            id="filled-basic"
            label="Brand"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />
          <TextField
            onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
            value={newPost.price}
            id="standard-basic"
            label="Price"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />
          <TextField
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            value={newPost.description}
            id="standard-basic"
            label="Description"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />
          <TextField
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            value={newPost.image}
            id="standard-basic"
            label="Image"
            variant="standard"
            sx={{ width: "50%", ml: "25%", mt: "20px" }}
          />
          <FormControl sx={{ width: "50%", ml: "25%", mt: "20px" }}>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              labelId="color-select"
              label="Выберите цвет"
              onChange={(e) =>
                setNewPost({ ...newPost, color: e.target.value })
              }
              value={newPost.color}
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
        </Box>

        <Button
          type="submit"
          sx={{ ml: "25%", width: "50%", mt: "20px", backgroundColor: "black" }}
          variant="contained"
          // color="primary"
        >
          Add
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPage;
