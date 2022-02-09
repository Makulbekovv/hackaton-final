import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "../contexts/AdminProvider";
import { ClientContext } from "../contexts/ClientProvider";

const Comment = (props) => {
  const { getComment, comment } = useContext(ClientContext);

  const [newPost, setNewPost] = useState({
    namee: "",
  });

  const { addComment, deleteComment, user } = useContext(AdminContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    for (const key in newPost) {
      if (!newPost[key]) {
        alert("Заполните поля");
        return;
      }
    }

    addComment(newPost);
    setNewPost({
      namee: "",
    });
  };
  useEffect(() => {
    getComment();
  }, []);
  if (!comment) {
    return <h2>Loading...</h2>;
  }
  return (
    <div style={{ marginBottom: "50px" }}>
      {user ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: "50px" }}>
            <input
              style={{ height: "40px", borderRadius: "10px" }}
              onChange={(e) =>
                setNewPost({ ...newPost, namee: e.target.value })
              }
              value={newPost.namee}
              id="outlined-basic"
              placeholder="Оставьте комментарий"
              variant="standard"
              sx={{ width: "50%", marginLeft: "25%" }}
            />
            <Button
              type="submit"
              sx={{
                ml: "0%",
                width: "50px",
                backgroundColor: "black",
                borderRadius: "10px",
              }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </form>
      ) : (
        <h2>Чтобы оставить комментарий зарегистрируйтесь пожалуйста!</h2>
      )}
      <ToastContainer />

      {comment.map((item) => (
        <div style={{ display: "flex" }}>
          <ul
            style={{
              display: "block",
              marginTop: "10px",
              borderRadius: "10px",
              textAlign: "center",
              width: "20%",
              height: "50px",
              color: "black",
              border: "2px solid black",
            }}
            key={item.id}
            value={item.namee}
          >
            <h1 style={{ fontSize: "12px" }}>{user?.email}</h1>
            <li>{item.namee}</li>
          </ul>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              height: "33px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            onClick={() => deleteComment(item.id)}
          >
            del
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Comment;
