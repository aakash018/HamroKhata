//ENV INIT
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Router Init
const indexRouter = require("./routers/index");
const infoTableRouter = require("./routers/infoTable");

// SetUP
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// DataBase Connect
mongoose.connect("mongodb://localhost/HamroKhata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To DB"));

// Router INIT
app.use("/", indexRouter);
app.use("/infoTable", infoTableRouter);

// Server Listen
app.listen(process.env.PORT || 3000);
