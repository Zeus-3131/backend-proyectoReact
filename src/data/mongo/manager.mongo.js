import { Types } from "mongoose";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const all = await this.model.find(filter, null, options);
      notFoundOne(all); // Utiliza notFoundOne para manejar no encontrado
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one); // Utiliza notFoundOne para manejar no encontrado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one); // Utiliza notFoundOne para manejar no encontrado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one); // Utiliza notFoundOne para manejar no encontrado
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      const stats = await this.model.aggregate([
        { $match: filter },
        { $group: { _id: null, total: { $sum: 1 } } }
      ]);
      return stats;
    } catch (error) {
      throw error;
    }
  }

  async reportBill(uid) {
    try {
      const currentDate = new Date(); // Obtener la fecha actual
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $set: {
            subtotal: { $multiply: ["$quantity", { $arrayElemAt: ["$product.precio", 0] }] },
          },
        },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        { $project: { _id: 0, user_id: "$_id", total: "$total", date: currentDate } }, // Usar la fecha actual
      ]);

      return report;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoManager;
