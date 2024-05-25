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



// import repository from "../repositories/users.rep.js"; // Reemplazando products.rep.js por users.rep.js
// import UserDTO from "../dto/user.dto.js"; // Cambiando ProductDTO por UserDTO

// class UsersService { // Cambiando ProductsService por UsersService
//   constructor() {
//     this.repository = repository;
//   } 
//   create = async (data) => {
//     data = new UserDTO(data); // Cambiando ProductDTO por UserDTO
//     const response = await this.repository.create(data);
//     return response;
//   };
//   read = async ({ filter, options }) =>
//     await this.repository.read({ filter, options });
//   readOne = async (id) => await this.repository.readOne(id);
//   update = async (id, data) => await this.repository.update(id, data);
//   destroy = async (id) => await this.repository.destroy(id);
// }

// const service = new UsersService(); // Cambiando ProductsService por UsersService
// export default service;


import usersManager from "../data/mongo/users.mongo.js";
import UserDTO from "../dto/user.dto.js";
import sendEmail from "../utils/sendEmail.utils.js";

class UsersService {
  constructor() {
    this.model = usersManager;
  }

  async create(data) {
    const userDTO = new UserDTO(data);
    return await this.model.create(userDTO);
  }

  async read({ filter, options }) {
    return await this.model.read({ filter, options });
  }

  async stats(id) {
    return await this.model.stats(id);
  }

  async readOne(id) {
    return await this.model.readOne(id);
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
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  }
}

const service = new UsersService();
export default service;
