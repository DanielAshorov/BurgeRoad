import React, { useEffect } from "react";
import { useStyles } from "./App/app.style";
import MapContainer from "./MapContainer";
import SideBar from "./SideBar/SideBar";
import ToolBar from "./ToolBar/ToolBar";
import { useHistory } from "react-router-dom";
import { getUserFromLocalStorage, removeUserToLocalStorage } from "./Login/UserManager";
import { userSecurityByDate } from "./utils/utils";

interface ISideBar {
  mapRef: any;
  setDataToDisplay: Function;
  dataToDisplay: any;
  setIsLoading: Function;
  setActiveMarker: Function;
  activeMarker: any;
  handleToGetMoreResult?: Function;
}
const AppView = ({
  mapRef,
  setDataToDisplay,
  dataToDisplay,
  setIsLoading,
  setActiveMarker,
  activeMarker,
}: ISideBar) => {
  const classes = useStyles();
  const history = useHistory();
  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (user && userSecurityByDate(new Date(user.date), 2)) {
      history.push(`/user/${user.uid}`);
    } else {
      removeUserToLocalStorage();
    }
  }, [user]);

  return (
    <>
      <ToolBar mapRef={mapRef} setDateToDisplay={setDataToDisplay} setIsLoading={setIsLoading} />
      <div className={dataToDisplay ? classes.grid : classes.withOutListResult}>
        <MapContainer
          mapRef={mapRef}
          dataToDisplay={dataToDisplay}
          setActiveMarker={setActiveMarker}
          activeMarker={activeMarker}
        />
        <SideBar
          mapRef={mapRef}
          dataToDisplay={dataToDisplay}
          setDataToDisplay={setDataToDisplay}
          setIsLoading={setIsLoading}
          setActiveMarker={setActiveMarker}
        />
      </div>
    </>
  );
};

export default AppView;
