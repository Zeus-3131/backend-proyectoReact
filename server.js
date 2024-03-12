import express from "express";
import events from "./src/data/fs/events.fs.js";
import products from "./src/data/fs/products.fs.js";
import users from "./src/data/fs/users.fs.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

// Endpoints para Events
server.post("/api/events", async (req, res) => {
  try {
      const data = req.body;
      const response = await events.createEvent(data);

      return res.json({
          statusCode: 201,
          response,
      });
  } catch (error) {
      if (error.message === "El nombre es requerido") {
          return res.status(400).json({
              statusCode: 400,
              message: error.message,
          });
      }

      console.log(error);
      return res.status(500).json({
          statusCode: 500,
          message: "Error interno del servidor",
      });
  }
});

server.get("/api/events", async (req, res) => {
  try {
    const all = await events.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await events.readEventById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/events/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.productSold(quantity, eid);

    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "No hay ningún evento con id=" + eid) {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "There isn't any event") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Endpoints para Users
server.post("/api/users", async (req, res) => {
  try {
      const data = req.body;
      const response = await users.createUser(data);

      return res.status(201).json({
          statusCode: 201,
          response,
      });
  } catch (error) {
      if (error.message === "Los campos 'username', 'email' y 'password' son obligatorios" ||
          error.message === "Los campos 'username', 'email' y 'password' no pueden estar vacíos") {
          return res.status(400).json({
              statusCode: 400,
              message: error.message,
          });
      }

      console.log(error);
      return res.status(500).json({
          statusCode: 500,
          message: "Error interno del servidor",
      });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const all = await users.readUsers();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await users.readUserById(uid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/users/:eid/:userId", async (req, res) => {
  try {
    const { eid, userId } = req.params;
    const updatedData = req.body;

    const response = await users.updateUser(eid, userId, updatedData);

    if (response === "Usuario actualizado exitosamente") {
      return res.json({
        statusCode: 200,
        message: response,
      });
    } else if (response === "No se encontró ningún usuario con ese ID") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await users.destroyUserById(uid);
    if (response === "There isn't any user") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Endpoints para Products
server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);

    return res.status(201).json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    if (error.message === "El nombre del producto es requerido") {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }

    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error interno del servidor",
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const all = await products.readProducts();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await products.readProductById(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/products/:pid/:quantity", async (req, res) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.productSold(quantity, pid);

    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: `Stock disponible: ${response}`,
      });
    } else if (response === "No hay suficiente stock del producto.") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else if (response === "No hay ningún producto con id=" + pid) {
      return res.json({
        statusCode: 404,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await products.destroyProductById(pid);
    if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
