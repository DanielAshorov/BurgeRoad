const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.options(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

const port = 4000;
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

app.get("/getAddressByCoordinate", (require, response) => {
  const lat = require.query.lat;
  const lng = require.query.lng;
  let x = encodeURI(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAgBaMN1s9eXJcarNlfReY5eeNtyS0uk1k`
  );
  axios.get(x).then((res) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    console.info("getAddressByCoordinate");
    response.send(res.data);
  });
});

app.get("/getBurgerPoint", (require, response) => {
  const burger = "Hamburger";

  let x = encodeURI(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${require.query.lat},${require.query.lng}&radius=1000&query=${burger}&sensor=true&key=AIzaSyAgBaMN1s9eXJcarNlfReY5eeNtyS0uk1k`
  );
  if (require?.query?.token) {
    x = encodeURI(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?&pagetoken=${require.query.token}&location=${require.query?.lat},${require.query?.lng}&radius=1000&query=${burger}&sensor=true&key=AIzaSyAgBaMN1s9eXJcarNlfReY5eeNtyS0uk1k`
    );
  }
  axios.get(x).then((res) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    console.info("getBurgerPoint");
    response.send(res.data);
  });
});

app.get("/health", (require, response) => {
  response.status(200).send("OK");
});
