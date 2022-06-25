import React, { useMemo } from "react";
import { useStyles } from "../SideBar/sidebar.style";
import Card from "../Card/Card";

interface IListBurgerResult {
  dataToDisplay: any;
  mapRef: any;
  setActiveMarker: Function;
}

const ListBurgerResult = ({ dataToDisplay, mapRef, setActiveMarker }: IListBurgerResult) => {
  const classes = useStyles();
  console.log("shahar");
  const handleOnClick = (id: any) => {
    setActiveMarker(id);
    const burgerCardClicked = dataToDisplay.find((data: { place_id: any }) => data.place_id === id);
    const lat = burgerCardClicked?.geometry?.location?.lat;
    const lng = burgerCardClicked?.geometry?.location?.lng;
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(20);
  };

  const listOfBurger = useMemo(() => {
    if (dataToDisplay?.results) {
      const results = dataToDisplay?.results;
      return results.sort((a: any, b: any) => {
        if (isNaN(b?.opening_hours?.open_now)) {
          return -1;
        }
        if (isNaN(a?.opening_hours?.open_now)) {
          return 1;
        }
        return Number(b?.opening_hours?.open_now) - Number(a?.opening_hours?.open_now);
      });
    }
  }, [dataToDisplay]);

  return (
    <div
      style={{
        overflow: "auto",
        position: "relative",
        top: "95px",
        margin: "0 0 0 5px",
        width: "29vw",
        height: "460px",
        border: "0.5px solid #cfbfbf",
      }}
    >
      {listOfBurger?.map((burger: any) => (
        <Card key={burger.place_id} burger={burger} handleOnClick={handleOnClick} />
        if ()
      ))}
    </div>
  );
};
export default ListBurgerResult;
