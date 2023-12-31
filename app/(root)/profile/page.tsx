import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getProductsByUser } from "@/lib/actions/product.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

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
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center mt-20">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Inventory</h3>

          <Button
            asChild
            className="button hidden sm:flex bg-sky-600 border border-sky-500 hover:bg-sky-500 hover:bg-transparent hover:text-black hover:border-sky-500 font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
            size="lg"
          >
            <Link href="/store">Explore More</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8 ">
        <Collection
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
