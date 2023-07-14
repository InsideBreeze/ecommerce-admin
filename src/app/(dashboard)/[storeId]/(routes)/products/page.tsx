import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import ProductClient from "./components/client";

interface ProductPageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        }
    })

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category.name,
        size: product.size.name,
        color: product.color.name,
        price: Number(product.price),
        isArchived: product.isArchived,
        isFeatured: product.isFeatured,
        createdAt: format(product.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <ProductClient data={formattedProducts} />
        </div>
    );
};

export default ProductPage;
