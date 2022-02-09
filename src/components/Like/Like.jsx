import React, { useContext, useState } from "react";
import "../Like/Like.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";
import { AdminContext } from "../../contexts/AdminProvider";
const Like = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("text");
  const { user } = useContext(AdminContext);
  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }
  return (
    <div
      style={{
        width: "70px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <h1 style={{ fontSize: "22px" }}>{count}</h1>

      <div>
        {count ? (
          <button
            style={{ color: "red", border: "none", backgroundColor: "white" }}
            onClick={decrement}
          >
            <FavoriteOutlinedIcon />
          </button>
        ) : (
          <button
            style={{
              color: "black",
              border: "none",
              backgroundColor: "white",
            }}
            onClick={increment}
          >
            <FavoriteBorderIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Like;
