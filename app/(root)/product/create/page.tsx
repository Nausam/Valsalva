import ProductForm from "@/components/shared/ProductForm";
import { auth } from "@clerk/nextjs";

import React from "react";

const CreateProduct = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="mt-20">
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
