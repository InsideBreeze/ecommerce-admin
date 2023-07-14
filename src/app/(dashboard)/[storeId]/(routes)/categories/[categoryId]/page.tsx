import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../../styled-system/css";
import CategoryForm from "./components/category-form";

interface CategoryPageProps {
    params: {
        storeId: string;
        categoryId: string
    }
};

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params: {
        storeId,
        categoryId
    }
}) => {

    const category = await prismadb.category.findUnique({
        where: {
            id: categoryId,
            storeId
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: storeId
        }
    });

    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <CategoryForm data={category} billboards={billboards} />
        </div>
    );
};

export default CategoryPage;
