import { Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavContext";
import Favorite from "./Favorite";
import { useStyles } from "./listFavorites.style";

interface IListFavorites {
  children: any;
  mapRef: any;
  distance?: any;
  setDistance?: Function;
  duration?: any;
  setDuration?: Function;
  getMyLocation?: Function;
}
const ListFavorites = ({
  children,
  mapRef,
  setDuration,
  duration,
  setDistance,
  distance,
  getMyLocation,
}: IListFavorites) => {
  const favorites = useContext(FavoritesContext);
  const classes = useStyles();
  return (
    <>
      <Tooltip
        PopperProps={{ disablePortal: true }}
        componentsProps={{
          tooltip: {
            sx: {
              padding: "0px",
              bgcolor: "common.white",
              maxHeight: "50vh",
              overflow: "auto",
              "& .MuiTooltip-arrow": {
                color: "common.white",
              },
            },
          },
        }}
        title={favorites?.favorites.map((favor) => (
          <div style={{ maxHeight: "97.5vh" }}>
            <Favorite
              favor={favor}
              mapRef={mapRef}
              distance={distance}
              setDistance={setDistance}
              duration={duration}
              setDuration={setDuration}
              getMyLocation={getMyLocation}
            />
          </div>
        ))}
        arrow={true}
      >
        {children}
      </Tooltip>
    </>
  );
};

export default ListFavorites;
