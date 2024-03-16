import { Metadata } from "next";

import { getProductById } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import CanvasModelHolder from "@/components/shared/CanvasModelHolder";
import CustomCheckoutButton from "@/components/shared/CustomCheckoutButton";

export const metadata: Metadata = {
  title: "Details | Valsalva",
};

const ProductDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const product = await getProductById(id);

  return (
    <>
      <section className="flex justify-center md:mt-16 mt-20">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 2xl:max-w-7xl sm:py-10 items-center">
          <div className="flex items-center justify-center h-full">
            <Suspense fallback={<div>Loading...</div>}>
              <CanvasModelHolder />
            </Suspense>
          </div>

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex max-w-2xl">
                <div className="mt-5">
                  {product.isAvailable === true && (
                    <CustomCheckoutButton product={product} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
