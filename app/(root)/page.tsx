import Collection from "@/components/shared/Collection";
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

  const title = "Discover Precision, Power, and Beauty Below.";

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-28 relative ">
        <div className="wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 relative z-10">
            <h1 className="h1-bold text-white drop-shadow-md">
              Discover Precision, Power, and Beauty Below.
            </h1>

            <p className="p-regular-20 md:p-regular-24 text-white">
              Dive into a World of Excellence: Unleashing Precision, Power, and
              Unparalleled Performance in Every Fin!
            </p>
            <Button
              asChild
              className="button bg-sky-600 border border-sky-500 hover:bg-sky-500 hover:bg-transparent hover:text-white hover:border-sky-500 font-bold w-full sm:w-fit transition-all duration-300 ease-in-out shadow-lg"
              size="lg"
            >
              <Link href="/store">Explore Now</Link>
            </Button>
          </div>

          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              src="/assets/images/hero6.jpg"
              alt="hero"
              fill
              style={{ objectFit: "cover" }}
              className="object-contain object-center"
              priority={true}
            />
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

      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Customize to your hearts desire!</h1>
            <p className="p-regular-20 md:p-regular-24">
              First ever custom fin builder in the Maldives.
            </p>
            <Button
              size="lg"
              asChild
              className="button w-full sm:w-fit border-sky-500 bg-sky-600 border marker: hover:bg-white hover:text-black hover:border-sky-500 font-bold transition-all duration-300 ease-in-out shadow-lg"
            >
              <Link href="/product/customize">Customize Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero4.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
    </>
  );
}
