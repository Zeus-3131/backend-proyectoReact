import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "comments"; 
const schema = new Schema(
  {
    text: { type: String, required: true },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    idcat: { type: Types.ObjectId, ref: "categories" } // Agrega el campo idcat al esquema de Comment
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

// Poblar los campos relacionados al hacer una búsqueda
schema.pre("find", function () {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
});

schema.pre("find", function () {
  this.populate("product_id", "nombre imagen precio");
});

schema.pre("find", function () {
  this.populate("idcat", "-createdAt -updatedAt -__v");
});

const Comment = model(collection, schema);
export default Comment;
