import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllOrders from "@/components/shared/AllOrders";
import CreateProduct from "@/components/shared/CreateProduct";

const AdminPage = () => {
  return (
    <div className="wrapper mt-20">
      <Tabs defaultValue="orders">
        <TabsList className="dark:bg-[#191919]">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">Loading...</div>
            }
          >
            <AllOrders />
          </Suspense>
        </TabsContent>
        <TabsContent value="create">
          <CreateProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
