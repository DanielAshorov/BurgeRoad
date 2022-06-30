import React, { useRef, useState } from "react";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Login from "../Login/Login";
import "../../index.css";
import { FavoritesContextProvider } from "../context/FavContext";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useStyles } from "./app.style";
import AppView from "../AppView";
import { getUserFromLocalStorage } from "../Login/UserManager";
import AboutUs from "../AboutUs/AboutUs";

interface IRoutes {
  mapRef: any;
  setDataToDisplay: Function;
  dataToDisplay: any;
  setIsLoading: Function;
  setActiveMarker: Function;
  activeMarker: any;
  handleToGetMoreResult?: Function;
}

const Routes = ({
  dataToDisplay,
  setIsLoading,
  mapRef,
  setDataToDisplay,
  handleToGetMoreResult,
  setActiveMarker,
  activeMarker,
}: IRoutes) => {
  const user = getUserFromLocalStorage();
  console.log("this is update");
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={`/`} component={AppView} exact>
            <AppView
              dataToDisplay={dataToDisplay}
              setIsLoading={setIsLoading}
              setDataToDisplay={setDataToDisplay}
              setActiveMarker={setActiveMarker}
              mapRef={mapRef}
              activeMarker={activeMarker}
              handleToGetMoreResult={handleToGetMoreResult}
            />
          </Route>
          <Route path={`/login`} component={Login} />
          <Route path={`/aboutUS`} component={AboutUs} />
          <Route path={user ? `/user` : `/login`} component={AppView}>
            <AppView
              dataToDisplay={dataToDisplay}
              setIsLoading={setIsLoading}
              setDataToDisplay={setDataToDisplay}
              setActiveMarker={setActiveMarker}
              mapRef={mapRef}
              activeMarker={activeMarker}
              handleToGetMoreResult={handleToGetMoreResult}
            />
          </Route>
          <Redirect to={`/`} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  const mapRef = useRef(null);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<any>();
  const classes = useStyles();
  return (
    <FavoritesContextProvider>
      <LoadingIndicator isLoading={isLoading} />
      <Routes
        dataToDisplay={dataToDisplay}
        setIsLoading={setIsLoading}
        setDataToDisplay={setDataToDisplay}
        setActiveMarker={setActiveMarker}
        mapRef={mapRef}
        activeMarker={activeMarker}
      />
    </FavoritesContextProvider>
  );
};

export default App;
