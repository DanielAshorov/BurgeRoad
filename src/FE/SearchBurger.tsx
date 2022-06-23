import React, { useCallback, useEffect, useState } from "react";
import { useStyles } from "./SideBar/sidebar.style";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import "@reach/combobox/styles.css";
import useOnclickOutside from "react-cool-onclickoutside";
import axios from "axios";

interface ISearchBurger {
  mapRef: any;
  setDateToDisplay: Function;
  setIsLoading: Function;
}

const SearchBurger = ({ mapRef, setDateToDisplay, setIsLoading }: ISearchBurger) => {
  const classes = useStyles();

  return (
    <div style={{ padding: "5px 20px 0 5px", position: "absolute" }}>
      <div className={classes.border}>
        <div
          style={{
            direction: "rtl",
            border: "0.5px solid #cfbfbf",
            height: "75px",
            top: "12px",
            left: "12px",
            position: "relative",
            width: "27vw",
          }}
        >
          <select
            v-model="radius"
            style={{
              direction: "rtl",
              position: "relative",
              top: "8px",
              right: "4vw",
              width: "90px",
              backgroundColor: "#F2EBE9",
            }}
          >
            <option value="10KM">10KM</option>
            <option value="20KM">20KM</option>
          </select>
          <select
            v-model="type"
            style={{
              direction: "rtl",
              position: "relative",
              top: "8px",
              right: "8vw",
              width: "60px !important",
              backgroundColor: "#F2EBE9",
            }}
          >
            <option>Hamburger</option>
            <option>Vegan Hamburger</option>
          </select>
          {/*<button*/}
          {/*  style={{*/}
          {/*    backgroundColor: "#FFA8A8",*/}
          {/*    height: "25px",*/}
          {/*    borderRadius: "5px",*/}
          {/*    border: "none",*/}
          {/*    position: "relative",*/}
          {/*    top: "53px",*/}
          {/*    right: "10vw",*/}
          {/*    cursor: "pointer",*/}
          {/*  }}*/}
          {/*  onClick={() => {*/}
          {/*    handleOnChangeInput();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Find Closest Hamburger Places*/}
          {/*</button>*/}
          {/*<button*/}
          {/*  style={{*/}
          {/*    backgroundColor: "#FFA8A8",*/}
          {/*    height: "25px",*/}
          {/*    borderRadius: "5px",*/}
          {/*    border: "none",*/}
          {/*    position: "relative",*/}
          {/*    top: "90px",*/}
          {/*    right: "1.5vw",*/}
          {/*    cursor: "pointer",*/}
          {/*  }}*/}
          {/*  hidden={!dataFromApi?.next_page_token}*/}
          {/*  onClick={() => handleOnChangeInput(dataFromApi.next_page_token)}*/}
          {/*>*/}
          {/*  {" "}*/}
          {/*  Get More Result*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
};

export default SearchBurger;
