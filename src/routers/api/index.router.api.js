import CustomRouter from "../CustomRouter.js";
import { Router } from "express";
import ProductsRouter from "./products.router.api.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
// import eventsRouter from "./events.router.api.js";
// import cookiesRouter from "./cookies.router.api.js";

const product = new ProductsRouter()

export default class ApiRouter extends CustomRouter {
  init() {
    // apiRouter.use("/events",eventsRouter)
    // apiRouter.use("/cookies", cookiesRouter);
     this.router.use("/users", usersRouter);
     this.router.use("/products", product.getRouter());
     this.router.use("/orders", passCallBackMid("jwt"), ordersRouter);
     this.router.use("/sessions", sessionsRouter);
  }
}

