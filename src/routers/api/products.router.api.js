import { Router } from "express"; 
import { productsManager } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";

const productsRouter = Router();  

productsRouter.post("/",isAdmin, propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.create(data);
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
    const all = await productsManager.read();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", isCapacityOkMid, async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await productsManager.update(quantity, pid);
    return res.json({
      statusCode: 200,
      response: "capacity available: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
