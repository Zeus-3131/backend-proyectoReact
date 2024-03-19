import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  { 
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    age: { type: Number, default: 18 }
  },
  { timestamps: true }
);
 
const User = model(collection, schema);
export default User;
