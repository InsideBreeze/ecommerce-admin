"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import columns, { CategoryColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { divider, flex, hstack } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { css } from "../../../../../../../styled-system/css";

interface CategoryClientProps {
    data: CategoryColumn[]
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
        })}>
            <div className={hstack({
                justify: "space-between",
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
