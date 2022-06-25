import React from "react";
import { useStyles } from "./Card.style";

interface ICard {
  burger: any;
  handleOnClick: Function;
}

const Card = ({ burger, handleOnClick }: ICard) => {
  const classes = useStyles();
  return (
    <div
      style={{ padding: "2px 5px 10px 5px", position: "relative", cursor: "pointer" }}
      onClick={() => handleOnClick(burger.place_id)}
    >
      <p
        style={{
          display: "block",
          textAlign: "center",
          fontSize: "16px",
          direction: "rtl",
          color: "black",
          border: "solid 0.1px lightgray",
          marginBottom: "0px",
        }}
        key={burger?.name}
      >
        {burger?.name}
      </p>
      <p
        style={{
          display: "block",
          textAlign: "center",
          direction: "rtl",
          color: "gray",
          border: "solid 0.1px lightgray",
          marginBottom: "10px",
        }}
        key={burger?.formatted_address}
      >
        {burger?.formatted_address}
      </p>
    </div>
  );
};

export default Card;
