import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  login: {
    backgroundColor: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  login__logo: {
    display: "flex",
    margin: "20px 0",
  },

  login_logo_Image: {
    display: "flex",
    alignItems: "center",
    color: "#ff9f00",
    margin: "17.8px 53px",
    marginTop: "20px",
    position: "absolute",
  },

  login__logoTitle: {
    color: "black",
    display:"block", 
    textAlign: "center",
    width: "300px",
    height: "fit-content",
    marginTop: "20px",
  },

  login__container: {
    width: "300px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    border: "1.5px solid lightgray",
    padding: "20px",
  },

  //login__container>h1: {
  // fontWeight: "500",
  //   marginBottom: "20px",
  //},
  
  //login__container>form>h5: {
  //     marginBottom: 5px;
  // },
  //
  // login__container>form>input: {
  //     height: "30px";
  //     marginBottom: "10px";
  //     backgroundColor: "white";
  //     width: "98%";
  // },
  //
  // login__container>p: {
  //     marginTop: "15px",
  //     fontSize: "12px",
  // },

  login__signInButton: {
    background: "#d4b6c0",
    borderRadius: "200px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "30px",
    marginBottom: "20px",
    borderColor: "#a88734 #9c7e31 #846a29",
  },

  login__registerButton: {
    borderRadius: "200px",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "5px",
    borderColor: "darkgray",
  },
}));
