import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { API, API_COMMENT } from "../helpers/const";

export const ClientContext = createContext();

const INIT_STATE = {
  comment: null,
  posts: null,
  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).posts.length
    : 0,
  favoriteCount: JSON.parse(localStorage.getItem("favorite"))
    ? JSON.parse(localStorage.getItem("favorite")).posts.length
    : 0,
  favorite: null,
  cart: null,
  detail: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "GET_COMMENT":
      return { ...state, comment: action.payload };
    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    case "DELETE_PRODUCT_FROM_CART":
      return { ...state, cartCount: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "GET_DATA":
      return { ...state, detail: action.payload };
    case "ADD_PRODUCT_TO_FAVORITES":
      return { ...state, favoriteCount: action.payload };
    case "DELETE_PRODUCT_FROM_FAVORITES":
      return { ...state, favoriteCount: action.payload };
    case "GET_FAVORITES":
      return { ...state, favorite: action.payload };

    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getPosts = async () => {
    try {
      const response = await axios(`${API}/${window.location.search}`);
      // console.log(response);
      let action = {
        type: "GET_POSTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  const getComment = async () => {
    try {
      const response = await axios(`${API_COMMENT}`);
      // console.log(response);
      let action = {
        type: "GET_COMMENT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // !pagination
  const productsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (state.posts) {
      setProduct(state.posts);
    }
  }, [state.posts]);

  const iindexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = iindexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    iindexOfLastProduct
  );
  const totalProductsCount = product.length;

  // ! Cart
  const addProductToCart = (post) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        posts: [],
        totalPrice: 0,
      };
    }

    let postCart = {
      post: post,
      count: 1,
      subPrice: post.price,
    };
    cart.posts.push(postCart);
    cart.totalPrice = cart.posts.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.posts.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        posts: [],
      };
    }
    let check = cart.posts.find((item) => {
      return item.post.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const deleteProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.posts = cart.posts.filter((item) => {
      return item.post.id !== id;
    });
    cart.totalPrice = cart.posts.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "DELETE_PRODUCT_FROM_CART",
      payload: cart.posts.length,
    };
    dispatch(action);
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        posts: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.posts = cart.posts.map((item) => {
      if (item.post.id === id) {
        item.count = count;
        item.subPrice = item.count * item.post.price;
        return item;
      } else {
        return item;
      }
    });
    cart.totalPrice = cart.posts.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  // !favorites
  const addProductToFavorites = (post) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        posts: [],
      };
    }

    let postCart = {
      post: post,
      count: 1,
      subPrice: post.price,
    };
    favorite.posts.push(postCart);

    localStorage.setItem("favorite", JSON.stringify(favorite));
    let action = {
      type: "ADD_PRODUCT_TO_FAVORITES",
      payload: favorite.posts.length,
    };
    dispatch(action);
  };

  const checkProductInFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        posts: [],
      };
    }
    let check = favorite.posts.find((item) => {
      return item.post.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const deleteProductFromFavorites = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite.posts = favorite.posts.filter((item) => {
      return item.post.id !== id;
    });

    localStorage.setItem("favorite", JSON.stringify(favorite));
    let action = {
      type: "DELETE_PRODUCT_FROM_FAVORITES",
      payload: favorite.posts.length,
    };
    dispatch(action);
  };

  const getFavorites = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        posts: [],
      };
    }
    let action = {
      type: "GET_FAVORITES",
      payload: favorite,
    };
    dispatch(action);
  };

  //! Detail page
  const getDetail = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_DATA",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        getPosts,
        getComment,
        setCurrentPage,
        addProductToCart,
        checkProductInCart,
        deleteProductFromCart,
        changeCount,
        getDetail,
        getCart,
        addProductToFavorites,
        deleteProductFromFavorites,
        checkProductInFavorites,
        getFavorites,
        favoriteCount: state.favoriteCount,
        favorite: state.favorite,
        posts: state.posts,
        comment: state.comment,
        posts: currentProducts,
        totalProductsCount,
        productsPerPage,
        currentPage,
        cart: state.cart,
        cartCount: state.cartCount,
        detail: state.detail,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
