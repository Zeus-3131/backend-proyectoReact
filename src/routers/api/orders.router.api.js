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
//     this.read("/bills/:uid", ["ADMIN","PUBLIC"], report); //puse public para pruebas
//     this.read("/", ["USER", "PREM","PUBLIC"], read); //puse public para pruebas
//     this.update("/:oid", ["USER", "PREM","PUBLIC"], update); //puse public para pruebas
//     this.destroy("/:oid", ["USER", "PREM","PUBLIC"], destroy); //puse public para pruebas
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
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {  
  init() {
    this.create("/", ["USER", "PREM"], create); // Ajustado para usuarios logueados
    this.read("/bills/:uid", ["ADMIN", "PUBLIC"], report);
    this.read("/", ["USER", "PREM"], read); // Ajustado para usuarios logueados
    this.update("/:oid", ["USER", "PREM"], update); // Ajustado para usuarios logueados
    this.destroy("/:oid", ["USER", "PREM"], destroy); // Ajustado para usuarios logueados
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();

