import { IProduct } from "@/lib/database/models/product.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  product: IProduct;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ product, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isProductCreator =
    product && product.creator && product.creator._id === userId;
  // const isProductCreator = product.creator._id === userId.toString();

  return (
    <div className="relative flex min-h-[280px] w-full max-w-[800px] flex-col overflow-hidden rounded-xl bg-white dark:bg-[#191919] shadow-lg hover:shadow-xl md:min-h-[238px] hover:scale-105 border dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
      <div className="flex flex-col p-5 gap-5">
        <Link href={`/product/${product._id}`} className="">
          <Image
            src={product.imageUrl}
            width={300}
            height={100}
            alt="product image"
            className="flex-1 rounded-lg transition-all duration-300"
          />
        </Link>
        <div className="flex flex-col items-center justify-center gap-5">
          {isProductCreator && !hidePrice && (
            <div className="absolute left-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
              <Link href={`/product/${product._id}/update`}>
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
              </Link>

              {/* <DeleteConfirmation productId={product._id} /> */}
            </div>
          )}

          <Link href={`/product/${product._id}`}>
            <p className="p-medium-16 text-black dark:text-gray-300">
              {product.title}
            </p>
          </Link>

          <div className="flex-center">
            <div className="">
              {!hidePrice && product.isAvailable === true ? (
                <div className="flex gap-2">
                  <span className="p-semibold-14 w-min rounded-full bg-green-100 dark:bg-grey-500/10 px-4 py-1 text-green-500">
                    {`$${product.price}`}
                  </span>

                  <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 text-grey-500 flex-center dark:text-gray-400">
                    {product.category.name}
                  </p>
                </div>
              ) : (
                <p className="p-semibold-14 w-32 rounded-full bg-red-500 p-2 text-white flex-center">
                  Out of Stock
                </p>
              )}
            </div>

            {/* <p className="mt-8 w-60 text-gray-400 flex-center">
              {product.description}
            </p> */}

            {hasOrderLink && (
              <Link
                href={`/orders?eventId=${product._id}`}
                className="flex mt-5 "
              >
                <p className="text-primary-500">Order Details</p>
                <Image
                  src="/assets/icons/arrow.svg"
                  alt="search"
                  width={10}
                  height={10}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
