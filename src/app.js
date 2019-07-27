const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

hbs.registerPartials(partialsPath);
//configuring views part for express
app.set("view engine", "hbs");
app.set("views", viewsPath);

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

//configuring static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "About",
    name: "Rajneesh Mishra"
  })
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "Please provide an address"
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rajneesh Mishra"
  })
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This will be filled with help texts",
    name: "Rajneesh Mishra"
  })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help",
    message: "Help content not found",
    name: "Rajneesh Mishra"
  })
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    message: "404! Page not found",
    name: "Rajneesh Mishra"
  })
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
})