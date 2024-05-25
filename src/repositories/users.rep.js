// import UserDTO from "../dto/user.dto.js";
// import dao from "../data/index.factory.js";

// const { users } = dao;

// class UsersRep {
//   constructor() {
//     this.model = users; 
//   }
//   create = async (data) => { 
//     data = new UserDTO(data);
//     const response = await this.model.create(data);
//     return response;
//   };
//   read = async ({ filter, options }) => await this.model.read({ filter, options });
//   readOne = async (id) js=> await this.model.readOne(id);
//   readByEmail = async (email) => await this.model.readByEmail(email);
//   update = async (id, data) => await this.model.update(id, data);
//   destroy = async (id) => await this.model.destroy(id);
// }

// const repository = new UsersRep();
// export default repository;





// import UserDTO from "../dto/user.dto.js";
// import dao from "../data/index.factory.js";

// const { users } = dao;

// class UsersRep {
//   constructor() {
//     this.model = users; 
//   }

//   create = async (data) => {
//     data = new UserDTO(data);
//     const response = await this.model.create(data);
//     console.log("User created:", response);
//     return response;
//   };

//   readByEmail = async (email) => {
//     const response = await this.model.findOne({ email }).exec();
//     return response;
//   };

//   read = async ({ filter, options }) => await this.model.read({ filter, options });
//   readOne = async (id) => await this.model.readOne(id);
//   update = async (id, data) => await this.model.update(id, data);
//   destroy = async (id) => await this.model.destroy(id);
// }

// const repository = new UsersRep();
// export default repository;


import UserDTO from "../dto/user.dto.js";
import dao from "../data/index.factory.js";

const { users } = dao;

class UsersRep {
  constructor() {
    this.model = users; 
  }

  async create(data) {
    data = new UserDTO(data);
    const response = await this.model.create(data);
    console.log("User created:", response);
    return response;
  }

  async read({ filter, options }) {
    const response = await this.model.paginate(filter, options);
    console.log('Read response from repository:', response);
    return response;
  }

  async readByEmail(email) {
    return await this.model.findOne({ email }).exec();
  }

  async readOne(id) {
    return await this.model.findById(id).exec();
  } 

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async destroy(id) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}

const repository = new UsersRep();
export default repository;
