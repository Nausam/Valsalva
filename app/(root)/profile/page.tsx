import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Inventory</h3>

          <Button asChild className="button hidden sm:flex" size="lg">
            <Link href="/#products">Explore More</Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={products?.data}
          emptyTitle="No products purchased yet"
          emptyStateSubtext="No worries - plenty of products to choose from!"
          collectionType="My_Products"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}
    </>
  );
};

export default ProfilePage;
