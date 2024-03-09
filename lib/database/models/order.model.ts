import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
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
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
  createdAt: Date;
  productTitle: string;
  productId: string;
  buyer: string;
};

export type IOrderSpecificItem = {
  _id: string;
  totalAmount: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
  createdAt: Date;
  product: {
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
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
  footPocketColor: {
    type: String,
    required: true,
  },
  bladeAngle: {
    type: String,
    required: true,
  },
  softness: {
    type: String,
    required: true,
  },
  bladeSize: {
    type: String,
    required: true,
  },
  imageUrl: {
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
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
