const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongo = require("mongodb").MongoClient;

let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let database = require("./database/db");
const userRoute = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const landingRoute = require("./routes/landingRoutes");
//localhost port
const port = 4000;

const app = express();

//server instance
const server = http.createServer(app);

const io = socketIO(server);

mongoose.Promise = global.Promise;
mongoose
    .connect(database.db, {
        useNewUrlParser: true
    })
    .then(
        () => {
            console.log("Database connected sucessfully !");
        },
        error => {
            console.log("Database could not be connected : " + error);
        }
    );

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
app.use("/register", userRoute);
app.use("/login", loginRoute);
app.use("/dashboard", dashboardRoute);
app.use("/", landingRoute);

// handling socket related events
const socketOps = require("./socketOps");
socketOps.allSocketOps(io);

server.listen(port, () => console.log(`Listening on port ${port}`));