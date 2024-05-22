import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity || 1; 
    this.status = data.status || "reserved"; // Cambio de 'state' a 'status'
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default OrderDTO;
