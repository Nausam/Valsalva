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

const InventoryCard = ({ product, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isProductCreator =
    product && product.creator && product.creator._id === userId;
  // const isProductCreator = product.creator._id === userId.toString();

  return (
    <div className="relative flex min-h-[380px] w-full max-w-[800px] flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl md:min-h-[238px]">
      <div className="flex md:justify-between md:flex-row flex-col p-5 gap-5">
        <Link href={`/product/${product._id}`} className="">
          <Image
            src={product.imageUrl}
            width={450}
            height={100}
            alt="product image"
            className="flex-1"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <Link href={`/product/${product._id}`}>
            <p className="p-medium-18 md:p-medium-20 text-black">
              {product.title}
            </p>
          </Link>

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

          <div className="flex-start">
            <div className="">
              {!hidePrice ? (
                <div className="flex gap-2">
                  <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-500">
                    {`$${product.price}`}
                  </span>

                  <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 text-grey-500 flex-center">
                    {product.category.name}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <p className="p-semibold-14 w-min p-2 rounded-full border border-green-500 px-4 text-green-600 flex-center">
                    Purchased
                  </p>

                  {hasOrderLink && (
                    <Link href={`/orders?eventId=${product._id}`}>
                      <p className="p-semibold-14 w-36 p-2 rounded-full border border-sky-500 bg-sky-600 px-4 text-white flex-center hover:bg-white hover:text-black transition-all duration-300">
                        Order Details
                      </p>
                      {/* <Image
                  src="/assets/icons/arrow.svg"
                  alt="search"
                  width={10}
                  height={10}
                /> */}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <p className="p-semibold-14 mt-5 w-60 text-grey-500 flex-center">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
