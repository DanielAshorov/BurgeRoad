import React, { useRef, useState } from "react";
import MapContainer from "../MapContainer";
import SideBar from "../SideBar/SideBar";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Login from "../Login/Login";
import "../../index.css";
import { FavoritesContextProvider } from '../context/FavContext';

import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import ToolBar from "../ToolBar/ToolBar";

const App = () => {
  const mapRef = useRef(null);
  const [dataToDisplay, setDataToDisplay] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<any>();

  return (
    <FavoritesContextProvider>
      <Router>
        <Switch>
          <Route path="/" component={App} exact>
            <ToolBar
              mapRef={mapRef}
              setDateToDisplay={setDataToDisplay}
              setIsLoading={setIsLoading}
            />
            <div id="grid">
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
              <LoadingIndicator isLoading={isLoading} />
            </div>
          </Route>
          <Route path="/login" component={Login} exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </FavoritesContextProvider>
  );
};

export default App;
