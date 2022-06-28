import React, { useMemo } from "react";
import { useStyles } from "../SideBar/sidebar.style";
import Card from "../Card/Card";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Tooltip } from "@mui/material";
import { getBurgerResultFromServer } from "../utils/utils";

interface IListBurgerResult {
  dataToDisplay: any;
  mapRef: any;
  setActiveMarker: Function;
  handleToGetMoreResult?: Function;
  setIsLoading: Function;
  setDateToDisplay: Function;
}

const ListBurgerResult = ({
  dataToDisplay,
  setIsLoading,
  mapRef,
  setActiveMarker,
  setDateToDisplay,
}: IListBurgerResult) => {
  const classes = useStyles();
  const handleOnClick = (id: any) => {
    setActiveMarker(id);
    const burgerCardClicked = dataToDisplay?.results?.find(
      (data: { place_id: any }) => data.place_id === id
    );
    const lat = burgerCardClicked?.geometry?.location?.lat;
    const lng = burgerCardClicked?.geometry?.location?.lng;
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(15);
  };

  const handleClickGetMoreResult = async () => {
    if (dataToDisplay?.next_page_token) {
      await getBurgerResultFromServer({
        mapRef,
        setIsLoading,
        setDateToDisplay,
        token: dataToDisplay?.next_page_token,
        setDataFromApi: undefined,
      });
    }
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
        margin: "0 0 0 0",
        height: "92.5vh",
        minWidth: "64vh",
        maxWidth: "64vh",
        border: "0.5px #cfbfbf",
      }}
    >
      {listOfBurger?.map((burger: any) => (
        <Card key={burger.place_id} burger={burger} handleOnClick={handleOnClick} />
      ))}
      {dataToDisplay?.next_page_token && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => handleClickGetMoreResult()}
        >
          <Tooltip title={"Refresh"}>
            <IconButton size={"large"} style={{ width: "100%", borderRadius: "initial" }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
};
export default ListBurgerResult;
