import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

import Shapes from "@/components/Canvas/Shapes";
import LogoCanvas from "@/components/Canvas/LogoCanvas";

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
      <section className="md:mt-28 mt-20 relative ">
        <div className="wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 relative z-10">
            <h1 className="h1-bold drop-shadow-md">
              Discover Precision, Power, and Beauty Below.
            </h1>

            <p className="p-regular-20 md:p-regular-24 text-gray-700 dark:text-gray-300">
              Dive into a World of Excellence: Unleashing Precision, Power, and
              Unparalleled Performance in Every Fin!
            </p>
            <Button
              asChild
              className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white rounded-sm font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
              size="lg"
            >
              <Link href="/shop">Explore Now</Link>
            </Button>
          </div>

          <div className="flex items-start justify-start w-full h-[500px]">
            <LogoCanvas />
          </div>

          {/* <Shapes /> */}

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

      <section className="wrapper flex flex-wrap justify-between text-center gap-10 mt-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0 items-center justify-center">
          <Image
            src="/assets/images/hero4.png"
            alt="hero"
            width={400}
            height={400}
            className="object-contain object-center mx-auto"
          />

          <div className="flex flex-col justify-center gap-8 mt-16">
            <h2 className="h2-bold text-gray-800 dark:text-white text-start">
              About Us
            </h2>
            <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 text-start">
              Welcome to Valsalva, your premium destination for customizable
              snorkel fins tailored to meet your exact preferences and needs. At
              Valsalva, we are passionate about providing snorkel enthusiasts
              with the ultimate experience in comfort, performance, and style.
            </p>
            <Button
              size="lg"
              asChild
              className="button bg-black border border-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:border-black dark:hover:border-white dark:text-black dark:hover:bg-transparent dark:hover:text-white  font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg mt-5"
            >
              <Link href="/product/customize">Customize Now</Link>
            </Button>
          </div>
        </div>

        <div className="wrapper flex flex-wrap justify-between text-center gap-20 mt-20">
          <div className="max-w-xl">
            <h2 className="h2-bold text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
              Revolutionize snorkeling with fully customizable fins, enhancing
              adventure and performance.
            </p>
          </div>
          <div className="max-w-xl">
            <h2 className="h2-bold text-gray-800 dark:text-white">
              What Sets Us Apart
            </h2>
            <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
              Our state-of-the-art fin customizer lets you design the perfect
              fins, reflecting your style.
            </p>
          </div>

          <div className="max-w-xl">
            <h2 className="h2-bold text-gray-800 dark:text-white">
              Quality and Innovation
            </h2>
            <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
              Crafted with advanced materials for durability, comfort, and
              unmatched performance.
            </p>
          </div>

          <div className="max-w-xl">
            <h2 className="h2-bold text-gray-800 dark:text-white">
              Expert Craftsmanship
            </h2>
            <p className="p-regular-20 md:p-regular-18 text-gray-700 dark:text-gray-300 mt-5">
              Handcrafted by skilled artisans, ensuring excellence in every
              detail.
            </p>
          </div>
        </div>
      </section>

      <section
        id="#products"
        className="wrapper my-20 items-center flex flex-col gap-8 md:gap-12"
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
