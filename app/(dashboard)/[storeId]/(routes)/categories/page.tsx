import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { formatDate } from "@/utils/format";

const CategoriesPage = async ({
   params,
}: {
   params: Promise<{ storeId: string }>;
}) => {
   const { storeId } = await params;

   const categories = await prismadb.category.findMany({
      where: {
         storeId,
      },
      include: {
         billboard: true,
      },
      orderBy: {
         createdAt: 'desc'

      }
   });

   const formattedCategories: CategoryColumn[] = categories.map((category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: formatDate(category.createdAt),
   }))
   return <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
         <CategoryClient data={formattedCategories} />
      </div>
   </div>;
}
export default CategoriesPage;