import React, { useState } from "react";
import { useStyles } from "./sidebar.style";
import SearchBurger from "../SearchBurger";
import ListBurgerResult from "../ListBurgerResult/ListBurgerResult";

interface ISideBar {
  mapRef: any;
  setDataToDisplay: Function;
  dataToDisplay: any;
  setIsLoading: Function;
  setActiveMarker: Function;
}
const SideBar = ({
  mapRef,
  setDataToDisplay,
  dataToDisplay,
  setIsLoading,
  setActiveMarker,
}: ISideBar) => {
  const classes = useStyles();

  return (
    <div style={{ position: "absolute" }}>
      <SearchBurger
        mapRef={mapRef}
        setDateToDisplay={setDataToDisplay}
        setIsLoading={setIsLoading}
      />
      <ListBurgerResult
        setActiveMarker={setActiveMarker}
        mapRef={mapRef}
        dataToDisplay={dataToDisplay}
      />
    </div>
  );
};

export default SideBar;
