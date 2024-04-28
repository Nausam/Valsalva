import { Metadata } from "next";

import { auth } from "@clerk/nextjs";

import { getAllOrders } from "@/lib/actions/order.actions";
import AllOrdersCollection from "./AllOrdersCollection";
import { IOrder } from "@/lib/database/models/order.model";
import Search from "./Search";

export const metadata: Metadata = {
  title: "Orders | Valsalva",
};

interface AllOrdersProps {
  ordersPage: number;
  searchText: string;
}

const AllOrders = async ({ ordersPage, searchText }: AllOrdersProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const result = await getAllOrders({
    query: searchText,
    userId,
    page: ordersPage,
  });

  const orders = result?.data.map((order: IOrder) => order) || [];
  const totalPages = result?.totalPages || 0;

  return (
    <>
      <section>
        <h3 className="wrapper h3-bold text-center sm:text-left mt-4">
          Manage Orders
        </h3>
      </section>

      <section className="wrapper mt-4">
        <Search placeholder="Search by order ID" />
      </section>

      <section className="wrapper my- items-center flex flex-col gap-8">
        <AllOrdersCollection
          data={orders}
          emptyTitle="No products purchased yet"
          emptyStateSubtext="No worries - plenty of products to choose from!"
          collectionType="My_Products"
          limit={6}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={totalPages}
        />
      </section>
    </>
  );
};

export default AllOrders;
