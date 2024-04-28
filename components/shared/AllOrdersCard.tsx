import { IProduct } from "@/lib/database/models/product.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CardProps = {
  product: IProduct;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const AllOrdersCard = async ({
  product,
  hasOrderLink,
  hidePrice,
}: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isProductCreator =
    product && product.creator && product.creator._id === userId;
  // const isProductCreator = product.creator._id === userId.toString();

  const createdAtFormatted = formatDate(product.createdAt);

  return (
    <div className="flex flex-col overflow-hidden rounded-sm bg-white dark:bg-[#191919] shadow-lg hover:shadow-xl border dark:border-gray-800 transition-all duration-300 sm:w-[500px] w-[350px]">
      <div className="flex md:justify-between items-center md:flex-row flex-col p-5 gap-5 ">
        <div className="flex flex-col gap-5 w-full">
          <p className="p-medium-18 md:p-medium-20 text-black dark:text-gray-300">
            {product.product.title}
          </p>

          {/* {isProductCreator && !hidePrice && (
            <div className="absolute left-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
              <Link href={`/product/${product._id}/update`}>
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          )} */}

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
                  {/* <p className="p-semibold-14 w-min p-2 rounded-sm border border-green-500 px-4 text-green-600 flex-center">
                    Purchased
                  </p> */}

                  {/* {hasOrderLink && (
                    <Link href={`/orders/my-order/${product._id}`}>
                      <p className="p-semibold-14 w-36 p-2 rounded-sm border border-black/75 bg-black/80 px-4 text-white flex-center hover:bg-transparent dark:bg-gray-200 dark:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white hover:text-black transition-all duration-300">
                        Order Details
                      </p>
                    </Link>
                  )} */}

                  <div className="flex w-full justify-between">
                    <AlertDialog>
                      <AlertDialogTrigger className="p-semibold-14 w-36 p-2 rounded-sm border dark:border-[#343434] hover:scale-105 hover:shadow-md transition-all duration-300">
                        Order Details
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white dark:bg-[#191919] border-2 dark:border-gray-800">
                        <AlertDialogHeader>
                          {/* <Image
                          src={product.product.imageUrl}
                          width={300}
                          height={70}
                          alt="product image"
                          className="flex-1 rounded-sm mx-auto"
                        /> */}
                          <AlertDialogTitle className="flex h3-bold justify-center text-center mb-5">
                            <div>{product.product.title}</div>
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <p className="flex mx-auto">{product._id}</p>

                        <div className="flex justify-between gap-3 mt-5">
                          <div className="flex flex-col gap-5">
                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Customer</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {product.buyer?.firstName}&nbsp;
                                {product.buyer?.lastName}
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Foot Pocket</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {product.footPocketColor}
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Blade Angle</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {product.bladeAngle}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                          </div>

                          <div className="flex flex-col gap-5">
                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Softness</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {product.softness}
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Blade Size</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {product.bladeSize}
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogHeader className="mt-3">
                              <AlertDialogTitle>Total Price</AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 dark:text-gray-300 text-black">
                                {`$${product.totalAmount}`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                          </div>
                        </div>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="border border-[#343434] hover:scale-105 hover:bg-transparent transition-all duration-300">
                            Close
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <p className="p-medium-8 text-black dark:text-gray-300">
                      {createdAtFormatted}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrdersCard;

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString); // Convert string to Date object
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};
