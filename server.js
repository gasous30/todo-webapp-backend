require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected"));

app.use(cors());
app.use(express.json());

const taskroute = require("./routes/taskroute");
app.use("/todoweb/task", taskroute);

const eventroute = require("./routes/eventroute");
app.use("/todoweb/event", eventroute);

const projectroute = require("./routes/projectroute");
app.use("/todoweb/project", projectroute);

const watchlistroute = require("./routes/watchlistroute");
app.use("/todoweb/watchlist", watchlistroute);

// Listen to server
app.listen(3001, () => console.log("Server Started"));
