import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import propsproducts from "../../middlewares/propsproducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsproducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.readProducts();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await products.readProductById(eid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:eid/:quantity", async (req, res, next) => {
  try {
    const { eid, quantity } = req.params;
    const response = await products.productSold(quantity, eid);
    return res.json({
      statusCode: 200,
      response: "capacity available: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await products.destroyProductById(eid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
