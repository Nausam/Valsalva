"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Order from "@/lib/database/models/order.model";
import Event from "@/lib/database/models/product.model";
import { handleError } from "@/lib/utils";

import {
  CreateUserParams,
  UpdateProfileParams,
  UpdateUserParams,
} from "@/types";
import mongoose from "mongoose";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

//PROFILE COMPLETION
export async function updateProfile(
  clerkId: string,
  user: UpdateProfileParams
) {
  try {
    await connectToDatabase();

    if (!clerkId) {
      throw new Error("Clerk ID is required");
    }

    // Check if all required address fields are provided
    const isProfileCompleted =
      user.address &&
      user.address.street &&
      user.address.city &&
      user.address.zipCode &&
      user.address.country
        ? true
        : false;

    // Prepare the user update object, including the isProfileCompleted status
    const updateData = {
      ...user,
      isProfileCompleted,
    };

    // INSERT ADDRESS TO MONGODB
    const result = await mongoose.connection
      .collection("users")
      .updateOne({ clerkId: clerkId }, { $set: updateData }, { upsert: false });

    if (result.matchedCount === 0) {
      throw new Error("User not found");
    }
    if (result.modifiedCount === 0) {
      throw new Error("User update failed");
    }

    const updatedUser = await mongoose.connection
      .collection("users")
      .findOne({ clerkId: clerkId });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
