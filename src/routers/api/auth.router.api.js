// import { Router } from "express";
// import {
//   register,
//   login,
//   signout,
//   verifyAccount,
// } from "../../controllers/auth.controller.js";
// import passCallback from "../../middlewares/passCallBack.mid.js";

// const authrouter = Router();

// authrouter.post("/register", passCallback("register"), register);
// authrouter.post("/login", passCallback("login"), login);
// authrouter.post("/signout", passCallback("jwt"), signout);
// authrouter.post("/", verifyAccount);

// export default authrouter;

import { Router } from "express";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/auth.controller.js";
import passCallback from "../../middlewares/passCallBack.mid.js";

const authRouter = Router();
 
authRouter.post("/register", passCallback("register"), register);
authRouter.post("/login", passCallback("login"), login);
authRouter.post("/signout", passCallback("jwt"), signout);
authRouter.post("/", verifyAccount);

export default authRouter;


