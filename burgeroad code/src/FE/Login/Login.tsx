import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { auth } from "../../BE/Firebase";
import { useStyles } from "./Login.style";
import { removeUserToLocalStorage, setUserToLocalStorage } from "./UserManager";
import "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "../Modal/Modal";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [isOpenPopUpLogin, setIsOpenPopUpLogin] = useState<boolean>(false);
  const [isOpenPopUpSignIn, setIsOpenPopUpSignIn] = useState<boolean>(false);
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const email = user?.email ?? "";
      await setUserToLocalStorage(email, uid, new Date());
    } else {
      removeUserToLocalStorage();
    }
  });

  const signIn = (e: any) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth: any) => {
        window.location = `/user/${auth?.user?._delegate?.uid}` as any;
      })
      .catch(() => setIsOpenPopUpLogin(true));
  };

  const register = (e: any) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth: any) => {
        if (auth) {
          window.location = `/user/${auth?.user?._delegate?.uid}` as any;
        }
      })
      .catch(() => setIsOpenPopUpSignIn(true));
  };

  return (
    <div className={classes.login}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={classes.login__logo}>
          <LunchDiningIcon
            className={classes.login_logo_Image}
            fontSize="large"
          />
          <h2 className={classes.login__logoTitle}>BurgeRoad</h2>
        </div>
      </Link>

      <div className={classes.login__container}>
        <h1 style={{ cursor: "pointer" }}>Sign-in</h1>{" "}
        {isOpenPopUpSignIn && (
          <Modal
            title={"Oppss 😕 😕 😕 😕"}
            subTitle={"Email or password is not valid"}
            onClickConfirm={() => setIsOpenPopUpSignIn(false)}
            isOpen={isOpenPopUpSignIn}
          />
        )}
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={classes.login__signInButton}
            onClick={signIn}
          >
            Sign In
          </button>
          {isOpenPopUpLogin && (
            <Modal
              title={"Oppss 😕 😕 😕 😕"}
              subTitle={"Email or password is incorrect"}
              onClickConfirm={() => setIsOpenPopUpLogin(false)}
              isOpen={isOpenPopUpLogin}
            />
          )}
        </form>
        <p>
          By signing-in you agree to our Website Conditions of Use & Sale.
          Please see our Privacy Notice.
        </p>
        <button className={classes.login__registerButton} onClick={register}>
          Create your BurgeRoad Account
        </button>
      </div>
    </div>
  );
};

export default Login;
