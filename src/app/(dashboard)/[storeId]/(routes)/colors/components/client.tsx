"use client";

import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import columns, { ColorColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { divider, flex, hstack, wrap } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { css } from "../../../../../../../styled-system/css";

interface ColorClientProps {
    data: {
        id: string;
        name: string;
        value: string;
        createdAt: string;
    }[]
};

const ColorClient: React.FC<ColorClientProps> = ({
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
                    title={`Color (${data.length})`}
                    description="Manage colors for your store"
                />
                <button
                    onClick={() => router.push(`/${params.storeId}/colors/new`)}
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
                description="API calls for Colors"
                />
            <div className={divider({
                color: "slate.200"
            })} />

            <ApiList entityName="colors" entityIdName="colorId" />
        </div>
    );
};

export default ColorClient;
