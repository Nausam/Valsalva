import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  product: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  footPocketColor: string;
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  productTitle: string;
  productId: string;
  buyer: string;
  footPocketColor: string;
};

export type IOrderSpecificItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  product: {
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  footPocketColor: string;
};

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  footPocketColor: {
    type: String,
    required: true,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
