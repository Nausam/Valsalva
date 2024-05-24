import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllOrders from "@/components/shared/AllOrders";
import CreateProduct from "@/components/shared/CreateProduct";
import { SearchParamProps } from "@/types";

const AdminPage = ({ searchParams }: SearchParamProps) => {
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const searchText = (searchParams?.query as string) || "";
  return (
    <div className="wrapper mt-20">
      <Tabs defaultValue="orders">
        <TabsList className="dark:bg-[#191919]">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <AllOrders ordersPage={ordersPage} searchText={searchText} />
        </TabsContent>
        <TabsContent value="create">
          <CreateProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
