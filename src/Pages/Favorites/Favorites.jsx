import * as React from "react";
import { Button, Container, TableFooter } from "@mui/material";
import { Link } from "react-router-dom";
import { ClientContext } from "../../contexts/ClientProvider";
import "../Favorites/Favorite.css";
import Like from "../../components/Like/Like";
import Comment from "../../Comments/Comments";

export default function Favorites(props) {
  const { getFavorites, favorite } = React.useContext(ClientContext);
  console.log(favorite);

  React.useEffect(() => {
    getFavorites();
  }, []);

  if (!favorite) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Container>
        {favorite.posts.map((item) => (
          <div
            className="favorite"
            key={item.post.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <div>
              <img
                width="100"
                src={item.post.image}
                alt="cart-img"
                style={{ width: "50%" }}
              />
            </div>
            <div>{item.post.description}</div>
            <h2 className="favorite-name" component="th" scope="row">
              {item.post.name}
            </h2>
            <div className="favorite-price">{item.post.price} сом</div>
            <br />
            <Like />
            <br />
            <Comment />
            <hr />
            <br />
            <br />
          </div>
        ))}
      </Container>
    </>
  );
}
