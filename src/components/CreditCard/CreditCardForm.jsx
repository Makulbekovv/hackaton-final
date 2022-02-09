import React from "react";

import "../CreditCard/CreditCard.css";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const PaymentPage = () => {
  function payment() {
    toast.success("Успешно оплачено");
  }
  return (
    <div>
      <div className="containerd" id="container">
        <div className="personal-container">
          <div
            className="first-div"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <input type="text" id="cardName" placeholder="Имя" />
            <div style={{ margin: 0, padding: 0, marginRight: "20px" }}></div>
            <input
              style={{ width: "45%" }}
              type="text"
              id="cardSurname"
              placeholder="Фамилия"
            />
          </div>
          <div className="second-div">
            <input
              type="text"
              id="cardNumber"
              placeholder="Номер кредитной карты"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="third-div">
              <div className="exp">
                <p style={{ fontSize: "10px" }}>Дата окончания срока</p>
              </div>
              <div className="expirition">
                <select name="mm" id="mm" className="select-item">
                  <option>mm</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select name="yy" id="yy" className="select-item">
                  <option>yy</option>
                  <option value="20">2020</option>
                  <option value="21">2021</option>
                  <option value="22">2022</option>
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
                  <option value="27">2027</option>
                  <option value="28">2028</option>
                </select>
              </div>
            </div>
            <div className="fourth-div">
              <div className="exp">
                <p>CVV</p>
              </div>
              <div className="expirition">
                <input className="cvv" type="text" id="cardNumber" />
              </div>
            </div>
          </div>
          <div className="card" id="card">
            <div className="card-position">
              <div className="card-position">
                <p className="card-number" id="displayNumber"></p>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="card-position">
                  <p className="card-name" id="displayName"></p>
                </div>
                <div className="card-position">
                  <p className="card-surname" id="displaySurname"></p>
                </div>
                <div className="card-position">
                  <p className="card-mm" id="displayMm"></p>
                </div>
                <div className="card-position">
                  <p className="card-yy" id="displayYy"></p>
                </div>
              </div>
              <img
                className="sim"
                id="sim"
                src="https://i.hizliresim.com/MdZ3Cf.png"
                alt=""
              />
              <div className="card-position">
                <img
                  className="logo"
                  id="logo"
                  src="https://i.hizliresim.com/Lx4G72.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={payment}
        style={{
          backgroundColor: "gray",
          color: "white",
          width: "15%",
          position: "relative",
          left: "42.5%",
          bottom: "80px",
        }}
      >
        Оплатить
      </Button>

      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
