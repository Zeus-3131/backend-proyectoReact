import { Router } from "express";
import { productsManager } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.create(data);
    return res.status(201).json({
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
    return res.status(200).json({
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
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    }
    return res.status(200).json({
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
    const product = await productsManager.readOne(pid);
    if (!product) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    }

    // Actualizar campos adicionales si se proporcionan en el cuerpo de la solicitud
    const updatedFields = req.body;
    let updatedStock = product.stock;
    if ('stock' in updatedFields) {
      // Actualizar el stock solo si se proporciona en el cuerpo de la solicitud
      updatedStock = parseInt(updatedFields.stock);
    }

    // Actualizar otros campos si se proporcionan en el cuerpo de la solicitud
    delete updatedFields.stock; // Eliminar el campo de stock ya que ya se actualizó anteriormente
    if (Object.keys(updatedFields).length > 0) {
      Object.assign(product, updatedFields);
    }

    // Verificar si hay suficiente stock después de la actualización
    const updatedStockValue = updatedStock - parseInt(quantity);
    if (updatedStockValue < 0) {
      return res.status(400).json({
        statusCode: 400,
        message: "Insufficient stock",
      });
    }

    // Actualizar el documento del producto en la base de datos
    const response = await productsManager.update(pid, {
      ...updatedFields,
      stock: updatedStockValue
    });

    return res.status(200).json({
      statusCode: 200,
      response: "Capacity available: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await productsManager.destroy(pid);
    return res.status(200).json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
