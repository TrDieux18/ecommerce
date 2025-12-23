import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { formatDate } from "@/utils/format";

const BillboardsPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const billboards = await prismadb.billboard.findMany({
      where: {
         storeId,
      },
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: formatDate(billboard.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <BillboardClient data={formattedBillboards} />
      </div>
   </div>;
}
export default BillboardsPage;