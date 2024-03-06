"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  const [selectedFootPocketColor, setSelectedFootPocketColor] = useState("");

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    setSelectedFootPocketColor(selectedColor);
  };
  return (
    <div className="flex items-center gap-3">
      <>
        <SignedOut>
          <Button
            asChild
            size="lg"
            className="button bg-black dark:text-black dark:bg-white border-black border sm:w-fit hover:bg-transparent hover:text-black hover:border-black dark:hover:bg-transparent dark:border-white dark:hover:text-white shadow-lg transition-all duration-300"
          >
            <Link href="/sign-in">Buy</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="footPocketColorSelect"
            onChange={handleColorChange}
          >
            <option value="">Select Foot Pocket Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>

          <Checkout
            product={product}
            userId={userId}
            footPocketColor={selectedFootPocketColor}
          />
        </SignedIn>
      </>
    </div>
  );
};

export default CheckoutButton;
