import React, { useEffect, useState } from "react";
import { useStyles } from "./App/app.style";
import MapContainer from "./MapContainer";
import SideBar from "./SideBar/SideBar";
import ToolBar from "./ToolBar/ToolBar";
import { useHistory } from "react-router-dom";
import {
  getUserFromLocalStorage,
  removeUserToLocalStorage,
  setUserToLocalStorage,
} from "./Login/UserManager";
import { userSecurityByDate } from "./utils/utils";
import Modal from "./Modal/Modal";

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
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [isUserVerified, setIsUserVerified] = useState<boolean | undefined>(
    undefined
  );
  const handleToClickConfirm = () => {
    removeUserToLocalStorage();
    window.location = process.env.VITE_BASE_URL as any;
    setIsUserVerified(undefined);
  };
  console.log("isUserVerified", isUserVerified);
  console.log(
    ".ENV",
    process.env.VITE_URL_BACKEND,
    process.env.VITE_BASE_URL,
    process.env.VITE_ENV
  );
  useEffect(() => {
    if (user && userSecurityByDate(new Date(user.date), 2)) {
      setUserToLocalStorage(user?.email, user?.uid, new Date());
      history.push(`/user/${user.uid}`);
      setIsUserVerified(true);
    } else if (!user) {
      setIsUserVerified(undefined);
    } else {
      setIsUserVerified(false);
    }
  }, [user]);
  return (
    <>
      {isUserVerified === false && (
        <Modal
          isOpen={isUserVerified === false}
          title={"Oppppss...."}
          subTitle={
            "You have not been active for more than two hours, so you are logged out of your account for security purposes."
          }
          onClickConfirm={handleToClickConfirm}
        />
      )}
      <ToolBar
        distance={distance}
        setDistance={setDistance}
        duration={duration}
        setDuration={setDuration}
        mapRef={mapRef}
        setDateToDisplay={setDataToDisplay}
        setIsLoading={setIsLoading}
      />
      <div className={dataToDisplay ? classes.grid : classes.withOutListResult}>
        <MapContainer
          distance={distance}
          setDistance={setDistance}
          duration={duration}
          setDuration={setDuration}
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
