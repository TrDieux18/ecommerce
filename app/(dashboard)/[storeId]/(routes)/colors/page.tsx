import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import { formatDate } from "@/utils/format";

const ColorsPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const colors = await prismadb.color.findMany({
      where: {
         storeId,
      },
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedColors: ColorColumn[] = colors.map((color) => ({
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: formatDate(color.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <ColorClient data={formattedColors} />
      </div>
   </div>;
}
export default ColorsPage;