// import usersManager from "../data/mongo/users.mongo.js";

// class UsersService {
//   constructor() {
//     this.model = usersManager;
//   }
//   create = async (data) => await this.model.create(data);
//   read = async ({ filter, options }) =>
//     await this.model.read({ filter, options });
//   stats = async (id) => await this.model.stats(id);
//   readOne = async (id) => await this.model.readOne(id);
//   readByEmail = async (id) => await this.model.readByEmail(email);
//   update = async (data) => await this.model.update(id, data);
//   destroy = async (id) => await this.model.destroy(id);
//   register = async(data) => {
//     try {
//       await sendEmail(data)
//     } catch (error) {
//       throw error
//     }
//   }
// }

// const service = new UsersService();
// export default service;

import usersManager from "../data/mongo/users.mongo.js";

class UsersService {
  constructor() {
    this.model = usersManager;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async read({ filter, options }) {
    return await this.model.read({ filter, options });
  }

  async stats(id) {
    return await this.model.stats(id);
  }

  async readOne(id) {
    try {
      const user = await this.model.readOne(id);
      if (!user) {
        throw new Error("Documento no encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    return await this.model.readByEmail(email);
  }

  async update(id, data) {
    return await this.model.update(id, data);
  }

  async destroy(id) {
    return await this.model.destroy(id);
  }

  async register(data) {
    try {
      // Implementa la lógica para enviar el correo electrónico aquí
    } catch (error) {
      throw error;
    }
  }
}

const service = new UsersService();
export default service;
