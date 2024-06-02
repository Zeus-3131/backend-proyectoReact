// import argsUtil from "../utils/args.util.js";
// import crypto from "crypto";

// class ProductDTO {
//   constructor(data) {
//     argsUtil.env !== "prod" &&
//       (this._id = crypto.randomBytes(12).toString("hex"));
//     this.nombre = data.nombre; 
//     this.imagen = data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg"; // Manteniendo 'poster' como 'imagen'
//     this.precio = data.precio || 10; 
//     this.stock = data.stock || 50; 
//     this.idcat= data.idcat || M || F;
//     this.date = data.date || new Date();
//     argsUtil.env !== "prod" && (this.updatedAt = new Date());
//     argsUtil.env !== "prod" && (this.createdAt = new Date());
//   }
// }

// export default ProductDTO;


// import argsUtil from "../utils/args.util.js";
// import crypto from "crypto";

// class ProductDTO {
//   constructor(data) {
//     // Generar un ID aleatorio en entornos que no sean producción
//     argsUtil.env !== "prod" &&
//       (this._id = crypto.randomBytes(12).toString("hex"));

//     // Asignación de propiedades con valores por defecto
//     this.nombre = data.nombre;
//     this.imagen = data.imagen || "https://i.postimg.cc/HxdvTwqJ/events.jpg";
//     this.precio = data.precio || 10;
//     this.stock = data.stock || 50;

//     // Validación y asignación del idcat
//     const validCategories = ["M", "F"];
//     if (validCategories.includes(data.idcat)) {
//       this.idcat = data.idcat;
//     } else {
//       throw new Error(`Invalid idcat value: ${data.idcat}. Allowed values are ${validCategories.join(", ")}`);
//     }

//     this.date = data.date || new Date();
//     argsUtil.env !== "prod" && (this.updatedAt = new Date());
//     argsUtil.env !== "prod" && (this.createdAt = new Date());
//   }
// }

// export default ProductDTO;










// src/dto/product.dto.js
import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    if (argsUtil.env !== "prod") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.nombre = data.nombre;
    this.imagen = data.imagen || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.precio = data.precio || 300000;
    this.stock = data.stock || 50;

    const validCategories = ["M", "F"];
    if (validCategories.includes(data.idcat)) {
      this.idcat = data.idcat;
    } else {
      throw new Error(`Invalid idcat value: ${data.idcat}. Allowed values are ${validCategories.join(", ")}`);
    }

    this.date = data.date || new Date();
    if (argsUtil.env !== "prod") {
      this.updatedAt = new Date();
      this.createdAt = new Date();
    }
  }
}

export default ProductDTO;
