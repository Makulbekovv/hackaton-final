import { Button, Container, Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Footer from "../Comments/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import Filters from "../components/Filters";
import ProductsPagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import SliderNavigate from "../components/Slider/SliderNavigate";
import { AdminContext } from "../contexts/AdminProvider";
import { ClientContext } from "../contexts/ClientProvider";

const MainPage = (props) => {
  const { getPosts, posts } = useContext(ClientContext);
  const { user } = useContext(AdminContext);
  console.log(user);
  useEffect(() => {
    getPosts();
  }, []);
  if (!posts) {
    return <h2>Loading...</h2>;
  }
  return (
    <div style={{ marginTop: "10%" }}>
      <Container>
        <SliderNavigate />
        <br />
        <br />
        <Filters />
        <Grid container spacing={4}>
          {posts.map((item) => (
            <Grid xs={12} sm={6} md={4} item key={item.id}>
              <PostCard item={item} />
            </Grid>
          ))}
        </Grid>
        <ProductsPagination />
      </Container>
    </div>
  );
};

export default MainPage;
