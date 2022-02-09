import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";
import "./Filters/Filter.css";

const Filters = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getPosts } = useContext(ClientContext);
  const [searchValue, setSearchValue] = useState(search.get("q") || "");
  const [colorValue, setColorValue] = useState(search.get("color") || "");
  const [priceValue, setPriceValue] = useState(search.get("price_lte" || ""));

  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    setColorValue(search.get("color") || "");
    setPriceValue(search.get("price_lte" || ""));
    getPosts();
  };
  const resetFilter = () => {
    navigate("/");
    setSearchValue("");
    setColorValue("");
    setPriceValue("");
    getPosts();
  };
  return (
    <div className="search">
      <div
        className="filters-block"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <div>
          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              value={colorValue}
              onChange={(e) => filterProducts("color", e.target.value)}
              labelId="color-select"
              label="Выберите цвет"
              style={{ width: "200px" }}
            >
              <MenuItem style={{ color: "black " }} value="black">
                Черный
              </MenuItem>
              <MenuItem style={{ color: "black " }} value="white">
                Белый
              </MenuItem>
              <MenuItem style={{ color: "black " }} value="gray">
                Серый
              </MenuItem>
              <MenuItem style={{ color: "black " }} value="space-gray">
                Темно-серый
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="slider-filter">
          <Slider
            style={{ width: "200px", color: "black" }}
            onChange={(e) => filterProducts("price_lte", e.target.value)}
            valueLabelDisplay="auto"
            max={200000}
            step={100}
          />
        </div>
        <div className="sbros-button">
          <Button
            onClick={resetFilter}
            variant="contained"
            color="warning"
            style={{ color: "white", width: "200px", backgroundColor: "black" }}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
