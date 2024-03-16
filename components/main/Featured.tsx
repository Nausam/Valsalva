import React from "react";

import Collection from "@/components/shared/Collection";

import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";

const Featured = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const products = await getAllProducts({
    query: searchText,
    category: category,
    page,
    limit: 3,
  });

  return (
    <section
      id="#products"
      className="wrapper my-20 items-center flex flex-col gap-8 md:gap-12"
    >
      <h2 className="h2-bold text-gray-800 dark:text-white">
        Featured Products
      </h2>

      <Collection
        data={products?.data}
        emptyTitle="No products found"
        emptyStateSubtext="Come back later"
        collectionType="All_Products"
        limit={3}
        homePage={true}
        page={page}
        totalPages={products?.totalPages}
      />
    </section>
  );
};

export default Featured;
