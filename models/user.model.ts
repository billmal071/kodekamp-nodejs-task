import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    message: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Model = model(
  "user",
  schema
);
export default Model;
