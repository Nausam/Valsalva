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
  product: {
    _id: string;
    title: string;
    creator: { _id: string; firstName: string; lastName: string };
    imageUrl: string;
  };
  totalAmount: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  buyer: { _id: string; firstName: string; lastName: string };
  category: { _id: string; name: string };
  creator: { _id: string; firstName: string; lastName: string };
}

export interface IOrderedProduct extends Document {
  _id: string;
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
  product: {
    _id: string;
    title: string;
    creator: { _id: string; firstName: string; lastName: string };
  };
  buyer: { _id: string; firstName: string; lastName: string };
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
