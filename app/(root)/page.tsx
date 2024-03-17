import Collection from "@/components/shared/Collection";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";

import Hero from "@/components/main/Hero";
import AboutUs from "@/components/main/AboutUs";
import Faq from "@/components/main/Faq";

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
      <Hero />
      <AboutUs />
      <section id="#products">
        <div className="wrapper my-20 items-center flex flex-col gap-8 md:gap-12 ">
          <h2 className="h2-bold text-gray-800 dark:text-white mt-10">
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
        </div>
      </section>
      <Faq />
    </>
  );
}
