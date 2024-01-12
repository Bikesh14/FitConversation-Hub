const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
const path = require("path");

app.set("view engine", "ejs"); //middleware

app.get("/", (req: any, res: any) => {
  res.render("index");
});

app.get("/profile", (req: any, res: any) => {
  res.render("profile", { user: "Bikesh" });
});

app.get("/users/signup", (req: any, res: any) => {
  res.render("signup");
});

app.get("/users/login", (req: any, res: any) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
