import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  productId: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  price: string;
  isAvailable: boolean;
  footPocketColor: string;
  category: { _id: string; name: string };
  creator: { _id: string; firstName: string; lastName: string };
}

const ProductSchema = new Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: String },
  isAvailable: { type: Boolean, default: true },
  footPocketColor: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
