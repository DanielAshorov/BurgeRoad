import axios from "axios";

export const getBurgerResultFromServer = async ({
  mapRef,
  setIsLoading,
  setDateToDisplay,
  token,
  setDataFromApi,
}: {
  mapRef: any;
  setIsLoading: Function;
  setDateToDisplay: Function;
  token?: string;
  setDataFromApi?: Function;
}) => {
  const lat = mapRef.current.center.lat();
  const lng = mapRef.current.center.lng();
  setIsLoading(true);
  const API = `${process.env.REACT_APP_BACKEND}/getBurgerPoint`;
  if (token) {
    await axios.get(API, { params: { lat, lng, token } }).then((res) => {
      if (res.data.status === "OK") {
        if (setDataFromApi) setDataFromApi(res.data);
        setDateToDisplay(res.data);
        setIsLoading(false);
      }
    });
  } else {
    await axios.get(API, { params: { lat, lng } }).then((res) => {
      if (res.data.status === "OK") {
        if (setDataFromApi) setDataFromApi(res.data);
        setDateToDisplay(res?.data);
        setIsLoading(false);
        console.log("Data from server: ", res.data);
      }
    });
  }
};

export const userSecurityByDate = (date: Date, hours: number) => {
  console.log("new Date: ", new Date());
  const dateUserAfterHours = new Date(date.getTime() + hours * 60 * 60 * 1000);
  return new Date().getTime() < dateUserAfterHours.getTime();
};
