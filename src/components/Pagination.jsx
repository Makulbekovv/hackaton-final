import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ClientContext } from "../contexts/ClientProvider";

const ProductsPagination = () => {
  const { productsPerPage, totalProductsCount, setCurrentPage } =
    useContext(ClientContext);
  const count = Math.ceil(totalProductsCount / productsPerPage);
  return (
    <div className="products-pagination">
      <Pagination
        style={{ position: "relative", bottom: "40px", color: "grey" }}
        onChange={(_, value) => setCurrentPage(value)}
        count={count}
      />
    </div>
  );
};

export default ProductsPagination;
