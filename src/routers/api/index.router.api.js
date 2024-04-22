import { fork } from "child_process";

import CustomRouter from "../CustomRouter.js";
import ProductsRouter from "./products.router.api.js";
import usersRouter from "./users.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
// import { Router } from "express";
// import productsRouter from "./products.router.api.js";
// import eventsRouter from "./events.router.api.js";
// import cookiesRouter from "./cookies.router.api.js";

const product = new ProductsRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    // apiRouter.use("/events",eventsRouter)
    // apiRouter.use("/cookies", cookiesRouter);
    this.router.use("/users", usersRouter);
    this.router.use("/products", product.getRouter());
    this.router.use("/orders", passCallBackMid("jwt"), ordersRouter);
    this.router.use("/sessions", sessionsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        console.log("global process id: " + process.pid);
        const child = fork("./src/utils/sum.util.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
        //const child1 = fork("./src/utils/sum.util.js");
        //const child2 = fork("./src/utils/subtract.util.js");
        //child1.send("start");
        //child2.send("start");
        //const results = {}
        //child1.on("message", (result) => results.sum = result);
        //child2.on("message", (result) => results.substract = result);
        //return res.success200(results)
      } catch (error) {
        return next(error);
      }
    });
  }
}
