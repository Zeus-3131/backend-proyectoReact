// import service from "../services/orders.service.js";

// class OrdersController {
//   constructor() {
//     this.service = service;
//   }
//   create = async (req, res, next) => {
//     try {
//       const data = req.body; 
//       data.user_id = req.user._id;
//       //winston.INFO(JSON.stringify(data));
//       const response = await this.service.create(data);
//       return res.success201(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   read = async (req, res, next) => {
//     try {
//       const options = {
//         limit: req.query.limit || 20,
//         page: req.query.page || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.user._id) {
//         filter.user_id = req.user._id;
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.success200(all);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   report = async (req, res, next) => {
//     try {
//       const { uid } = req.params;
//       const report = await this.service.reportBill(uid);
//       return res.json({
//         statusCode: 200,
//         response: report,
//       });
//     } catch (error) {
//       return next(error);
//     }
//   }
//   update = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(oid, data);
//       return res.success200(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   destroy = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.destroy(oid);
//       return res.success200(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// export default OrdersController;
// const controller = new OrdersController();
// const { create, read, report, update, destroy } = controller;
// export { create, read, report, update, destroy };


// import service from "../services/orders.service.js";

// class OrdersController {
//   constructor() {
//     this.service = service;
//   }

//   create = async (req, res, next) => {
//     try {
//       const data = req.body;
//       data.user_id = req.user._id;
//       const response = await this.service.create(data);
//       return res.status(201).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   read = async (req, res, next) => { 
//     try {
//       const options = {
//         limit: req.query.limit || 20,
//         page: req.query.page || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.user._id) {
//         filter.user_id = req.user._id;
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.status(200).json(all);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   report = async (req, res, next) => {
//     try {
//       const { uid } = req.params;
//       const report = await this.service.reportBill(uid);
//       return res.status(200).json({ response: report });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   update = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(oid, data);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   destroy = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.destroy(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// const controller = new OrdersController();
// const { create, read, report, update, destroy } = controller;
// export { create, read, report, update, destroy };


// import service from "../services/orders.service.js";

// class OrdersController {
//   constructor() {
//     this.service = service;
//   }

//   create = async (req, res, next) => {
//     try {
//       if (!req.user || !req.user._id) {
//         throw new Error("El usuario no está autenticado o no tiene un _id válido");
//       }
//       const data = { ...req.body, user_id: req.user._id };
//       const response = await this.service.create(data);
//       return res.status(201).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   read = async (req, res, next) => {
//     try {
//       const options = {
//         limit: parseInt(req.query.limit) || 20,
//         page: parseInt(req.query.page) || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.user && req.user._id) {
//         filter.user_id = req.user._id;
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.status(200).json(all);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   readOne = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.readOne(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   report = async (req, res, next) => {
//     try {
//       const { uid } = req.params;
//       const report = await this.service.reportBill(uid);
//       return res.status(200).json({ response: report });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   update = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(oid, data);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   destroy = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.destroy(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// const controller = new OrdersController();
// const { create, read, report, update, destroy, readOne } = controller;
// export { create, read, report, update, destroy, readOne };


// import service from "../services/orders.service.js";

// class OrdersController {
//   constructor() {
//     this.service = service;
//   }

//   create = async (req, res, next) => {
//     try {
//       if (!req.user || !req.user._id) {
//         throw new Error("El usuario no está autenticado o no tiene un _id válido");
//       }
//       const data = { ...req.body, user_id: req.user._id };
//       const response = await this.service.create(data);
//       return res.status(201).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   read = async (req, res, next) => {
//     try {
//       const options = {
//         limit: parseInt(req.query.limit) || 20,
//         page: parseInt(req.query.page) || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.user && req.user._id) {
//         filter.user_id = req.user._id;
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.status(200).json(all);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   readOne = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.readOne(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   report = async (req, res, next) => {
//     try {
//       const { uid } = req.params;
//       const report = await this.service.reportBill(uid);
//       return res.status(200).json({ response: report });
//     } catch (error) {
//       return next(error);
//     }
//   };

//   update = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const data = req.body;
//       const response = await this.service.update(oid, data);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };

//   destroy = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.destroy(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// const controller = new OrdersController();
// const { create, read, report, update, destroy, readOne } = controller;
// export { create, read, report, update, destroy, readOne };

// import service from "../services/orders.service.js";
// import notFoundOne from "../utils/notFoundOne.utils.js";

// class OrdersController {
//   constructor() {
//     this.service = service;
//   }

//   create = async (req, res, next) => {
//         try {
//           if (!req.user || !req.user._id) {
//             throw new Error("El usuario no está autenticado o no tiene un _id válido");
//           }
//           const data = { ...req.body, user_id: req.user._id };
//           const response = await this.service.create(data);
//           return res.status(201).json(response);
//         } catch (error) {
//           return next(error);
//         }
//       };


//       async read({ filter, options }) {
//         try {
//           console.log("Filter:", filter);
//           console.log("Options:", options);
//           const response = await this.service.paginate(filter, options);
//           console.log('Read response from repository:', response);
//           return response;
//         } catch (error) {
//           console.error('Service read error:', error);
//           throw error;
//         }
//       }
      

//   readOne = async (req, res, next) => {
//     try {
//       const { oid } = req.params;
//       const response = await this.service.readOne(oid);
//       return res.status(200).json(response);
//     } catch (error) {
//       return next( error,notFoundOne());
//     }
//   };

    
//       report = async (req, res, next) => {
//         try {
//           const { uid } = req.params;
//           const report = await this.service.reportBill(uid);
//           return res.status(200).json({ response: report });
//         } catch (error) {
//           return next(error);
//         }
//       };
    
//       update = async (req, res, next) => {
//         try {
//           const { oid } = req.params;
//           const data = req.body;
//           const response = await this.service.update(oid, data);
//           return res.status(200).json(response);
//         } catch (error) {
//           return next(error);
//         }
//       };
    
//       destroy = async (req, res, next) => {
//         try {
//           const { oid } = req.params;
//           const response = await this.service.destroy(oid);
//           return res.status(200).json(response);
//         } catch (error) {
//           return next(error);
//         }
//       };
//     }


// const controller = new OrdersController();
// const { create, read, report, readOne, update, destroy } = controller;
// export { create, read, report, readOne, update, destroy };


import service from "../services/orders.service.js";
import notFoundOne from "../utils/notFoundOne.utils.js";

class OrdersController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        throw new Error("El usuario no está autenticado o no tiene un _id válido");
      }
      const data = { ...req.body, user_id: req.user._id };
      const response = await this.service.create(data);
      return res.status(201).json(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const options = {
        limit: parseInt(req.query.limit) || 20,
        page: parseInt(req.query.page) || 1,
        sort: { createdAt: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user && req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.status) {
        filter.status = req.query.status;
      }
      if (req.query.sort === "desc") {
        options.sort = { createdAt: -1 };
      }
      const response = await this.service.read({ filter, options });
      return res.status(200).json({ status: 200, data: response });
    } catch (error) {
      console.error("Controller read error:", error);
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.readOne(oid);
      return res.status(200).json(response);
    } catch (error) {
      return next(error, notFoundOne());
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.reportBill(uid);
      return res.status(200).json({ response: report });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new OrdersController();
const { create, read, report, readOne, update, destroy } = controller;
export { create, read, report, readOne, update, destroy };
