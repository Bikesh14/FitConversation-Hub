import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import authRoutes from "./src/routes/authRoutes";

import { checkAuthenticated, checkNotAuthenticated } from "./src/util/utils";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
// const io = socketio(server);
const io = new Server(server);
const PORT = process.env.PORT || 8000;

io.on("connection", (socket: any) => {
  console.log("New Websocket connection....... this is working");

  //listen for chat message
  socket.on("chatMessage", (msg: String) => {
    io.emit("message", msg);
  });
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
