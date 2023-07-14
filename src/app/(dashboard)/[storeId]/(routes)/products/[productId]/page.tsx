import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../../styled-system/css";
import ProductForm from "./components/product-form";

interface ProductPageProps {
    params: {
        storeId: string;
        productId: string
    }
};

const ProductPage: React.FC<ProductPageProps> = async ({
    params: {
        storeId,
        productId
    }
}) => {

    const product = await prismadb.product.findUnique({
        where: {
            id: productId,
            storeId
        },
        include: {
            images: true
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId
        }
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId
        }
    })

    const colors = await prismadb.color.findMany({
        where: {
            storeId
        }
    })


    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <ProductForm
                data={product}
                categories={categories}
                sizes={sizes}
                colors={colors}
            />
        </div>
    );
};

export default ProductPage;
