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


// import UserDTO from "../dto/user.dto.js";
// import User from "../data/mongo/models/user.model.js";

// class UserRepository {
//   constructor() {
//     this.model = User;
//   }

//   async create(data) {
//     try {
//       data = new UserDTO(data);
//       const response = await this.model.create(data);
//       console.log("User created:", response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async read({ filter, options }) {
//     try {
//       const response = await this.model.paginate(filter, options);
//       console.log('Read response from repository:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async readByEmail(email) {
//     try {
//       const one = await this.model.findOne({ email }).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async readOne(id) {
//     try {
//       const one = await this.model.findById(id).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async update(id, data) {
//     try {
//       const one = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async destroy(id) {
//     try {
//       const one = await this.model.findByIdAndDelete(id).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const repository = new UserRepository(); 
// export default repository;


// import UserDTO from "../dto/user.dto.js";
// import User from "../data/mongo/models/user.model.js";

// class UserRepository {
//   constructor() {
//     this.model = User;
//   }

//   async create(data) {
//     try {
//       data = new UserDTO(data);
//       const response = await this.model.create(data);
//       console.log("User created:", response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async read({ filter, options }) {
//     try {
//       const response = await this.model.paginate(filter, options);
//       console.log('Read response from repository:', response);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async readByEmail(email) {
//     try {
//       const one = await this.model.findOne({ email }).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async readOne(id) {
//     try {
//       const one = await this.model.findById(id).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async update(id, data) {
//     try {
//       const one = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async destroy(id) {
//     try {
//       const one = await this.model.findByIdAndDelete(id).exec();
//       return one;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// const repository = new UserRepository(); 
// export default repository;


import UserDTO from "../dto/user.dto.js";
import User from "../data/mongo/models/user.model.js";

class UserRepository {
  constructor() {
    this.model = User;
  }

  async create(data) {
    try {
      data = new UserDTO(data);
      const response = await this.model.create(data);
      console.log("User created:", response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const response = await this.model.paginate(filter, options);
      console.log('Read response from repository:', response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email }).exec();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).exec();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id).exec();
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const repository = new UserRepository(); 
export default repository;
