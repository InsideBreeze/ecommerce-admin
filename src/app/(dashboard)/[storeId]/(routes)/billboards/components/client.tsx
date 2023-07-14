"use client";

import Heading from "@/components/ui/heading";
import { divider, flex, hstack, wrap } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { Plus } from "lucide-react";
import { css } from "../../../../../../../styled-system/css";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import columns, { BillboardColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
    data: {
        id: string;
        label: string;
        createdAt: string;
    }[]
};

const BillboardClient: React.FC<BillboardClientProps> = ({
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
                    title={`Billboard (${data.length})`}
                    description="Manage billboards for your store"
                />
                <button
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
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
                searchKey="label"
            />
            <Heading
                title="API"
                description="API calls for Billboards"
                />
            <div className={divider({
                color: "slate.200"
            })} />

            <ApiList entityName="billboards" entityIdName="billboardId" />
        </div>
    );
};

export default BillboardClient;
