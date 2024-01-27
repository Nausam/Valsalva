import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

import Shapes from "@/components/Canvas/Shapes";

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

  const title = "Discover Precision, Power, and Beauty Below.";

  return (
    <>
      <section className="py-28 relative ">
        <div className="wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 relative z-10">
            <h1 className="h1-bold drop-shadow-md">
              Discover Precision, Power, and Beauty Below.
            </h1>

            <p className="p-regular-20 md:p-regular-24 ">
              Dive into a World of Excellence: Unleashing Precision, Power, and
              Unparalleled Performance in Every Fin!
            </p>
            <Button
              asChild
              className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
              size="lg"
            >
              <Link href="/store">Explore Now</Link>
            </Button>
          </div>

          <Shapes />

          {/* <div className="absolute top-0 left-0 right-0 bottom-0 ">
            <Image
              src="/assets/images/hero6.jpg"
              alt="hero"
              fill
              style={{ objectFit: "cover" }}
              className="object-contain object-center"
              priority={true}
            />
          </div> */}
        </div>
      </section>

      <section className="py-5 md:py-24 mx-auto">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <Image
            src="/assets/images/hero4.png"
            alt="hero"
            width={400}
            height={400}
            className="object-contain object-center "
          />

          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Customize to your hearts desire!</h1>
            <p className="p-regular-20 md:p-regular-24 text-gray-500">
              First ever custom fin builder in the Maldives.
            </p>
            <Button
              size="lg"
              asChild
              className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
            >
              <Link href="/product/customize">Customize Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="#products"
        className="wrapper my-8 items-center flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Featured Products</h2>

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
    </>
  );
}
