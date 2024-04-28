import { Metadata } from "next";

import { auth } from "@clerk/nextjs";
import Link from "next/link";

import InventoryCollection from "@/components/shared/InventoryCollection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { useState } from "react";
import { getUserById, updateProfile } from "@/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import ProfileCompletion from "@/components/shared/ProfileCompletion";
import console from "console";

export const metadata: Metadata = {
  title: "Profile | Valsalva",
};

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  // const productsPage = Number(searchParams?.productsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage, query: "" });

  const orderedProducts = orders?.data.map((order: IOrder) => order) || [];

  const userDetails = await getUserById(userId);

  return (
    <>
      <section className="mt-20">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Profile</h3>

          <Button
            asChild
            className="button hidden sm:flex bg-black border border-black hover:bg-transparent  hover:text-black dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white dark:border-white font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
            size="lg"
          >
            <Link href="/shop">Explore More</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper w-full my-8 justify-start flex flex-col dark:bg-[#181818] border dark:border-gray-800 bg-white shadow-lg rounded-sm">
        <div className="flex md:flex-nowrap flex-wrap gap-3 p-5">
          <div className="flex w-full flex-col">
            <h3 className="p-regular-20">Country</h3>
            <p className="p-regular-10 rounded-md p-3 dark:bg-[#141414]/70 bg-gray-100/50">
              {userDetails.address?.country || "-"}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <h3 className="p-regular-20">City</h3>
            <p className="p-regular-10 rounded-md p-3 dark:bg-[#141414]/70 bg-gray-100/50">
              {userDetails.address?.city || "-"}
            </p>
          </div>

          <div className="flex w-full flex-col ">
            <h3 className="p-regular-20">Phone Number</h3>
            <p className="p-regular-10 rounded-md p-3 dark:bg-[#141414]/70 bg-gray-100/50">
              {userDetails.address?.phoneNumber || "-"}
            </p>
          </div>
        </div>

        <div className="flex md:flex-nowrap flex-wrap gap-3 p-5">
          <div className="flex w-full flex-col">
            <h3 className="p-regular-20">Street</h3>
            <p className="p-regular-10 rounded-md p-3 dark:bg-[#141414]/70 bg-gray-100/50">
              {userDetails.address?.street || "-"}
            </p>
          </div>

          <div className="flex w-full flex-col ">
            <h3 className="p-regular-20">Zip Code</h3>
            <p className="p-regular-10 rounded-md p-3 dark:bg-[#141414]/70 bg-gray-100/50">
              {userDetails.address?.zipCode || "-"}
            </p>
          </div>
        </div>
        <div className="p-5">
          <Button
            asChild
            className="button  border dark:border-[#444444] border-[#cecece] bg-transparent hover:bg-transparent dark:text-white text-black  font-bold w-full sm:w-fit hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg"
            size="lg"
          >
            <Link href="/profile/update-profile">Update Profile</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 items-center flex flex-col gap-8 md:gap-12 mt-20">
        <h3 className="flex h3-bold justify-start sm:text-left">Inventory</h3>

        <InventoryCollection
          data={orderedProducts}
          emptyTitle="No products purchased yet"
          emptyStateSubtext="No worries - plenty of products to choose from!"
          collectionType="My_Products"
          limit={6}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
