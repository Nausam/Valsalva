import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IProduct } from "@/lib/database/models/product.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CustomCheckout = ({
  product,
  userId,
  footPocketColor,
  bladeAngle,
  softness,
  bladeSize,
  bladeCut,
  imageUrl,
}: {
  product: IProduct;
  userId: string;
  footPocketColor: string;
  bladeAngle: string;
  softness: string;
  bladeSize: string;
  bladeCut: string;
  imageUrl: string;
}) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      productTitle: "Custom Fins",
      productId: "Custom",
      price: "500",
      buyerId: userId,
      footPocketColor: footPocketColor,
      bladeAngle: bladeAngle,
      softness: softness,
      bladeSize: bladeSize,
      bladeCut: bladeCut,
      imageUrl: imageUrl,
    };
    console.log("Order Details:", order);
    await checkoutOrder(order);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onCheckout();
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        className="button bg-black dark:text-black dark:bg-white border-black border sm:w-fit hover:bg-transparent hover:text-black hover:border-black dark:hover:bg-transparent dark:border-white dark:hover:text-white shadow-lg transition-all duration-300"
      >
        Buy Now
      </Button>
    </form>
  );
};

export default CustomCheckout;
