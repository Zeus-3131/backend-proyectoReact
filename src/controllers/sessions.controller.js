// class SessionsController {
//   register = async (req, res, next) => {
//     try {
//       return res.success201("Registered!");
//     } catch (error) {
//       return next(error);
//     }
//   };
//   login = async (req, res, next) => {
//     try {
//       return res
//         .cookie("token", req.token, {
//           maxAge: 7 * 24 * 60 * 60 * 1000,
//           httpOnly: true,
//         })
//         .success200("Logged in!");
//     } catch (error) {
//       return next(error);
//     }
//   };
//   google = async (req, res, next) => {
//     try {
//       return res.success200("Logged in with Google!");
//     } catch (error) {
//       return next(error);
//     }
//   };
//   github = async (req, res, next) => {
//     try {
//       return res.success200("Logged in with Github!");
//     } catch (error) {
//       return next(error);
//     }
//   };
//   me = async (req, res, next) => {
//     try {
//       const user = {
//         email: req.user.email,
//         role: req.user.role,
//         photo: req.user.photo,
//       };
//       return res.success200(user);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   signout = async (req, res, next) => {
//     try {
//       return res.clearCookie("token").success200("Signed out!");
//     } catch (error) {
//       return next(error);
//     }
//   };
//   badauth = (req, res, next) => {
//     try {
//       return res.error401();
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// export default SessionsController;
// const controller = new SessionsController();
// const { register, login, google, github, me, signout, badauth } = controller;
// export { register, login, google, github, me, signout, badauth };

import { createToken } from "../utils/token.util.js";
import { verifyHash } from "../utils/hash.util.js";
import User from "../data/mongo/models/user.model.js";
import repository from "../repositories/users.rep.js";

class SessionsController {
  register = async (req, res, next) => {
    try {
      return res.status(201).json({ message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Logged in with Google!" });
    } catch (error) {
      return next(error);
    }
  };

  github = async (req, res, next) => {
    try {
      return res.status(200).json({ message: "Logged in with Github!" });
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").status(200).json({ message: "Signed out!" });
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.status(401).json();
    } catch (error) {
      return next(error);
    }
  };

  googleCallback = async (req, res, next) => {
    try {
      const user = req.user; // Suponiendo que `req.user` contiene los datos de usuario de Google
      const token = createToken({ _id: user._id, role: user.role });
      return res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/"); // Redirige a la página principal después del inicio de sesión con Google
    } catch (error) {
      return next(error);
    }
  };

  githubCallback = async (req, res, next) => {
    try {
      const user = req.user; // Suponiendo que `req.user` contiene los datos de usuario de GitHub
      const token = createToken({ _id: user._id, role: user.role });
      return res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/"); // Redirige a la página principal después del inicio de sesión con GitHub
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new SessionsController();
export const { register, login, google, github, me, signout, badauth, googleCallback, githubCallback } = controller;
export default controller;
