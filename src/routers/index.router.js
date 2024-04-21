// import CustomRouter from "./CustomRouter.js";
// import apiRouter from "./api/index.router.api.js";
// import viewsRouter from "./views/index.view.js";

// const api = new apiRouter(); //instancia de la clase
// const apiRouter = api.getRouter(); //enrutador
// const views = new viewsRouter();
// const viewsRouter = views.getRouter();
// export default class IndexRouter extends CustomRouter {
//   init() {
//     this.router.use("/api", apiRouter);
//     this.router.use("/", viewsRouter);
//   }
// }

// // import CustomRouter from "./CustomRouter.js";
// import apiRouter from "./api/index.router.api.js";
// import viewsRouter from "./views/index.view.js";

// const api = new apiRouter(); //instancia de la clase
// const apiRouterInstance = api.getRouter(); // renombrar la variable
// const views = new viewsRouter();
// const viewsRouterInstance = views.getRouter(); // renombrar la variable
// export default class IndexRouter extends CustomRouter {
//   init() {
//     this.router.use("/api", apiRouterInstance); // usar la variable renombrada
//     this.router.use("/", viewsRouterInstance); // usar la variable renombrada
//   }
// }

import { Router } from "express";
import apiRouter from "./api/index.router.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

export default router;

 
