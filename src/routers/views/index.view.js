import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js"

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["hp", "pokemon", "batman"];
    const date = new Date();
    return res.render("index", { products: mainProducts, date, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter)

export default viewsRouter;
