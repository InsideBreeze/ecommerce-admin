"use client";

import Heading from "@/components/ui/heading";
import { divider, flex, hstack, wrap } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { Plus } from "lucide-react";
import { css } from "../../../../../../../styled-system/css";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import columns, { CategoryColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface CategoryClientProps {
    data: {
        id: string;
        name: string;
        createdAt: string;
        billboard: string
    }[]
};

const CategoryClient: React.FC<CategoryClientProps> = ({
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
                    title={`Category (${data.length})`}
                    description="Manage categories for your store"
                />
                <button
                    onClick={() => router.push(`/${params.storeId}/categories/new`)}
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
                description="API calls for Categories"
                />
            <div className={divider({
                color: "slate.200"
            })} />

            <ApiList entityName="categories" entityIdName="categoryId" />
        </div>
    );
};

export default CategoryClient;
