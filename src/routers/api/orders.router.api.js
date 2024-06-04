// // import CustomRouter from "../CustomRouter.js";
// // import {
// //   create,
// //   read,
// //   report,
// //   update,
// //   destroy,
// // } from "../../controllers/orders.controller.js";

// // class OrdersRouter extends CustomRouter {
// //   init() {
// //     this.create("/", ["USER", "PREM","PUBLIC"], create); //puse public para pruebas
// //     this.read("/bills/:uid", ["ADMIN","PUBLIC"], report); //puse public para pruebas
// //     this.read("/", ["USER", "PREM","PUBLIC"], read); //puse public para pruebas
// //     this.update("/:oid", ["USER", "PREM","PUBLIC"], update); //puse public para pruebas
// //     this.destroy("/:oid", ["USER", "PREM","PUBLIC"], destroy); //puse public para pruebas
// //   }
// // }

// // const ordersRouter = new OrdersRouter();
// // export default ordersRouter.getRouter();


// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   report,
//   update,
//   destroy,
// } from "../../controllers/orders.controller.js";

// class OrdersRouter extends CustomRouter {  
//   init() {
//     this.create("/", ["USER", "PREM", "PUBLIC"], create); // Ajustado para usuarios logueados
//     this.read("/bills/:uid", ["ADMIN", "PUBLIC"], report);
//     this.read("/", ["USER", "PREM", "PUBLIC"], read); // Ajustado para usuarios logueados
//     this.update("/:oid", ["USER", "PREM", "PUBLIC"], update); // Ajustado para usuarios logueados
//     this.destroy("/:oid", ["USER", "PREM", "PUBLIC"], destroy); // Ajustado para usuarios logueados
//   }
// }

// const ordersRouter = new OrdersRouter();
// export default ordersRouter.getRouter();


// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   report,
//   update,
//   destroy, 
//   readOne, 
// } from "../../controllers/orders.controller.js";

// class OrdersRouter extends CustomRouter {  
//   init() {
//     this.create("/", ["USER", "PREM", "PUBLIC"], create);
//     this.read("/bills/:uid", ["ADMIN", "PUBLIC"], report);
//     this.read("/", ["USER", "PREM", "PUBLIC"], read);
//     this.update("/:oid", ["USER", "PREM", "PUBLIC"], update);
//     this.destroy("/:oid", ["USER", "PREM", "PUBLIC"], destroy);
//     this.readOne("/:oid", ["USER", "PREM", "PUBLIC"], readOne); // Agrega la ruta para readOne
//   }
// }

// const ordersRouter = new OrdersRouter();
// export default ordersRouter.getRouter();



// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   report,
//   update,
//   destroy, 
//   readOne, 
// } from "../../controllers/orders.controller.js";
// import authMiddleware from "../../middlewares/isAuth.mid.js"; // Importa el middleware de autenticación

// class OrdersRouter extends CustomRouter {  
//   init() {
//     this.router.post("/", authMiddleware, create); // Aplica el middleware de autenticación
//     this.router.get("/bills/:uid", authMiddleware, report); // Aplica el middleware de autenticación
//     this.router.get("/", authMiddleware, read); // Aplica el middleware de autenticación
//     this.router.put("/:oid", authMiddleware, update); // Aplica el middleware de autenticación
//     this.router.delete("/:oid", authMiddleware, destroy); // Aplica el middleware de autenticación
//     this.router.get("/:oid", authMiddleware, readOne); // Aplica el middleware de autenticación
//   }
// }

// const ordersRouter = new OrdersRouter();
// ordersRouter.init(); // Inicializa las rutas
// export default ordersRouter.router; // Exporta el enrutador



// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   // report,
//   update,
//   destroy,
//   readOne,
// } from "../../controllers/orders.controller.js";
// import authMiddleware from "../../middlewares/isAuth.mid.js"; // Importa el middleware de autenticación

// class OrdersRouter extends CustomRouter {
//   init() {
//     this.router.post("/", authMiddleware, create);
//     this.router.get("/bills/:uid", authMiddleware, read);
//     this.router.get("/", authMiddleware, read);
//     this.router.put("/:oid", authMiddleware, update);
//     this.router.delete("/:oid", authMiddleware, destroy);
//     this.router.get("/:oid", authMiddleware, readOne);
//   }
// }

// const ordersRouter = new OrdersRouter();
// ordersRouter.init();
// export default ordersRouter.router;



// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   report,
//   update,
//   destroy,
// } from "../../controllers/orders.controller.js";

// class OrdersRouter extends CustomRouter {
//   init() {
//     this.create("/", ["USER", "PREM","PUBLIC"], create); //puse public para pruebas
//     // this.read("/bills/:uid", ["ADMIN","PUBLIC"], report); //puse public para pruebas
//     this.read("/", ["USER", "PREM","PUBLIC"], read); //puse public para pruebas
//     this.update("/:oid", ["USER", "PREM","PUBLIC"], update); //puse public para pruebas
//     this.destroy("/:oid", ["USER", "PREM","PUBLIC"], destroy); //puse public para pruebas
//   }
// }

// const ordersRouter = new OrdersRouter(); 
// export default ordersRouter.getRouter();



// funciona
// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   report,
//   update,
//   destroy,
// } from "../../controllers/orders.controller.js";
// import isauth from '../../middlewares/isAuth.mid.js';

// class OrdersRouter extends CustomRouter {
//   init() {
//     this.create("/", ["USER", "PREM","PUBLIC"], isauth, create); //puse public para pruebas
//     this.read("/bills/:uid", ["ADMIN","PUBLIC"], isauth, report); //puse public para pruebas
//     this.read("/", ["USER", "PREM","PUBLIC"], isauth, read); //puse public para pruebas
//     this.update("/:oid", ["USER", "PREM","PUBLIC"], isauth, update); //puse public para pruebas
//     this.destroy("/:oid", ["USER", "PREM","PUBLIC"], isauth, destroy); //puse public para pruebas
//   }
// }

// const ordersRouter = new OrdersRouter(); 
// export default ordersRouter.getRouter();


import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  report,
  update,
  destroy,
  readOne,
} from "../../controllers/orders.controller.js";
import isauth from '../../middlewares/isAuth.mid.js';

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], isauth, create);
    this.read("/bills/:uid", ["ADMIN"], isauth, report);
    this.read("/", ["USER", "PREM"], isauth, read);
    this.update("/:oid", ["USER", "PREM"], isauth, update);
    this.destroy("/:oid", ["USER", "PREM"], isauth, destroy);
    this.readOne("/:oid", ["USER", "PREM"], isauth, readOne); // Agregado readOne al enrutador
  }
}

const ordersRouter = new OrdersRouter(); 
export default ordersRouter.getRouter();
