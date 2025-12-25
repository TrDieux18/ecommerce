import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { formatDate } from "@/utils/format";

const SizesPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const sizes = await prismadb.size.findMany({
      where: {
         storeId,
      },
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedSizes: SizeColumn[] = sizes.map((size) => ({
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: formatDate(size.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <SizeClient data={formattedSizes} />
      </div>
   </div>;
}
export default SizesPage;