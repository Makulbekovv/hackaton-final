import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ClientContext } from "../contexts/ClientProvider";
import { Button, Container, TableFooter } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/CartStyle.css";

export default function CartTable() {
  const { getCart, cart, changeCount } = React.useContext(ClientContext);

  React.useEffect(() => {
    getCart();
  }, []);

  if (!cart) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Container>
        <div style={{ marginTop: "10%" }}>
          <div>
            <div>
              {cart.posts.map((item) => (
                <div key={item.post.id}>
                  <div className="cart-flex">
                    <div>
                      <h6 className="cart-name">{item.post.name}</h6>
                      <div className="cart-img">
                        <img width="200" src={item.post.image} alt="cart-img" />
                      </div>
                    </div>
                    <div>
                      <div>Стоимость {item.post.price} сом</div>
                      <div>
                        <input
                          style={{ marginTop: "10px" }}
                          min="1"
                          onChange={(e) => {
                            if (e.target.value < 1) {
                              return;
                            }
                            changeCount(e.target.value, item.post.id);
                          }}
                          type="number"
                          value={item.count}
                        />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        Общяя сумма {item.subPrice} сом
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-i-summ">
              <div>
                <h2 className="cart-itog"> Итоговая сумма:</h2>
              </div>
              <div>
                <h2 className="cart-itog" style={{ fontSize: 22 }}>
                  {cart.totalPrice} сом
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="order-button">
          <Link to="/credit-card">
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                marginBottom: "30px",
                marginTop: "10px",
              }}
            >
              Оформить заказ
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}
