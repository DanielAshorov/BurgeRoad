import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { useStyles } from "../ToolBar/toolbar.style";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { getBurgerResultFromServer } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { FavoritesContext } from "../context/FavContext";

interface IToolBar {
  mapRef: any;
  setIsLoading: Function;
  setDateToDisplay: Function;
}

const ToolBar = ({ mapRef, setDateToDisplay, setIsLoading }: IToolBar) => {
  const classes = useStyles();
  const [dataFromApi, setDataFromApi] = useState<any>();
  const [currentLocation, setCurrentLocation] = useState<string>();
  const history = useHistory();
  const favorites = useContext(FavoritesContext).favorites;

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lng(): number {
          return 43.654;
        },
        lat(): number {
          return -79.3;
        },
        types: ["(cities)"],
        componentRestrictions: { country: "IL" },
      } as any,
      radius: 1,
    },
  });

  const getMyLocation = async () => {
    setIsLoading(true);
    let defaultCenter;
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("position", position);
        defaultCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const lat = defaultCenter.lat;
        const lng = defaultCenter.lng;
        mapRef?.current?.panTo({ lat, lng });
        mapRef?.current?.setZoom(15);

        const API = "http://localhost:4000/getAddressByCoordinate";
        await axios.get(API, { params: { lat, lng } }).then((res) => {
          if (res.data.status === "OK") {
            console.log("res.data", res.data.results[0].formatted_address);
            setValue(res.data.results[0].formatted_address);
          }
        });
      });
      setIsLoading(false);
    }
    console.log("defaultCenter", defaultCenter);
    return defaultCenter;
  };

  const panTo = useCallback(({ lat, lng }: any) => {
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(15);
  }, []);


  return (
    <div className={classes.header}>
      <div
        ref={ref}
        style={{
          position: "fixed",
          display: "flex",
          flex: "1",
          margin: "5px 0 0 30px",
          right: "8vw",
          top: "12px",
        }}
      ></div>

      <div className={classes.header_logo}>
        <LunchDiningIcon className={classes.header_logoImage} fontSize="large" />
        <h2 className={classes.header_logoTitle}>BurgeRoad</h2>
      </div>

      <div className={classes.header_search}>
        <Combobox
          onSelect={async (address) => {
            try {
              const result = await getGeocode({ address });
              const { lat, lng } = getLatLng(result?.[0]);
              panTo({ lat, lng });
              setValue(address);
              clearSuggestions();
            } catch (err) {
              console.warn("can't find address");
            }
          }}
        >
          <ComboboxInput
            value={value}
            className={classes.header_searchInput}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder={"Enter an address"}
          />
          <ComboboxPopover>
            {" "}
            {status === "OK" &&
              data.map(({ description }, id) => (
                <ComboboxOption className={classes.comboboxOption} key={id} value={description} />
              ))}
          </ComboboxPopover>
        </Combobox>
        <div
          hidden={Boolean(!value)}
          onClick={() =>
            getBurgerResultFromServer({
              mapRef,
              setIsLoading,
              setDateToDisplay,
              token: undefined,
              setDataFromApi,
            })
          }
        >
          <SearchIcon className={classes.header_searchIcon} />
        </div>
        <Tooltip title={"Find burgers in my area"}>
          <div onClick={() => getMyLocation()}>
            <LocationOnIcon className={classes.header_locationIcon} />
          </div>
        </Tooltip>
      </div>

      <div className={classes.header_nav}>
        <div className={classes.nav_item}>
          <span className={classes.nav_itemLineOne}>Hello Guest</span>
          <span className={classes.nav_itemLineTwo} onClick={() => {history.push("/login")}}>Sign In</span>
        </div>
        <div className={classes.nav_item}>
          <span className={classes.nav_itemLineOne}>Your</span>
          <span className={classes.nav_itemLineTwo}>Favorites</span>
        </div>
        <div className={classes.nav_itemStar}>
          <StarBorderIcon className={classes.nav_itemStar} fontSize="medium" />
          <span className={classes.nav_itemLineTwo}>{favorites.length}</span>
        </div>
        <div className={classes.nav_about}>
          <span className={classes.nav_itemLineOne}>About</span>
          <span className={classes.nav_itemLineTwo}>Us</span>
        </div>
      </div>
    </div>
  );
};
export default ToolBar;
