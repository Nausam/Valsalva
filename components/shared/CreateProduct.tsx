import { Metadata } from "next";
import React from "react";

import ProductForm from "@/components/shared/ProductForm";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create | Valsalva",
};

const CreateProduct = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  console.log(sessionClaims);

  return (
    <>
      <section>
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Product
        </h3>
      </section>

      <div className="wrapper my-8">
        <ProductForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateProduct;
