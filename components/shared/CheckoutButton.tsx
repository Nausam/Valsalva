"use client";

import { IProduct } from "@/lib/database/models/product.model";
import { SignedOut } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ product }: { product: IProduct }) => {
  const { user } = useUser();

  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3">
      <>
        <SignedOut>
          <Button asChild className="button">
            <Link href="/sign-in">Buy</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <Checkout product={product} userId={userId} />
        </SignedIn>
      </>
    </div>
  );
};

export default CheckoutButton;
