import { Container } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { AdminContext } from "./contexts/AdminProvider";
import { auth } from "./firebase-config";
import "./styles/Sign.css";

const SignIn = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { setUser, user } = useContext(AdminContext);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <Container>
      <div
        className="first-block"
        style={{ marginTop: "40px", marginBottom: "200px" }}
      >
        <div className="sign-block">
          <h3>Sign in</h3>
          <input
            className="sign"
            placeholder="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            className="sign"
            placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button className="sign-btn" onClick={login}>
            Sign in
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
