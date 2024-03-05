import { IProduct } from "@/lib/database/models/product.model";
import React from "react";
import Pagination from "./Pagination";
import Card from "./Card";
import InventoryCard from "./InventoryCard";

type CollectionProps = {
  data: IProduct[];
  emptyTitle: string;
  emptyStateSubtext: string;
  homePage?: boolean;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Products_Created" | "My_Products" | "All_Products";
};

const InventoryCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  homePage = false,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 ">
          <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 xl:gap-10">
            {data.map((product, index) => {
              const hasOrderLink = collectionType === "My_Products";
              const hidePrice = collectionType === "My_Products";

              return (
                <li key={index} className="flex justify-center">
                  <InventoryCard
                    product={product}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {!homePage === true && totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center dark:bg-[#181818]">
          <h3 className="p-bold-20 md:h5-bold"> {emptyTitle} </h3>
          <p className="p-regular-14"> {emptyStateSubtext} </p>
        </div>
      )}
    </>
  );
};

export default InventoryCollection;
