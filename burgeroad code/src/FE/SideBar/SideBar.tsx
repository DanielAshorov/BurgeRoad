import React from "react";
import { useStyles } from "./sidebar.style";
import ListBurgerResult from "../ListBurgerResult/ListBurgerResult";

interface ISideBar {
  mapRef: any;
  setDataToDisplay: Function;
  dataToDisplay: any;
  setIsLoading: Function;
  setActiveMarker: Function;
  handleToGetMoreResult?: Function;
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
      <ListBurgerResult
        setActiveMarker={setActiveMarker}
        mapRef={mapRef}
        dataToDisplay={dataToDisplay}
        setIsLoading={setIsLoading}
        setDateToDisplay={setDataToDisplay}
      />
    </div>
  );
};

export default SideBar;
