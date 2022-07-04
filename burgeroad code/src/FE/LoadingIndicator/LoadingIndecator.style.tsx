import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
    },
  },
  loadingRoot: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
  loadingCircle: {
    position: "relative",
    color: "white",
  },
  LogoSvg: {
    height: "7rem",
    width: "150px",
    position: "absolute",
    opacity: "0.6",
  },
}));
