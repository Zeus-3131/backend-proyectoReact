// // import service from "../services/users.service.js";

// // class AuthController {
// //   constructor() {
// //     this.service = service;
// //   }
// //   register = async (req, res, next) => {
// //     const { email, username, verifiedCode } = req.user;
// //     await this.service.register({ email, username, verifiedCode });
// //     try {
// //       return res.json({
// //         statusCode: 201,
// //         message: "Registered!",
// //       });
// //     } catch (error) {
// //       return next(error);
// //     }
// //   };
// //   login = async (req, res, next) => {
// //     try {
// //       return res
// //         .cookie("token", req.token, {
// //           maxAge: 60 * 60 * 24 * 7,
// //           httpOnly: true,
// //         })
// //         .json({
// //           statusCode: 200,
// //           message: "Logged in!",
// //         });
// //     } catch (error) {
// //       return next(error);
// //     }
// //   };
// //   signout = async (req, res, next) => {
// //     try {
// //       return res.clearCookie("token").json({
// //         statusCode: 200,
// //         message: "Signed out!",
// //       });
// //     } catch (error) {
// //       return next(error);
// //     }
// //   };
// //   verifyAccount = async (req, res, next) => {
// //     try {
// //       const { email, verifiedCode } = req.body;
// //       const user = await service.readByEmail(email);
// //       if (user.verifiedCode === verifiedCode) {
// //         await service.update(user._id, { verified: true });
// //         return res.json({
// //           statusCode: 200,
// //           message: "Verified user!",
// //         });
// //       } else {
// //         return res.json({
// //           statusCode: 400,
// //           message: "Invalid verified token!",
// //         });
// //       }
// //     } catch (error) {
// //       return next(error);
// //     }
// //   };
// // }

// // const controller = new AuthController();
// // const { register, login, signout, verifyAccount } = controller;
// // export { register, login, signout, verifyAccount };


// import service from "../services/users.service.js";

// class AuthController {
//   constructor() {
//     this.service = service;
//   }

//   register = async (req, res, next) => {
//     try {
//       const { email, username, verifiedCode } = req.user;
//       await this.service.register({ email, username, verifiedCode });
//       return res.status(201).json({ message: "Registered!" });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   login = async (req, res, next) => {
//     try {
//       return res
//         .cookie("token", req.token, {
//           maxAge: 60 * 60 * 24 * 7,
//           httpOnly: true,
//         })
//         .status(200)
//         .json({ message: "Logged in!" });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   signout = async (req, res, next) => {
//     try {
//       return res.clearCookie("token").status(200).json({ message: "Signed out!" });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   verifyAccount = async (req, res, next) => {
//     try {
//       const { email, verifiedCode } = req.body;
//       const user = await this.service.readByEmail(email);

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       if (user.verifiedCode !== verifiedCode) {
//         return res.status(400).json({ message: "Invalid verified token" });
//       }

//       await this.service.update(user._id, { verified: true });
//       return res.status(200).json({ message: "Verified user!" });
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// const controller = new AuthController();
// export const { register, login, signout, verifyAccount } = controller;


import service from "../services/users.service.js";
import jwt from "jsonwebtoken";
import isValidPass  from "../utils/isValidPass.utils.js";

class AuthController {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const { email, username, password } = req.body; 
      const userData = {
        email,
        name: username,
        password,
      };

      const newUser = await this.service.create(userData);
      return res.status(201).json({ message: "Registered!", user: newUser });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.readByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!isValidPass(password, user.password)) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .cookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Logged in!", token });
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

  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await this.service.readByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.verifyCode !== verifiedCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      await this.service.update(user._id, { verified: true });
      return res.status(200).json({ message: "Verified user!" });
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new AuthController();
export const { register, login, signout, verifyAccount } = controller;
