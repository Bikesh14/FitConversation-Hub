import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import authRoutes from "./src/routes/authRoutes";
import { dashboardController } from "./src/controllers/dashboardController";

import { checkAuthenticated, checkNotAuthenticated } from "./src/util/utils";
import http from "http";

const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;
// const io = socketio(server);

io.on("connection", (socket: any) => {
  console.log("New Websocket connection....... this is working");
});

// Middlewares
app.set("view engine", "ejs");
app.use(express.static("public")); //for static folder 'public'
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", checkAuthenticated, (req: Request, res: Response) => {
  res.render("index");
});

// Routes
app.use("/user", authRoutes);

server.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
