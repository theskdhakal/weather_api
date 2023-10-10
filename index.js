import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
const api_key = "9eb1403073a634730b9ddd04a233631c";

let result;
let lon;
let lat;
app.get("/", (req, res) => {
  res.render("index.ejs", { content: result });
});

app.post("/", async (req, res) => {
  try {
    const coordinate = await axios.post(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        req.body.location
      )}&key=AIzaSyD2kcOsVGJVensyJiESHJWULOPhu-qV-lU`
    );

    const location = coordinate.data.results[0].geometry.location;
    lat = location.lat;
    lon = location.lng;

    console.log(lat, lon);

    const response = await axios.post(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    );
    result = response.data;
    console.log(result);

    res.render("index.ejs", { content: result });
  } catch (error) {
    res.render("index.ejs", { content: error });
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
