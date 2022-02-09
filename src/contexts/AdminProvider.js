import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase-config";
import { API, API_COMMENT } from "../helpers/const";
import { ClientContext } from "./ClientProvider";

export const AdminContext = createContext();

const INIT_STATE = {
  posts: null,
  postToEdit: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "GET_POST_TO_EDIT":
      return { ...state, postToEdit: action.payload };
    default:
      return state;
  }
};
const logout = async () => {
  await signOut(auth);
};
const AdminProvider = (props) => {
  const { getComment } = useContext(ClientContext);
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const [user, setUser] = useState({});
  console.log(user);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const addPost = async (newPost) => {
    try {
      await axios.post(API, newPost);
      toast.success("Успешно добавлено");
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = async (newPost) => {
    try {
      await axios.post(API_COMMENT, newPost);
      toast.success("Успешно добавлено");
      getComment();
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_POSTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getPosts();
      toast.success("Успешно удалено");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    try {
      await axios.delete(`${API_COMMENT}/${id}`);
      getComment();
      toast.success("Успешно удалено");
    } catch (error) {
      console.log(error);
    }
  };

  const getPostToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_POST_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedPost = async (productEdit) => {
    try {
      await axios.patch(`${API}/${productEdit.id}`, productEdit);
      getPosts();
      toast.success("Изменения сохранены");
    } catch (error) {
      toast.error("Ощиюка!");
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addPost,
        addComment,
        getPosts,
        deletePost,
        deleteComment,
        getPostToEdit,
        saveEditedPost,
        setUser,
        logout,
        user,
        postToEdit: state.postToEdit,

        posts: state.posts,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
