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
import UserDTO from "../dto/user.dto.js";
import  sendEmail  from "../utils/sendEmail.utils.js";

class UsersService {
  constructor() {
    this.model = usersManager;
  }

  create = async (data) => {
    const userDTO = new UserDTO(data);
    return await this.model.create(userDTO);
  };

  read = async ({ filter, options }) => await this.model.read({ filter, options });

  stats = async (id) => await this.model.stats(id);

  readOne = async (id) => await this.model.readOne(id);

  readByEmail = async (email) => await this.model.readByEmail(email);

  update = async (id, data) => await this.model.update(id, data);

  destroy = async (id) => await this.model.destroy(id);

  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
