const LocalStrategy = require("passport-local").Strategy;
import { pool } from "./dbConfig";
import bcrypt from "bcrypt";

function initialize(passport: any) {
  const authenticateUser = (
    email: String,
    password: string | Buffer,
    done: Function
  ) => {
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password!!" });
            }
          });
        } else {
          // No user found
          return done(null, false, {
            message: "Email not registered!",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user: any, done: Function) =>
    done(null, user.user_id)
  );

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((user_id: Number, done: Function) => {
    pool.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [user_id],
      (err, results) => {
        if (err) {
          return done(err);
        }
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;
