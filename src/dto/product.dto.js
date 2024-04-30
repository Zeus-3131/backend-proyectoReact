import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.nombre = data.nombre; // Cambiando 'title' por 'nombre'
    this.imagen = data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg"; // Manteniendo 'poster' como 'imagen'
    this.precio = data.precio || 10; // Manteniendo 'price' como 'precio'
    this.stock = data.stock || 50; // Manteniendo 'capacity' como 'stock'
    this.date = data.date || new Date();
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
