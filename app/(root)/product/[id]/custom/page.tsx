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
import { auth } from "@clerk/nextjs";
import CanvasModelHolder from "@/components/shared/CanvasModelHolder";

export const metadata: Metadata = {
  title: "Details | Valsalva",
};

const ProductDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const product = await getProductById(id);

  const similarProducts = await getRelatedProductsByCategory({
    categoryId: product.category._id,
    productId: product._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center md:mt-16 mt-20">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2  2xl:max-w-7xl sm:py-10 items-center">
          <CanvasModelHolder />
          {/* <Image
            src={product.imag<CanvasModelHolder />eUrl}
            alt="hero image"
            width={1000}
            height={1000}
            style={{ objectFit: "cover" }}
            className="rounded-sm"
          /> */}

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex max-w-2xl">
                <div className="mt-5">
                  {product.isAvailable === true && (
                    <CheckoutButton product={product} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="wrapper w-full">
        <div className="flex max-w-2xl">
          <div className="mt-5">
            {product.isAvailable === true && (
              <CheckoutButton product={product} />
            )}
          </div>
        </div>
      </section> */}

      {/* <section className="wrapper my-8 flex-col gap-8 md:gap-12 mt-10">
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
      </section> */}
    </>
  );
};

export default ProductDetails;
