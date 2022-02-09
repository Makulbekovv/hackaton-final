import { Button, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const DetailPage = () => {
  const params = useParams();
  const {
    getDetail,
    detail,
    checkProductInFavorites,
    deleteProductFromFavorites,
    addProductToFavorites,
  } = useContext(ClientContext);

  useEffect(() => {
    getDetail(params.id);
  }, []);

  if (!detail) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Container>
        <div className="detail-page">
          <div className="detail-left-img">
            <img src={detail.image} alt="detail-img" />
          </div>
          <div className="detail-right">
            <h3>{detail.name}</h3>
            <ul>
              <li>
                Бренд: <strong>{detail.brand}</strong>
              </li>
              <li>
                Цвет: <strong>{detail.color}</strong>
              </li>
              <li>
                Цена: <strong>{detail.price}</strong>
              </li>
              <li>
                Описание <strong>{detail.description}</strong>
              </li>
            </ul>
            <div>
              {checkProductInFavorites(detail.id) ? (
                <Button
                  style={{ background: "black", color: "white" }}
                  onClick={() => deleteProductFromFavorites(detail.id)}
                  size="small"
                  variant="contained"
                  color="warning"
                >
                  В Корзине
                </Button>
              ) : (
                <Button
                  style={{ background: "grey", color: "white" }}
                  onClick={() => addProductToFavorites(detail)}
                  size="small"
                >
                  В Корзину
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailPage;
