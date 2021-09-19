const express = require('express');
const mongoose = require("mongoose");
const { wakeDyno } = require('heroku-keep-awake');
require('dotenv').config();

// Routes Import
const homeRoute = require("./routes/homeRoute");
const newRoute = require("./routes/newRoute");
const saveRoute = require("./routes/saveRoute");
const getBySlugRoute = require("./routes/getBySlugRoute");
const duplicateRoute = require("./routes/duplicateRoute");
const rawRoute = require("./routes/rawRoute");
const createBin = require("./routes/createBin");


// Middlewares
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())




// Keep Heroku Dyno alive
const DYNO_URL = process.env.BASE_URL;
const opts = {
    interval: 25,
    logging: false,
    stopTimes: { start: '18:50', end: '02:00' }
}

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Routes
app.get("/", homeRoute);
app.get("/new", newRoute);
app.post("/save", saveRoute);
app.get("/:slug", getBySlugRoute);
app.get("/:slug/duplicate", duplicateRoute);
app.get("/:slug/raw", rawRoute);
app.post("/create", createBin)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening...")
  wakeDyno(DYNO_URL, opts);
});
