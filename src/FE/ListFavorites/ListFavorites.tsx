import { Tooltip } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Cabin } from "@mui/icons-material";
import Card from "../Card/Card";
import { FavoritesContext } from "../context/FavContext";
import Favorite from "./Favorite";
import { useStyles } from "./listFavorites.style";

interface IListFavorites {
  children: any;
}
const ListFavorites = ({ children }: IListFavorites) => {
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
            <Favorite favor={favor} />
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
