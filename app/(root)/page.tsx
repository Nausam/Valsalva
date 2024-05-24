import dynamic from "next/dynamic";

import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";

const DynamicHero = dynamic(() => import("@/components/main/Hero"));
const DynamicCollection = dynamic(
  () => import("@/components/shared/Collection")
);
const DynamicAboutUs = dynamic(() => import("@/components/main/AboutUs"));
const DynamicFaq = dynamic(() => import("@/components/main/Faq"));

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const products = await getAllProducts({
    query: searchText,
    category: category,
    page,
    limit: 6,
  });

  return (
    <>
      <DynamicHero />
      <DynamicAboutUs />
      <section id="#products">
        <div className="wrapper my-20 items-center flex flex-col gap-8 md:gap-12 ">
          <h2 className="h2-bold text-gray-800 dark:text-white mt-10">
            Featured Products
          </h2>

          <DynamicCollection
            data={products?.data}
            emptyTitle="No products found"
            emptyStateSubtext="Come back later"
            collectionType="All_Products"
            limit={3}
            homePage={true}
            page={page}
            totalPages={products?.totalPages}
          />
        </div>
      </section>
      <DynamicFaq />
    </>
  );
}
