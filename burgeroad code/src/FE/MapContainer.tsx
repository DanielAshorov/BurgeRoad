import React, { useCallback, useEffect, useMemo } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface IMapContainer {
  mapRef: any;
  dataToDisplay: any;
  activeMarker: any;
  setActiveMarker: Function;
  distance?: any;
  setDistance?: Function;
  duration?: any;
  setDuration?: Function;
}

const MapContainer = ({
  mapRef,
  dataToDisplay,
  setActiveMarker,
  activeMarker,
  duration,
  setDuration,
  setDistance,
  distance,
}: IMapContainer) => {
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const mapStyles = {
    height: "92.5vh",
    width: "100%",
  };

  let defaultCenter = {
    lat: 32.3976081,
    lng: 32.0047745,
  };

  const getDefaultCenter = useMemo(() => {
    if (dataToDisplay) {
      defaultCenter = {
        lat: dataToDisplay?.results?.[0].geometry.location.lat,
        lng: dataToDisplay?.results?.[0].geometry.location.lng,
      };
    }
    return defaultCenter;
  }, [dataToDisplay]);

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        defaultCenter = {
          lat: position.coords.latitude,
          lng: position?.coords.longitude,
        };
      });
    }
  }, [navigator]);
  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      <div></div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={6}
        center={getDefaultCenter}
        onLoad={onMapLoad}
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        }}
      >
        {" "}
        {dataToDisplay &&
          dataToDisplay?.results?.map((m: any) => {
            return (
              <Marker
                key={m.place_id}
                position={{
                  lat: m.geometry.location?.lat,
                  lng: m.geometry.location?.lng,
                }}
                onClick={() => handleActiveMarker(m.place_id)}
              >
                {activeMarker === m.place_id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "13px" }}>
                        {m.name}
                      </div>
                      <div>{m.formatted_address.split(",")?.[0]}</div>
                      <div>{m.formatted_address.split(",")?.[1]}</div>
                      <div>{m.formatted_address.split(",")?.[2]}</div>
                      <div style={{ textAlign: "right" }}> ❤️ {m.rating}</div>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            );
          })}
        {distance && <DirectionsRenderer directions={distance} />}
      </GoogleMap>
    </>
  );
};

export default MapContainer;
