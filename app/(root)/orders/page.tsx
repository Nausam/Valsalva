import { Metadata } from "next";

import Search from "@/components/shared/Search";
import {
  getOrdersByProduct,
  getOrdersBySpecificUser,
  getOrdersByUser,
} from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import {
  IOrderItem,
  IOrderSpecificItem,
} from "@/lib/database/models/order.model";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Orders | Valsalva",
};

const Orders = async ({ searchParams }: SearchParamProps) => {
  // const productId = (searchParams?.productId as string) || "";
  // const searchText = (searchParams?.query as string) || "";

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const result = await getOrdersBySpecificUser({
    userId,
    page: 1,
  });

  const orders = result?.data || [];
  // const totalPages = result?.totalPages || 0;

  return (
    <>
      <section className="mt-20">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Order Details
        </h3>
      </section>

      {/* <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section> */}

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t dark:border-t-gray-500">
          <thead>
            <tr className="p-medium-14 border-b dark:border-b-gray-500  text-grey-600 dark:text-gray-300">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Product Title
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Foot Pocket
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Blade Angle
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Softness
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                Blade Size
              </th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b ">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderSpecificItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b dark:border-b-gray-700 "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[200px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[300px] flex-1 py-4 pr-4 dark:text-gray-400">
                        {row.product?.title}
                      </td>
                      <td className="min-w-[100px] flex-1 py-4 pr-4 dark:text-gray-400">
                        {row.footPocketColor}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4 dark:text-gray-400">
                        {row.bladeAngle}
                      </td>
                      <td className="min-w-[100px] flex-1 py-4 pr-4 dark:text-gray-400">
                        {row.softness}
                      </td>
                      <td className="min-w-[300px] flex-1 py-4 pr-4 dark:text-gray-400">
                        {row.bladeSize}
                      </td>
                      <td className="min-w-[200px] py-4 dark:text-gray-400">{`${row.buyer.firstName} ${row.buyer.lastName}`}</td>
                      <td className="min-w-[200px] py-4 dark:text-gray-400">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[50px] py-4 text-right dark:text-gray-400">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
