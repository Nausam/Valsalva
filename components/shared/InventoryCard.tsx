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

const InventoryCard = async ({
  product,
  hasOrderLink,
  hidePrice,
}: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isProductCreator =
    product && product.creator && product.creator._id === userId;
  // const isProductCreator = product.creator._id === userId.toString();

  return (
    <div className="flex flex-col overflow-hidden rounded-sm bg-white dark:bg-[#191919] shadow-lg hover:shadow-xl border dark:border-gray-800 transition-all duration-300 sm:w-[500px] w-[400px]">
      <div className="flex md:justify-between items-center md:flex-row flex-col p-5 gap-5 ">
        <div className="flex flex-col gap-5">
          <p className="p-medium-18 md:p-medium-20 text-black dark:text-gray-300">
            {product.product.title}
          </p>

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

                      <AlertDialogHeader className="mt-3">
                        <AlertDialogTitle>Foot Pocket Color</AlertDialogTitle>
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

                      <AlertDialogHeader className="mt-3">
                        <AlertDialogTitle>Hardness</AlertDialogTitle>
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

                      <AlertDialogFooter>
                        <AlertDialogCancel className="border border-[#343434] hover:scale-105 hover:bg-transparent transition-all duration-300">
                          Close
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
