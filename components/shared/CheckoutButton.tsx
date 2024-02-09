"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import FootPocketColorSelect from "./FootPocketColorSelect";

const CheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();

  const userId = user?.publicMetadata.userId as string;
  const [selectedColor, setSelectedColor] = React.useState<string>("");

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
          <FootPocketColorSelect
            onSelectColor={(color) => setSelectedColor(color)}
          />
          <Checkout
            product={product}
            userId={userId}
            selectedColor={selectedColor}
          />
        </SignedIn>
      </>
    </div>
  );
};

export default CheckoutButton;
