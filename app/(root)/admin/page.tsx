import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllOrders from "@/components/shared/AllOrders";
import CreateProduct from "@/components/shared/CreateProduct";

const AdminPage = () => {
  return (
    <div className="wrapper mt-20">
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <AllOrders />
        </TabsContent>
        <TabsContent value="create">
          <CreateProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
