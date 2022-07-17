import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  header: {
    height: "7.5vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#232021",
    position: "relative",
    top: "0",
    zIndex: "100",
  },

  header_logo: {
    display: "flex",
    flex: "1",
    color: "#ff9f00",
    margin: "0 2.55vh",
  },

  header_logoImage: {
    display: "flex",
    textDecoration: "none",
    border: "0",
  },

  header_logoTitle: {
    display: "flex",
    flex: "1",
    margin: "0 0 0 1.7vh",
    textDecoration: "none",
    border: "0",
    color: "white",
  },

  header_search: {
    display: "flex",
    flex: "1",
    width: "34vh",
    alignItems: "center",
    margin: "0 3.4vh",
  },
  header_searchInput: {
    display: "flex",
    flex: "1",
    height: "2.04vh",
    padding: "2.72vh",
    marginLeft: "-2vh",
    border: "none",
    minWidth: "120vh",
    maxWidth: "5000vh",
    backgroundColor: "lightgray",
  },

  header_combo: {
    display: "flex",
    flex: "1",
  },

  header_searchIcon: {
    top: "0.34",
    position: "relative",
    right: "3.74vh",
    minHeight: "4.77vh ",
    backgroundColor: "#e4e2de",
    cursor: "pointer",
    borderRadius: "10000px",
  },

  header_locationIcon: {
    top: "0.5vh",
    position: "relative",
    left: "1.2vh",
    minHeight: "5.28vh",
    color: "#fff",
    cursor: "pointer",
  },

  header_nav: {
    display: "flex",
    justifyContent: "space-evenly",
  },

  nav_item: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    marginLeft: "1.36vh",
    marginRight: "1.7vh",
    color: "white",
  },

  nav_itemLineOne: {
    fontSize: "1.7vh",
    marginLeft: "0.68vh",
    cursor: "pointer",
  },

  nav_itemLineTwo: {
    fontSize: "1.87vh",
    fontWeight: "800",
    marginLeft: "0.85vh",
    cursor: "pointer",
  },

  nav_itemStar: {
    display: "flex",
    alignItems: "center",
    color: "white",
    marginRight: " 0px",
    marginLeft: "0px",
    cursor: "pointer",
  },

  nav_starCount: {
    marginLeft: "1.7vh",
    marginRight: "0.51vh",
    cursor: "pointer",
  },

  nav_about: {
    marginLeft: "2.38vh",
    marginRight: "3.06vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
}));
