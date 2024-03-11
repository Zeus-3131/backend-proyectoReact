import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }

  async createProduct(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        price: data.price || 10,
        stock: data.stock || 50,
        category: data.category || "General",
      };
      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("Producto creado con id: " + product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  }

  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("¡No hay productos!");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        console.log("Leer " + JSON.stringify(one));
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroyProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Producto eliminado con id: " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductsManager("./src/data/fs/files/products.json");
export default products;
