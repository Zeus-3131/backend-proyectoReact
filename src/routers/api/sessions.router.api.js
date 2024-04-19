import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> 9fa59d6cdf7f352caf82ef4efeeae0727fff9015
  async (req, res, next) => { 
=======
  async (req, res, next) => {
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
  passCallBack("login"),
  async (req, res, next) => {
    try {
<<<<<<< HEAD
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
=======
      return res.json({
        statusCode: 200,
        message: "Logged in!",
<<<<<<< HEAD
        session: req.token,
      });
>>>>>>> 9fa59d6cdf7f352caf82ef4efeeae0727fff9015
    } catch (error) {
      return next(error);
    }
  }
);

//google
sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


//google-callback
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//google
sessionsRouter.post(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//github-callback
sessionsRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with github!",
=======
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//me
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//signout
sessionsRouter.post(
  "/signout",
  /*   passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }), */
  passCallBack("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    } catch (error) {
      return next(error);
    }
  }
);


//badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
