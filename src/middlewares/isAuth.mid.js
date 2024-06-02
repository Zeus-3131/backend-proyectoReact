// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     const userData = verifytoken(token);
//     if (userData) {
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// import { verifytoken } from "../utils/token.util.js";

// export default (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       const error = new Error("Token not provided");
//       error.statusCode = 401;
//       throw error;
//     }
//     const userData = verifytoken(token);
//     if (userData) {
//       req.user = userData; // Asigna los datos del usuario al objeto req
//       return next();
//     } else {
//       const error = new Error("Bad auth from middleware");
//       error.statusCode = 401;
//       throw error;
//     }
//   } catch (error) {
//     return next(error);
//   }
// };



import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Token not provided");
      error.statusCode = 401;
      throw error;
    }
    const userData = verifytoken(token);
    if (userData) {
      req.user = userData; // Asigna los datos del usuario al objeto req
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return next(error);
  }
};
