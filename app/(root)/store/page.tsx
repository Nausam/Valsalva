import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";

export default async function Store({ searchParams }: SearchParamProps) {
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
      <section
        id="products"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12 mt-20"
      >
        <h2 className="h2-bold">Store</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={products?.data}
          emptyTitle="No products found"
          emptyStateSubtext="Come back later"
          collectionType="All_Products"
          limit={3}
          homePage={false}
          page={page}
          totalPages={products?.totalPages}
        />
      </section>
    </>
  );
}
