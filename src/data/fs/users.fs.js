import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

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
      return error.message;
    }
  }

  async createUser(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role || "user",
      };
      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("Usuario creado con id: " + user.id);
      return user.id;
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  }

  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("¡No hay usuarios!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readUserById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        console.log("Leer " + JSON.stringify(one));
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroyUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Usuario eliminado con id: " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UsersManager("./src/data/fs/files/users.json");
export default users;
