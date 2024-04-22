// import { Router } from "express";
// import { productsManager } from "../../data/mongo/manager.mongo.js"; 
// // import propsProducts from "../../middlewares/propsProducts.mid.js";
// import isAdmin from "../../middlewares/isAdmin.mid.js";
// // import isAuth from "../../middlewares/isAuth.mid.js";
// import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
// import passCallBackMid from "../../middlewares/passCallBack.mid.js";
// import Product from "../../data/mongo/models/product.model.js";

// const productsRouter = Router(); 
// productsRouter.post(
//   "/",
//   passCallBackMid("jwt"),
//   isAdmin,
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const response = await productsManager.create(data);
//       return res.json({ statusCode: 201, response });
//     } catch (error) {
//       return next(error);
//     }
//   }
// );

// productsRouter.get("/", async (req, res, next) => {
//   try {
//     const options = {
//       limit: req.query.limit || 20,
//       page: req.query.page || 1,
//       sort: { name: 1 },
//     };
//     const filter = {};
//     if (req.query.name) {
//       filter.name = new RegExp(req.query.name.trim(), "i"); 
//     }
//     if (req.query.sort === "desc") {
//       options.sort.name = "desc";
//     }
//     const all = await productsManager.read({ filter, options });
//     return res.status(200).json({
//       statusCode: 200,
//       response: all,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// productsRouter.get("/:pid", async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const one = await productsManager.readOne(pid);
//     if (!one) {
//       return res.status(404).json({
//         statusCode: 404,
//         message: "Product not found",
//       });
//     }
//     return res.status(200).json({
//       statusCode: 200,
//       response: one,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// productsRouter.put("/:pid", isCapacityOkMid, async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const data = req.body;
//     const response = await productsManager.update(pid, data);
//     return res.status(200).json({
//       statusCode: 200,
//       response,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// productsRouter.delete("/:pid", async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const response = await productsManager.destroy(pid);
//     return res.status(200).json({
//       statusCode: 200,
//       response,
//     });
//   } catch (error) {
//     return next(error);
//   }
// });

// export default productsRouter;

import CustomRouter from "../CustomRouter.js";
//import events from "../../data/fs/events.fs.js";
import { productsManager } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

export default class ProductsRouter extends CustomRouter {
  init() { 
    this.create(
      "/",
      ["ADMIN","PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await productsManager.create(data);
          //return res.json({ statusCode: 201, response });
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await productsManager.read({ filter, options });
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:eid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const one = await productsManager.readOne(eid);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:eid", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const data = req.body;
        const response = await productsManager.update(eid, data);
        return res.success200(response);
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:eid", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { eid } = req.params;
        const response = await productsManager.destroy(eid);
        return res.success200(response);
      } catch (error) {
        return next(error);
      } 
    });
  }
}
