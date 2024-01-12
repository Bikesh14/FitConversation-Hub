import express from "express";
import { Request, Response } from "express";

const PORT = process.env.PORT || 8000;
const app = express();

app.set("view engine", "ejs"); //middleware

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/profile", (req: Request, res: Response) => {
  res.render("profile", { user: "Bikesh" });
});

app.get("/users/signup", (req: Request, res: Response) => {
  res.render("signup");
});

app.get("/users/login", (req: Request, res: Response) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
