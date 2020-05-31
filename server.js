//ENV INIT
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override")

// Router Init
const indexRouter = require("./routers/index");
const infoTableRouter = require("./routers/infoTable");
const auditRouter = require("./routers/audit")

// SetUP
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(methodOverride("_method"))
app.use("/public", express.static('./public/'));

// DataBase Connect
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To DB"));

// Router INIT
app.use("/", indexRouter);
app.use("/infoTable", infoTableRouter);
app.use("/audit", auditRouter);

// Server Listen
app.listen(process.env.PORT || 3000);
