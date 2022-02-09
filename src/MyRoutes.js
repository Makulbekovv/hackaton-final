import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "./Comments/Comments";
import Footer from "./Comments/Footer/Footer";
import CreditCardForm from "./components/CreditCard/CreditCardForm";
import Navbar from "./components/Navbar/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AddPage from "./Pages/AddPage";
import AdminPage from "./Pages/AdminPage";
import CartPage from "./Pages/CartPage";
import DetailPage from "./Pages/DetailPage";
import EditPage from "./Pages/EditPage";
import Favorites from "./Pages/Favorites/Favorites";
import MainPage from "./Pages/MainPage";
import Register from "./Register";
import SignIn from "./SignIn";

const MyRoutes = () => {
  return (
    <ClientProvider>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/admin-panel/edit/:id" element={<EditPage />} />
            <Route path="comment/:id" element={<Comments />} />
            <Route path="/product-detail/:id" element={<DetailPage />} />
            <Route path="/admin-panel" element={<AdminPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorite" element={<Favorites />} />
            <Route path="/credit-card" element={<CreditCardForm />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AdminProvider>
    </ClientProvider>
  );
};

export default MyRoutes;
