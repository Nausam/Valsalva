"use server";

import Stripe from "stripe";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByProductParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Product from "../database/models/product.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price) * 100;

  console.log("ORDER:", order);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.productTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: order.productId,
        buyerId: order.buyerId,
        footPocketColor: order.footPocketColor,
        bladeAngle: order.bladeAngle,
        softness: order.softness,
        bladeSize: order.bladeSize,
        bladeCut: order.bladeCut,
        imageUrl: order.imageUrl,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      product: order.productId,
      buyer: order.buyerId,
      footPocketColor: order.footPocketColor,
      bladeAngle: order.bladeAngle,
      softness: order.softness,
      bladeSize: order.bladeSize,
      bladeCut: order.bladeCut,
      imageUrl: order.imageUrl,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.error("Error creating order:", error);
    handleError(error);
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByProduct({
  searchString,
  productId,
}: GetOrdersByProductParams) {
  try {
    await connectToDatabase();

    if (!productId) throw new Error("Product ID is required");
    const productObjectId = new ObjectId(productId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          productTitle: "$product.title",
          productId: "$product._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { productId: productObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.log(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 10,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("product._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "product",
        model: Product,
        populate: {
          path: "creator",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("product._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersBySpecificUser({
  userId,
  limit = 100,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "product",
        model: Product,
        select: "title",
        populate: {
          path: "creator",
          model: User,
          select: "_id firstName lastName",
        },
      })
      .populate({
        path: "buyer",
        model: User,
        select: "_id firstName lastName",
      });

    console.log(orders);

    const ordersCount = await Order.distinct("product._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getAllOrders({
  limit = 100,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "product",
        model: Product,
        select: "title",
        populate: {
          path: "creator",
          model: User,
          select: "_id firstName lastName",
        },
      })
      .populate({
        path: "buyer",
        model: User,
        select: "_id firstName lastName",
      });

    console.log(orders);

    const ordersCount = await Order.countDocuments();

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
