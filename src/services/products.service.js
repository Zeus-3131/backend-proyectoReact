// import repository from "../repositories/products.rep.js"; // Reemplazando events.rep.js por products.rep.js
// import ProductDTO from "../dto/product.dto.js"; // Cambiando EventDTO por ProductDTO

// class ProductsService { // Cambiando EventsService por ProductsService
//   constructor() {
//     this.repository = repository;
//   } 
//   create = async (data) => {
//     data = new ProductDTO(data); // Cambiando EventDTO por ProductDTO
//     const response = await this.repository.create(data);
//     return response;
//   };
//   read = async ({ filter, options }) =>
//     await this.repository.read({ filter, options });
//   readOne = async (id) => await this.repository.readOne(id);
//   update = async (id, data) => await this.repository.update(id, data);
//   destroy = async (id) => await this.repository.destroy(id);
// }

// const service = new ProductsService(); // Cambiando EventsService por ProductsService
// export default service;


import repository from "../repositories/products.rep.js";
import ProductDTO from "../dto/product.dto.js";

class ProductsService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    data = new ProductDTO(data);
    const response = await this.repository.create(data);
    return response;
  };

  read = async ({ filter, options }) => await this.repository.read({ filter, options });

  readOne = async (id) => await this.repository.readOne(id);

  update = async (id, data) => await this.repository.update(id, data);

  destroy = async (id) => await this.repository.destroy(id);
}

const service = new ProductsService();
export default service;
