import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
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
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Discover Precision, Power, and Beauty Below.
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Dive into a World of Excellence: Unleashing Precision, Power, and
              Unparalleled Performance in Every Fin!
            </p>
            <Button
              asChild
              className="button bg-black hover:bg-slate-800 w-full sm:w-fit"
              size="lg"
            >
              <Link href="#products">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero4.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
          />
        </div>
      </section>

      <section
        id="products"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Featured Products</h2>

        {/* <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div> */}

        <Collection
          data={products?.data}
          emptyTitle="No products found"
          emptyStateSubtext="Come back later"
          collectionType="All_Products"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
