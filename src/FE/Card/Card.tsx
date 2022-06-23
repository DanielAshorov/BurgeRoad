import React from "react";
import { useStyles } from "./Card.style";
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface ICard {
  burger: any;
  handleOnClick: Function;
}
    //<StarBorderIcon className={classes.starBorderIcon} thickness={2} size={"10rem"} />

const Card = ({ burger, handleOnClick }: ICard) => {
  const classes = useStyles();
  return (
    <div
      style={{ padding: "1vh", position: "relative", cursor: "pointer", border: "0.1px solid lightgray" }}
      onClick={() => handleOnClick(burger.place_id)} 
    >
      <p
        style={{
          display: "block",
          textAlign: "right",
          fontSize: "14px",
          fontWeight: "bold",
          direction: "rtl",
          color: "black",
          marginBottom: "0px",
          marginRight: "7vh",
        }} 
        key={burger?.name}
      >
        {burger?.name}
      </p>
      <p
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "right",
          direction: "rtl",
          color: "gray",
          marginBottom: "10px",
          marginRight: "7vh",
        }}

        key={burger?.formatted_address}
      >
        {burger?.formatted_address}
      </p>
    </div>
  );
};

export default Card;
