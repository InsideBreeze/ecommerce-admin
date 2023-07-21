"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import columns, { BillboardColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

import { divider, flex, hstack } from "../../../../../../../styled-system/patterns";
import { button } from "../../../../../../../styled-system/recipes";
import { css } from "../../../../../../../styled-system/css";

interface BillboardClientProps {
    data: BillboardColumn[]
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
        })}>
            <div className={hstack({
                justify: "space-between",
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
