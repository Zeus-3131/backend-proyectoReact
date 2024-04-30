import fs from "fs";
import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductsManager {
  #ivaRate = 0.19; // Tasa de IVA en Colombia

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
      throw error;
    }
  }

  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  async create(data) {
    try {
      if (!data.nombre || data.nombre.trim() === '') {
        throw new Error("El nombre del producto es requerido");
      }

      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        nombre: data.nombre,
        imagen: data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg",
        precio: data.precio || 300000,
        stock: data.stock || 50,
        date: data.date || new Date(),
      };

      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

      console.log("Producto creado con id: " + product.id);
      return product.id;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (this.products.length === 0) {
        throw new Error("¡No hay productos!");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      notFoundOne(one); // Utiliza notFoundOne para manejar no encontrado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readProductById(id);
      notFoundOne(one); // Utiliza notFoundOne para manejar no encontrado
      this.products = this.products.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("Producto eliminado con id: " + id);
      return id;
    } catch (error) {
      throw error;
    }
  }

  async productSold(quantity, pid) {
    try {
      const product = this.readProductById(pid);
      if (product) {
        if (product.stock >= quantity) {
          product.stock = product.stock - quantity;
          const subtotal = product.precio * quantity;
          const ivaAmount = subtotal * this.#ivaRate;
          const totalAmount = subtotal + ivaAmount;

          const jsonData = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, jsonData);

          console.log(`Producto vendido. Stock disponible: ${product.stock}`);
          console.log(`Subtotal: ${subtotal}`);
          console.log(`IVA (${this.#ivaRate * 100}%): ${ivaAmount}`);
          console.log(`Total: ${totalAmount}`);

          return product.stock;
        } else {
          throw new Error("No hay suficiente stock del producto.");
        }
      } else {
        throw new Error("No hay ningún producto con id=" + pid);
      }
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager("./src/data/fs/files/products.json");
export default productsManager;
