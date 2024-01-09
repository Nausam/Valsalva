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

  const isProductCreator = product.creator._id === userId;
  // const isProductCreator = product.creator._id === userId.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[800px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] border hover:border-blue-200 hover:shadow-blue-200 ">
      <Link
        href={`/product/${product._id}`}
        style={{ backgroundImage: `url(${product.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isProductCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/product/${product._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation productId={product._id} />
        </div>
      )}

      <div className="flex min-h-[200px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-500">
              {`$${product.price}`}
            </span>

            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 text-grey-500 flex-center line-clamp-1">
              {product.category.name}
            </p>
          </div>
        )}

        <Link href={`/product/${product._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {product.title}
          </p>
        </Link>

        {/* <div className="flex flex-col gap-2">
          <p className="">{product.description}</p>
        </div> */}

        <div className="flex-between w-full mt-10">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {product.creator.firstName} {product.creator.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?productId=${product._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500 ">Order Details</p>
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
  );
};

export default Card;
