import React from "react";
import Card from "../Card/Card";

interface IFavorite {
  favor: any;
  mapRef: any;
  distance?: any;
  setDistance?: Function;
  duration?: any;
  setDuration?: Function;
  getMyLocation?: Function;
}
const Favorite = ({
  favor,
  mapRef,
  setDuration,
  duration,
  setDistance,
  distance,
  getMyLocation,
}: IFavorite) => {
  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <Card
          map={mapRef}
          burger={favor}
          handleOnClick={() => null}
          isListFavorites={true}
          distance={distance}
          setDistance={setDistance}
          duration={duration}
          setDuration={setDuration}
          getMyLocation={getMyLocation}
        />
      </div>
    </>
  );
};

export default Favorite;
