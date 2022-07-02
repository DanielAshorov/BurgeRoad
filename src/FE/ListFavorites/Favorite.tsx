import { Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavContext";
import Card from "../Card/Card";

interface IFavorite {
  favor: any;
}
const Favorite = ({ favor }: IFavorite) => {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Card
          burger={favor}
          handleOnClick={() => alert("List")}
          isListFavorites={true}
        />
      </div>
    </>
  );
};

export default Favorite;
