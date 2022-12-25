import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import CircularProgress from "@mui/material/CircularProgress";
import { useStyles } from "./toolbar.style";
import { Autocomplete } from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import axios from "axios";
import { Tooltip } from "@mui/material";
import "@reach/combobox/styles.css";
import { getBurgerResultFromServer } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { FavoritesContext } from "../context/FavContext";
import {
  getUserFromLocalStorage,
  removeUserToLocalStorage,
} from "../Login/UserManager";
import ListFavorites from "../ListFavorites/ListFavorites";
import e from "express";

interface IToolBar {
  mapRef: any;
  setIsLoading: Function;
  setDateToDisplay: Function;
  distance?: any;
  setDistance?: Function;
  duration?: any;
  setDuration?: Function;
}

const ToolBar = ({
  mapRef,
  setDateToDisplay,
  setIsLoading,
  duration,
  setDuration,
  setDistance,
  distance,
}: IToolBar) => {
  const classes = useStyles();
  const [dataFromApi, setDataFromApi] = useState<any>();
  const user = getUserFromLocalStorage();
  const history = useHistory();
  /**@type React.MutableRefObject<HTMLInputElement> **/
  const inputRef = useRef();
  // @ts-ignore
  const favorites = useContext(FavoritesContext).favorites;
  const loadingContext = useContext(FavoritesContext).loadingContext;
  const [defaultCenter, setDefaultCenter] = useState<any>();
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
    let currentDefaultCenter;
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        currentDefaultCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setDefaultCenter(currentDefaultCenter);

        const lat = currentDefaultCenter.lat;
        const lng = currentDefaultCenter.lng;
        mapRef?.current?.panTo({ lat, lng });
        mapRef?.current?.setZoom(12);

        const API = `${process.env.REACT_APP_BACKEND}/getAddressByCoordinate`;
        await axios.get(API, { params: { lat, lng } }).then((res) => {
          if (res.data.status === "OK") {
            console.log("res.data", res.data.results[0].formatted_address);
            // @ts-ignore
            inputRef.current.value = res.data.results[0].formatted_address;
            setValue(res.data.results[0].formatted_address);
          }
        });
      });

      setIsLoading(false);
    }

    return defaultCenter;
  };

  const panTo = useCallback(({ lat, lng }: any) => {
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(15);
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (inputRef?.current?.value !== "") {
      // @ts-ignore
      setValue(inputRef?.current?.value as string);
    } else {
      setValue("");
    }
    // @ts-ignore
  }, [inputRef?.current?.value]);

  const handleOnClick = () => {
    // @ts-ignore
    const address = inputRef?.current?.value;
    setValue(address ?? "");
  };

  const handleInput = async () => {
    // @ts-ignore
    if (inputRef.current !== undefined && (inputRef?.current.value as any)) {
      // @ts-ignore
      const address = inputRef.current.value;
      const result = await getGeocode({ address });
      setValue(address);
      const { lat, lng } = getLatLng(result?.[0]);
      panTo({ lat, lng });
      await getBurgerResultFromServer({
        mapRef,
        setIsLoading,
        setDateToDisplay,
        token: undefined,
        setDataFromApi,
      });
    }
  };

  return (
    <div className={classes.header}>
      <div
        ref={ref}
        style={{
          position: "fixed",
          display: "flex",
          flex: "1",
          margin: "0.85vh 0 0 5.11vh",
          right: "8vw",
          top: "2.04vh",
        }}
      ></div>

      <div className={classes.header_logo}>
        <LunchDiningIcon
          className={classes.header_logoImage}
          fontSize="large"
        />
        <h2 className={classes.header_logoTitle}>BurgeRoad</h2>
      </div>

      <div className={classes.header_search}>
        <Autocomplete className={classes.header_combo}>
          <input
            style={{
              width: "110vh",
              textAlign: "center",
              height: "2.00vh",
              padding: "2.72vh",
              marginLeft: "-50vh",
              border: "none",
              display: "flex",
              flex: "1",
              borderRadius: "1.7vh",
            }}
            ref={inputRef as any}
            type={"text"}
            onChange={(e) => setValue(e.target.value)}
            onClick={handleOnClick}
          />
        </Autocomplete>
        <div hidden={Boolean(!value)} onClick={handleInput}>
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
          <span className={classes.nav_itemLineOne}>
            {" "}
            {user ? `Hello ${user?.email?.split?.("@")?.[0]}` : `Hello Guest`}
          </span>
          <span
            className={classes.nav_itemLineTwo}
            onClick={() => {
              if (!user) {
                history.push("/login");
              } else {
                removeUserToLocalStorage();
                (window.location as any) = process.env.REACT_APP_URL;
              }
            }}
          >
            {" "}
            {user ? `Log Out` : `Sign In`}
          </span>{" "}
        </div>
        {/*TODO refactor this*/}
        {user ? (
          <ListFavorites
            mapRef={mapRef}
            distance={distance}
            setDistance={setDistance}
            duration={duration}
            setDuration={setDuration}
            getMyLocation={getMyLocation}
          >
            <div className={classes.nav_itemStar}>
              {loadingContext[0] ? (
                <CircularProgress size={20} />
              ) : (
                <StarBorderIcon
                  className={classes.nav_itemStar}
                  fontSize="medium"
                />
              )}
              <span className={classes.nav_itemLineTwo}>
                {favorites?.length}
              </span>
            </div>
          </ListFavorites>
        ) : (
          <div className={classes.nav_itemStar}>
            <StarBorderIcon
              className={classes.nav_itemStar}
              fontSize="medium"
            />
            <span className={classes.nav_itemLineTwo}>{favorites.length}</span>
          </div>
        )}
        <div className={classes.nav_about}>
          <span
            className={classes.nav_itemLineOne}
            onClick={() => history.push("/aboutUs")}
          >
            About
          </span>
          <span
            className={classes.nav_itemLineTwo}
            onClick={() => history.push("/aboutUs")}
          >
            Us
          </span>
        </div>
      </div>
    </div>
  );
};
export default ToolBar;
