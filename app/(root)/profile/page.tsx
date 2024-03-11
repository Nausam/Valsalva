import { Metadata } from "next";

import Collection from "@/components/shared/Collection";
import InventoryCollection from "@/components/shared/InventoryCollection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getProductsByUser } from "@/lib/actions/product.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Valsalva",
};

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  // const productsPage = Number(searchParams?.productsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedProducts =
    orders?.data.map((order: IOrder) => order.product) || [];

  // const organizedProducts = await getProductsByUser({
  //   userId,
  //   page: productsPage,
  // });

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

      <section className="wrapper my-8 items-center flex flex-col gap-8 md:gap-12">
        <InventoryCollection
          data={orderedProducts}
          emptyTitle="No products purchased yet"
          emptyStateSubtext="No worries - plenty of products to choose from!"
          collectionType="My_Products"
          limit={5}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
