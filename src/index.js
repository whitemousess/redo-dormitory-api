const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const route = require("./routes");
const db = require("./config/db");

db.connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

route(app);

app.listen(1407, () => {
  console.log("server listening on 1407");
});
