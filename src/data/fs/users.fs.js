// import fs from "fs";
// import crypto from "crypto";

// class UsersManager {
//   constructor(path) {
//     this.path = path;
//     this.users = [];
//     this.Photouser = "../../../public/user.png"; // Ruta de la imagen predeterminada
//     this.init();
//   }

//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2);
//         fs.writeFileSync(this.path, data);
//       } else {
//         this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       }
//     } catch (error) {
//       return error.message;
//     }
//   }

//   async createUser(data) {
//     try {
//       const { username, email, password, photo } = data;

//       if (!username || !email || !password) {
//         throw new Error("Los campos 'username', 'email' y 'password' son obligatorios");
//       }

//       const trimmedUsername = username.trim();
//       const trimmedEmail = email.trim();
//       const trimmedPassword = password.trim();
//       const userPhoto = photo || this.Photouser; // Utiliza la foto proporcionada o la predeterminada

//       if (trimmedUsername === '' || trimmedEmail === '' || trimmedPassword === '') {
//         throw new Error("Los campos 'username', 'email' y 'password' no pueden estar vacíos");
//       }

//       const user = {
//         id: crypto.randomBytes(12).toString("hex"),
//         photo: userPhoto,
//         username: trimmedUsername,
//         email: trimmedEmail,
//         password: trimmedPassword,
//         role: data.role || "user",
//       };

//       this.users.push(user);
//       const jsonData = JSON.stringify(this.users, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);

//       console.log("Usuario creado con id: " + user.id);
//       return user.id;
//     } catch (error) {
//       throw error;
//     }
//   }

//   readUsers() {
//     try {
//       if (this.users.length === 0) {
//         throw new Error("¡No hay usuarios!");
//       } else {
//         console.log(this.users);
//         return this.users;
//       }
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   }

//   readUserById(id) {
//     try {
//       const one = this.users.find((each) => each.id === id);
//       if (!one) {
//         throw new Error("No hay ningún usuario con id=" + id);
//       } else {
//         console.log("Leer " + JSON.stringify(one));
//         return one;
//       }
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   }

//   async updateUser(userId, updatedData) {
//     try {
//       const userIndex = this.users.findIndex((user) => user.id === userId);
  
//       if (userIndex === -1) {
//         return "No se encontró ningún usuario con ese ID";
//       }
  
//       const { username, email, password } = updatedData;
  
//       const trimmedUsername = username ? username.trim() : this.users[userIndex].username;
//       const trimmedEmail = email ? email.trim() : this.users[userIndex].email;
//       const trimmedPassword = password ? password.trim() : this.users[userIndex].password;
  
//       const updatedUser = {
//         ...this.users[userIndex],
//         username: trimmedUsername,
//         email: trimmedEmail,
//         password: trimmedPassword,
//       };
  
//       this.users[userIndex] = updatedUser;
  
//       const jsonData = JSON.stringify(this.users, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
  
//       return "Usuario actualizado exitosamente";
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   }

//   async destroyUserById(id) {
//     try {
//       let one = this.users.find((each) => each.id === id);
//       if (!one) {
//         throw new Error("No hay ningún usuario con id=" + id);
//       } else {
//         this.users = this.users.filter((each) => each.id !== id);
//         const jsonData = JSON.stringify(this.users, null, 2);
//         await fs.promises.writeFile(this.path, jsonData);
//         console.log("Usuario eliminado con id: " + id);
//         return id;
//       }
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
//   }
// }

// const users = new UsersManager("./src/data/fs/files/users.json");
// export default users;

// import fs from "fs";
// import { createHash, verifyHash } from "../../utils/hash.util.js"; 
// import notFoundOne from "../../utils/notFoundOne.utils.js";

// class UsersManager {
//   init() {
//     try {
//       const exists = fs.existsSync(this.path);
//       if (!exists) {
//         const data = JSON.stringify([], null, 2);
//         fs.writeFileSync(this.path, data);
//       } else {
//         this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//       }
//     } catch (error) {
//       throw error;
//     }
//   }

//   constructor(path) {
//     this.path = path;
//     this.users = [];
//     this.init();
//   }

//   async create(data) {
//     console.log('Creating user:', data);
//     try {
//       // Cifrar la contraseña antes de guardarla
//       const hashedPassword = createHash(data.password);
      
//       // Crear el objeto de usuario con la contraseña cifrada
//       const user = {
//         ...data,
//         password: hashedPassword,
//       };

//       this.users.push(user);
//       const jsonData = JSON.stringify(this.users, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return user;
//     } catch (error) {
//       console.error('Error in create:', error);
//       throw error;
//     }
//   }

//   read({ filter = {}, options = {} }) {
//     console.log('Reading users with filter:', filter, 'and options:', options);
//     try {
//       let result = [...this.users];

//       // Aplicar filtros
//       if (filter.email) {
//         result = result.filter(user => new RegExp(filter.email, "i").test(user.email));
//       }

//       // Ordenar resultados
//       if (options.sort) {
//         const [key, order] = Object.entries(options.sort)[0];
//         result.sort((a, b) => {
//           if (a[key] < b[key]) return order === 1 ? -1 : 1;
//           if (a[key] > b[key]) return order === 1 ? 1 : -1;
//           return 0;
//         });
//       }

//       // Paginación
//       const limit = options.limit || 20;
//       const page = options.page || 1;
//       const start = (page - 1) * limit;
//       const end = start + limit;
//       result = result.slice(start, end);

//       if (result.length === 0) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return result;
//       }
//     } catch (error) {
//       console.error('Error in read:', error);
//       throw error;
//     }
//   }

//   readOne(id) {
//     console.log('Reading user with id:', id);
//     try {
//       const one = this.users.find((each) => each._id === id);
//       if (!one) {
//         const error = new Error("NOT FOUND!");
//         error.statusCode = 404;
//         throw error;
//       } else {
//         return one;
//       }
//     } catch (error) {
//       console.error('Error in readOne:', error);
//       throw error;
//     }
//   }

//   readByEmail(email) {
//     console.log('Reading user with email:', email);
//     try {
//       const one = this.users.find((each) => each.email === email);
//       if (!one) {
//         return null;
//       } else {
//         return one;
//       }
//     } catch (error) {
//       console.error('Error in readByEmail:', error);
//       throw error;
//     }
//   }

//   async update(eid, data) {
//     console.log('Updating user with id:', eid, 'with data:', data); 
//     try {
//       const one = this.readOne(eid);
//       notFoundOne(one);
//       for (let each in data) {
//         one[each] = data[each];
//       }
//       const jsonData = JSON.stringify(this.users, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       console.error('Error in update:', error);
//       throw error;
//     }
//   }

//   async destroy(id) {
//     console.log('Destroying user with id:', id);
//     try {
//       const one = this.readOne(id);
//       notFoundOne(one);
//       this.users = this.users.filter((each) => each._id !== id);
//       const jsonData = JSON.stringify(this.users, null, 2);
//       await fs.promises.writeFile(this.path, jsonData);
//       return one;
//     } catch (error) {
//       console.error('Error in destroy:', error);
//       throw error;
//     }
//   }
// }

// const users = new UsersManager("./src/data/fs/files/users.json");
// export default users;


import fs from "fs";
import UserDTO from "../../dto/user.dto.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }

  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  async create(data) {
    console.log('Creating user:', data);
    try {
      const userDTO = new UserDTO(data); // Usar UserDTO para encriptar la contraseña
      this.users.push(userDTO);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return userDTO;
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  read({ filter = {}, options = {} }) {
    console.log('Reading users with filter:', filter, 'and options:', options);
    try {
      let result = [...this.users];

      if (filter.email) {
        result = result.filter(user => new RegExp(filter.email, "i").test(user.email));
      }

      if (options.sort) {
        const [key, order] = Object.entries(options.sort)[0];
        result.sort((a, b) => {
          if (a[key] < b[key]) return order === 1 ? -1 : 1;
          if (a[key] > b[key]) return order === 1 ? 1 : -1;
          return 0;
        });
      }

      const limit = options.limit || 20;
      const page = options.page || 1;
      const start = (page - 1) * limit;
      const end = start + limit;
      result = result.slice(start, end);

      if (result.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error in read:', error);
      throw error;
    }
  }

  readOne(id) {
    console.log('Reading user with id:', id);
    try {
      const one = this.users.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      console.error('Error in readOne:', error);
      throw error;
    }
  }

  readByEmail(email) {
    console.log('Reading user with email:', email);
    try {
      const one = this.users.find((each) => each.email === email);
      if (!one) {
        return null;
      } else {
        return one;
      }
    } catch (error) {
      console.error('Error in readByEmail:', error);
      throw error;
    }
  }

  async update(eid, data) {
    console.log('Updating user with id:', eid, 'with data:', data); 
    try {
      const one = this.readOne(eid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      console.error('Error in update:', error);
      throw error;
    }
  }

  async destroy(id) {
    console.log('Destroying user with id:', id);
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.users = this.users.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      console.error('Error in destroy:', error);
      throw error;
    }
  }
}

const users = new UsersManager("./src/data/fs/files/users.json");
export default users;
