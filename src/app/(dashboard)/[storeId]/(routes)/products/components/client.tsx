"use client";

import Heading from "@/components/ui/heading";
import { divider, flex, hstack, wrap } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { Plus } from "lucide-react";
import { css } from "../../../../../../../styled-system/css";
import { useParams, useRouter } from "next/navigation";
import columns, { ProductColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
    data: ProductColumn[]
};

const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {

    const router = useRouter();
    const params = useParams();

    return (
        <div className={flex({
            direction: "column",
            gap: 4,
            w: "full",
        })}>
            <div className={hstack({
                justify: "space-between",
                w: "full",
            })}>
                <Heading
                    title={`Product (${data.length})`}
                    description="Manage products for your store"
                />
                <button
                    onClick={() => router.push(`/${params.storeId}/products/new`)}
                    className={button()}>
                    <Plus className={css({
                        w: 4,
                        h: 4,
                        mr: 2
                    })}/>
                    Add New
                </button>
            </div>

            <div className={divider({
                color: "slate.200"
            })} />

            <DataTable
                data={data}
                columns={columns}
                searchKey="name"
            />
            <Heading
                title="API"
                description="API calls for Products"
                />
            <div className={divider({
                color: "slate.200"
            })} />

            <ApiList entityName="products" entityIdName="productId" />
        </div>
    );
};

export default ProductClient;
