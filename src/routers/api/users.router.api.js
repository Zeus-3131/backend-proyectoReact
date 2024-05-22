// import CustomRouter from "../CustomRouter.js";
// import {
//   create,
//   read,
//   readOne,
//   stats,
//   update,
//   destroy,
// } from "../../controllers/users.controller.js"; 

// class UsersRouter extends CustomRouter {
//   init() {
//     this.create("/", ["PUBLIC"], create);
//     this.read("/", ["ADMIN","PUBLIC"], read); //puesto public para pruebas
//     this.read("/stats", ["USER", "PREM","PUBLIC"], stats);//puesto public para pruebas
//     this.read("/:uid", ["USER", "PREM","PUBLIC"], readOne);//puesto public para pruebas
//     this.update("/:uid", ["USER", "PREM","PUBLIC"], update);//puesto public para pruebas
//     this.destroy("/:uid", ["USER", "PREM","PUBLIC"], destroy);//puesto public para pruebas
//   }
// }

// const usersRouter = new UsersRouter();
// export default usersRouter.getRouter();

import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  stats,
  update,
  destroy,
} from "../../controllers/users.controller.js"; 

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["ADMIN", "PUBLIC"], read);
    this.read("/stats", ["USER", "PREM", "PUBLIC"], stats);
    this.read("/:uid", ["USER", "PREM", "PUBLIC"], readOne);
    this.update("/:uid", ["USER", "PREM"], update); // "USER" y "PREM" tienen acceso a actualizar
    this.destroy("/:uid", ["USER", "PREM"], destroy); // "USER" y "PREM" tienen acceso a eliminar
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();


