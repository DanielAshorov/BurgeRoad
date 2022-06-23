import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  header: {
    height: "44px",
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
    margin: "0 15px",
  },

  header_logoImage: {
    display: "flex",
    textDecoration: "none",
    border: "0",
  },

  header_logoTitle: {
    display: "flex",
    margin: "0 0 0 10px",
    textDecoration: "none",
    border: "0",
    color: "white",
  },

  header_search: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    borderRadius: "24px",
    margin: "0 20px",
  },

  header_searchInput: {
    display: "flex",
    flex: "1",
    height: "12px",
    padding: "16px",
    marginLeft: "-55px",
    border: "none",
    minWidth: "120vh",
    maxWidth: "5000vh",
    backgroundColor: "lightgray",
  },

  comboboxOption: {
    direction: "rtl",
    zIndex: "300",
  },

  header_searchIcon: {
    top: "3px",
    position: "relative",
    right: "22px",
    minHeight: "31px ",
    backgroundColor: "#e4e2de",
    cursor: "pointer",
  },
  
  header_locationIcon: {
    top: "3px",
    position: "relative",
    left: "7px",
    minHeight: "31px",
    color: "#fff",
    cursor: "pointer",
  },
  
  header_nav: {
    display: "flex",
    flex: "1",
    justifyContent: "space-evenly",
  },

  nav_item: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px",
    marginRight: "10px",
    color: "white",
  },

  nav_itemLineOne: {
    fontSize: "10px",
    marginLeft: "4px",
  },

  nav_itemLineTwo: {
    fontSize: "11px",
    fontWeight: "800",
    marginLeft: "5px",
  },

  nav_itemStar: {
    display: "flex",
    alignItems: "center",
    color: "white",
    marginRight: " 0px",
    marginLeft: "0px",
  },

  nav_starCount: {
    marginLeft: "10px",
    marginRight: "3px",
  },

  nav_about: {
    marginLeft: "14px",
    marginRight: "18px",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
}));
