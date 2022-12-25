import React, { useContext, useRef, useState } from "react";
import { useStyles } from "./Card.style";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Tooltip } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import Grow from "@mui/material/Grow";
import StarIcon from "@mui/icons-material/Star";
import { FavoritesContext } from "../context/FavContext";
import { getUserFromLocalStorage } from "../Login/UserManager";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import axios from "axios";

interface ICard {
  burger: any;
  handleOnClick: Function;
  isListFavorites?: boolean;
  map?: any;
  distance?: any;
  setDistance?: Function;
  duration?: any;
  setDuration?: Function;
  getMyLocation?: Function;
}

const Card = ({
  burger,
  handleOnClick,
  isListFavorites,
  map,
  setDuration,
  duration,
  setDistance,
  distance,
  getMyLocation,
}: ICard) => {
  const { favoritesIds, onFavorite, onUnFavorite } =
    useContext(FavoritesContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = getUserFromLocalStorage();
  const options = ["Navigate to the burger"];
  const calcRoute = async () => {
    const x = new google.maps.DirectionsService();
    // @ts-ignore
    const myCurrentLocation = getMyLocation();
    Promise.all([myCurrentLocation]).then(async (data) => {
      const result = await x.route({
        travelMode: google.maps.TravelMode.DRIVING,
        origin: new google.maps.LatLng(data?.[0]?.lat, data?.[0]?.lng),
        destination: new google.maps.LatLng(
          burger?.geometry?.location?.lat,
          burger?.geometry?.location?.lng
        ),
      });
      // @ts-ignore
      setDistance(result ?? "");
      // @ts-ignore
      setDuration(result.routes[0]?.legs[0]?.duration?.text ?? "");
    });
  };

  return (
    <Grow in={Boolean(burger)} timeout={2500}>
      <div
        style={{
          display: "flex",
          flex: "1",
          position: "relative",
          marginLeft: "0rem",
          cursor: "pointer",
          border: "0.1px solid lightgray",
        }}
        onClick={() => handleOnClick(burger.place_id)}
      >
        <div
          style={{
            marginLeft: "0.5vh",
            marginTop: "-0.5vh",
            display: "flex",
            flex: "1",
          }}
        >
          {favoritesIds.includes(burger.place_id) ? (
            <Tooltip title={"Remove place from favorite list"}>
              <IconButton onClick={(e) => onUnFavorite(e, burger.place_id)}>
                <StarIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title={
                user
                  ? "Add place to your favorite list"
                  : "You need to login to use favorite list feature"
              }
            >
              <div style={{ display: "flex" }}>
                <IconButton
                  disabled={user === null}
                  onClick={(e) => onFavorite(e, burger)}
                >
                  <StarBorderIcon />
                </IconButton>
              </div>
            </Tooltip>
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
          {!isListFavorites && (
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
                    burger?.opening_hours?.open_now
                      ? classes.greenColorClock
                      : classes.redColorClock
                  }
                ></AlarmIcon>
              </IconButton>
            </div>
          )}
          {isListFavorites && (
            <div
              style={{
                marginLeft: "-5.5vh",
                marginTop: "-0.5vh",
                display: "flex",
                flex: "1",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={() => calcRoute()}>
                <AssistantDirectionIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </Grow>
  );
};

export default Card;
