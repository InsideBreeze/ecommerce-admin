"use client";

import Heading from "@/components/ui/heading";
import { divider, flex, hstack } from "../../../../../../../styled-system/patterns";

import columns, { OrderColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
    data: OrderColumn[]
};

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
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
                    title={`Order (${data.length})`}
                    description="Manage Orders for your store"
                />
            </div>

            <div className={divider({
                color: "slate.200"
            })} />

            <DataTable
                data={data}
                columns={columns}
                searchKey="products"
            />
            <Heading
                title="API"
                description="API calls for Orders"
                />
            <div className={divider({
                color: "slate.200"
            })} />
           <ApiList entityName="orders" entityIdName="orderId" />
        </div>
    );
};

export default OrderClient;
