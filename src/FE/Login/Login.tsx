import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { auth } from "../../BE/Firebase";
import { useStyles } from "../Login/Login.style";
import { setUserToLocalStorage } from "./UserManager";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const classes = useStyles();

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const email = user?.email ?? "";
      setUserToLocalStorage(email, uid);
    } else {
      removeUserToLocalStorage()
    }
  });

  const signIn = (e: any) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth: any) => {
        history.push("/");
      })
      .catch((error: any) => alert(error.message));
  };

  const register = (e: any) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth: any) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error: any) => alert(error.message));
  };

  return (
    <div className={classes.login}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={classes.login__logo}>
          <LunchDiningIcon className={classes.login_logo_Image} fontSize="large"/>
          <h2 className={classes.login__logoTitle}>BurgeRoad</h2>
        </div>
      </Link>

      <div className={classes.login__container}>
        <h1>Sign-in</h1>{" "}
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className={classes.login__signInButton} onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to our Website Conditions of Use & Sale. Please see our Privacy Notice.
        </p>
        <button className={classes.login__registerButton} onClick={register}>
          Create your BurgeRoad Account
        </button>
      </div>
    </div>
  );
};

export default Login;

function removeUserToLocalStorage() {
  throw new Error("Function not implemented.");
}
