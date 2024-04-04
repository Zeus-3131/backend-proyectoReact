import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const collection = "users";
const schema = new Schema(
  { 
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    username: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
<<<<<<< HEAD
    role: { type: Number, default: 0 },
=======
    role: { type: String, default: "user" },
>>>>>>> 7bd71d8b1780526666cd3a2122f4536857a44108
    age: { type: Number, default: 18 }
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
 
const User = model(collection, schema);
export default User;
