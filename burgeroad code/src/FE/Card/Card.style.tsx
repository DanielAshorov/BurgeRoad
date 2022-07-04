import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "10rem 10rem 10rem",
    gridGap: "1rem",
  },
  greenColorClock: {
    color: "green",
  },
  redColorClock: {
    color: "red",
  },
}));
