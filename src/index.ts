import express, { NextFunction, Request, Response, Router } from "express";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import { checkAuthenticated, checkNotAuthenticated } from "./util/utils";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.set("view engine", "ejs");
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

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
