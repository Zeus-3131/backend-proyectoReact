import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
<<<<<<< HEAD
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { usersManager } from "../data/mongo/manager.mongo.js";  
const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT } = process.env;
=======
import { createHash, verifyHash } from "../utils/hash.util.js";
import { usersManager } from "../data/mongo/manager.mongo.js";
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await usersManager.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await usersManager.create(data);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
<<<<<<< HEAD
          // req.session.email = email;
          // req.session.role = user.role;
          const token = createToken({ email, role: user.role });
          req.token = token;
<<<<<<< HEAD

=======
=======
          req.session.email = email;
          req.session.role = user.role;
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
>>>>>>> 9fa59d6cdf7f352caf82ef4efeeae0727fff9015
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

<<<<<<< HEAD
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await usersManager.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await usersManager.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await usersManager.readByEmail(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await usersManager.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

=======
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
export default passport;
