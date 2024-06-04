// import fs from "fs";
// import notFoundOne from "../../utils/notFoundOne.utils.js";

// class OrdersManager {
//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2); 
//         fs.writeFileSync(this.path, data);
//       } else { 
//         this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8")); 
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   constructor(path) {
//     this.path = path;
//     this.orders = [];
//     this.init();
//   }
//   async create(data) {
//     try {
//       this.orders.push(data);
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }
//   read({ filter, options }) {
//     //este metodo para ser compatible con las otras persistencias
//     //necesita agregar los filtros
//     //y la paginacion/orden
//     try {
//       if (this.orders.length === 0) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return this.orders;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   readOne(id) {
//     try {
//       const one = this.orders.find((each) => each._id === id);
//       if (!one) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return one;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
//   async update(eid, data) {
//     try {
//       const one = this.readOne(eid);
//       notFoundOne(one)
//       for (let each in data) {
//         one[each] = data[each]
//       }
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async destroy(id) {
//     try {
//       const one = this.readOne(id);
//       notFoundOne(one)
//       this.orders = this.orders.filter((each) => each._id !== id);
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const orders = new OrdersManager("./src/data/fs/files/orders.json");
// export default orders;


// import fs from "fs";
// import OrderDTO from "../../dto/order.dto.js";
// import notFoundOne from "../../utils/notFoundOne.utils.js";

// class OrdersManager {
//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2);
//         fs.writeFileSync(this.path, data);
//       } else {
//         this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

//   constructor(path) {
//     this.path = path;
//     this.orders = [];
//     this.init();
//   }

//   async create(data) {
//     try {
//       const orderDTO = new OrderDTO(data);
//       this.orders.push(orderDTO);
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return orderDTO;
//     } catch (error) {
//       throw error;
//     }
//   }

//   read({ filter, options }) {
//     try {
//       if (this.orders.length === 0) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         // Aquí puedes implementar la lógica para aplicar filtros y opciones (paginación/orden)
//         return this.orders;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

//   readOne(id) {
//     try {
//       const one = this.orders.find((each) => each._id === id);
//       if (!one) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return one;
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

//   async update(id, data) {
//     try {
//       const one = this.readOne(id);
//       notFoundOne(one);
//       for (let each in data) {
//         one[each] = data[each];
//       }
//       one.updatedAt = new Date();
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async destroy(id) {
//     try {
//       const one = this.readOne(id);
//       notFoundOne(one);
//       this.orders = this.orders.filter((each) => each._id !== id);
//       const jsonData = JSON.stringify(this.orders, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const orders = new OrdersManager("./src/data/fs/files/orders.json");
// export default orders;


import Order from "../mongo/models/order.model.js";

class OrdersManager {
  async create(data) {
    try {
      const order = new Order(data);
      await order.save();
      console.log("Orden creada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const orders = await Order.find();
      if (orders.length === 0) {
        throw new Error("¡No hay órdenes!");
      } else {
        console.log("Órdenes:", orders);
        return orders;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }
      console.log("Orden encontrada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }

      Object.assign(order, data);
      order.updatedAt = new Date();

      await order.save();
      console.log("Orden actualizada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }

      console.log("Orden eliminada:", order);
      return { order, message: "Orden eliminada correctamente" };
    } catch (error) {
      throw error;
    }
  }
}

const ordersManager = new OrdersManager();
export default ordersManager;
