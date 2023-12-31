import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";

import { css } from "../../../../../../styled-system/css";

interface CategoryPageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params
}) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            "billboard": true
        }
    })

    const formattedCategorys = categories.map(category => ({
        id: category.id,
        name: category.name,
        createdAt: format(category.createdAt, "MMMM do, yyyy"),
        billboard: category.billboard.label
    }))

    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <CategoryClient data={formattedCategorys} />
        </div>
    );
};

export default CategoryPage;
