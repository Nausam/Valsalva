import { Metadata } from "next";

import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getProductById,
  getRelatedProductsByCategory,
} from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Details | Valsalva",
};

const ProductDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const product = await getProductById(id);

  const similarProducts = await getRelatedProductsByCategory({
    categoryId: product.category._id,
    productId: product._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center md:mt-10 mt-20">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2  2xl:max-w-7xl sm:py-10 items-center">
          <Image
            src={product.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            style={{ objectFit: "cover" }}
            className="rounded-sm"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold"> {product.title} </h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  {product.isAvailable === true ? (
                    <p className="p-bold-20 bg-grey-500/10 rounded-sm px-5 py-2">{`$${product.price}`}</p>
                  ) : (
                    <p className="p-medium-16 rounded-sm bg-grey-500/10 px-4 py-2.5">
                      Out of stock
                    </p>
                  )}

                  <p className="p-medium-16 rounded-sm bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {product.category.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 dark:text-gray-300">
                Description
              </p>

              <p className="p-medium-16 lg:p-medium-18 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>

              {/* <div className="mt-5">
                {product.isAvailable === true && (
                  <CheckoutButton product={product} />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper w-full">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="p-bold-20 text-grey-600 dark:text-gray-300">
            <p className="mb-3">Foot Pocket Color</p>
          </div>

          <div className="mt-10">
            {product.isAvailable === true && (
              <CheckoutButton product={product} />
            )}
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex-col gap-8 md:gap-12 mt-10">
        <h2 className="h2-bold">Similar Products</h2>

        <div className="mt-10">
          <Collection
            data={similarProducts?.data}
            emptyTitle="No similar products found!"
            emptyStateSubtext="Come back later"
            collectionType="All_Products"
            limit={3}
            page={searchParams.page as string}
            totalPages={similarProducts?.totalPages}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
