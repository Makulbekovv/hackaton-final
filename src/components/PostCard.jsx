import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AdminContext } from "../contexts/AdminProvider";
import { Link } from "react-router-dom";
import { Collapse, Rating } from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import Comments from "../Comments/Comments";
import { Box } from "@mui/system";
import { useContext } from "react";

export default function PostCard(props) {
  const { deletePost, user } = React.useContext(AdminContext);
  const {
    addProductToCart,
    checkProductInCart,
    deleteProductFromCart,
    addProductToFavorites,
    checkProductInFavorites,
    deleteProductFromFavorites,
  } = React.useContext(ClientContext);
  return (
    <Card sx={{ mt: "50px" }}>
      <CardMedia
        style={{ height: "200px" }}
        component="img"
        height="140"
        image={props.item.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
        <Typography
          style={{ marginTop: "10px" }}
          variant="body2"
          color="text.secondary"
        >
          {props.item.brand}
        </Typography>
        <Typography
          style={{ marginTop: "10px" }}
          variant="body2"
          color="text.secondary"
        >
          {props.item.price} сом
        </Typography>
        {user ? (
          <Box>
            <Typography component="legend" style={{ marginTop: "10px" }}>
              Rating
            </Typography>
            <Rating name="simple-controlled" />
          </Box>
        ) : (
          <Typography component="legend">Rating Disabled</Typography>
        )}
      </CardContent>
      <CardActions>
        <CardContent>
          <CardActions>
            {checkProductInCart(props.item.id) ? (
              <Button
                style={{ color: "black" }}
                onClick={() => deleteProductFromCart(props.item.id)}
                size="small"
              >
                <ShoppingCartIcon />
              </Button>
            ) : (
              <Button
                style={{ color: "black" }}
                onClick={() => addProductToCart(props.item)}
                size="small"
              >
                <ShoppingCartOutlinedIcon />
              </Button>
            )}
            {checkProductInFavorites(props.item.id) ? (
              <Button
                style={{ color: "black" }}
                onClick={() => deleteProductFromFavorites(props.item.id)}
                size="small"
              >
                <StarIcon />
              </Button>
            ) : (
              <Button
                style={{ color: "black" }}
                onClick={() => addProductToFavorites(props.item)}
                size="small"
              >
                <StarOutlineOutlinedIcon />
              </Button>
            )}
          </CardActions>
        </CardContent>
      </CardActions>

      <Collapse timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
