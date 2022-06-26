import React, { useContext } from "react";
import { useStyles } from "./Card.style";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import { FavoritesContext } from "../context/FavContext";

interface ICard {
  burger: any;
  handleOnClick: Function;
}

const Card = ({ burger, handleOnClick }: ICard) => {
  const { favoritesIds, onFavorite, onUnFavorite } = useContext(FavoritesContext);
  const classes = useStyles();


  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        position: "relative",
        marginLeft: "0rem",
        cursor: "pointer",
        border: "0.1px solid lightgray",
      }}
    >
      <div style={{ marginLeft: "0.5vh", marginTop: "-0.5vh", display: "flex", flex: "1" }}>
        {favoritesIds.includes(burger.place_id) ? (
          <IconButton onClick={() => onUnFavorite(burger.place_id)} >
            <StarIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => onFavorite(burger)}>
            <StarBorderIcon />
          </IconButton>
        )}
      </div>
      <div>
        <p
          style={{
            display: "block",
            textAlign: "right",
            fontSize: "14px",
            fontWeight: "bold",
            direction: "rtl",
            color: "black",
            margin: "1vh 7vh 2px 0",
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
            marginBottom: "1.5vh",
            marginRight: "7vh",
          }}
          key={burger?.formatted_address}
        >
          {burger?.formatted_address}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          marginRight: "0rem",
          cursor: "pointer",
        }}
        onClick={() => handleOnClick(burger.place_id)}
      >
        <div
          style={{
            marginLeft: "-5.5vh",
            marginTop: "-0.5vh",
            display: "flex",
            flex: "1",
            justifyContent: "end",
          }}
        >
          <IconButton>
            <AlarmIcon
              className={
                burger?.opening_hours?.open_now ? classes.greenColorClock : classes.redColorClock
              }
            ></AlarmIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
