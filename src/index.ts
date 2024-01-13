import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import flash from "express-flash";
import { pool } from "../dbConfig";
import { time } from "console";

const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//flash middleware
app.use(flash());

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/profile", (req: Request, res: Response) => {
  res.render("profile", { user: "Bikesh" });
});

app.get("/users/signup", (req: Request, res: Response) => {
  res.render("signup");
});

app.post("/users/signup", async (req: Request, res: Response) => {
  let { username, email, password, confirmPassword } = req.body;
  console.log({ username, email, password, confirmPassword });

  interface ValidationError {
    message: string;
  }
  let errors: ValidationError[] = []; //list to store error during form validation

  if (!username || !email || !password || !confirmPassword) {
    errors.push({ message: "Enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }

  if (password != confirmPassword) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("signup", { errors });
  } else {
    let hashedPassword: String = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err: any, results: { rows: string | any[] }) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered!!" });
          res.render("signup", { errors });
        } else {
          // Get the current date and time
          const currentDate = new Date();

          // Format the date string in a way that SQL understands
          const formattedDate: String = currentDate
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          pool.query(
            `INSERT INTO users (username, password, email, user_type, profile_created_at)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING username, password, email, user_type, profile_created_at`,
            [username, hashedPassword, email, "client", formattedDate],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash(
                "success_msg",
                "You have been registered. Please log in"
              );
              res.redirect("/users/login");
            }
          );
        }
      }
    );
  }
});

app.get("/users/login", (req: Request, res: Response) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
