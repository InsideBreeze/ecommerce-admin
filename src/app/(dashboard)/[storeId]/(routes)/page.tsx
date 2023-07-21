import { CreditCard, DollarSign, Package } from "lucide-react";

import Heading from "@/components/ui/heading";
import { css } from "../../../../../styled-system/css";
import { divider, flex, grid } from "../../../../../styled-system/patterns";
import Card from "@/components/ui/card";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import getSalesCount from "@/actions/get-sales-count";
import getStockCount from "@/actions/get-stock-count";
import Overview from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";


interface DashboardPageProps {
    params: {
        storeId: string
    }
};

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {

    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);

    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <div className={flex({
                direction: "column",
                align: "start",
                gap: 4
            })}>
                <Heading
                    title="Dashboard"
                    description="Overview your store"
                />
                <div className={divider({
                    color: "slate.200"
                })} />

                <div className={grid({
                    columns: 3,
                    gap: 4,
                    w: "full"
                })}>
                    <Card
                        title="Total Revenue"
                        description={formatter.format(totalRevenue)}
                        icon={
                            <DollarSign className={css({
                                h: 4,
                                w: 4,
                                color: "slate.600"
                            })} />
                        }
                    />

                    <Card
                        title="Sales"
                        description={`+${salesCount}`}
                        icon={
                            <CreditCard className={css({
                                h: 4,
                                w: 4,
                                color: "slate.600"
                            })} />

                        }
                    />
                    <Card
                        title="Product In Stock"
                        description={stockCount}
                        icon={
                            <Package className={css({
                                h: 4,
                                w: 4,
                                color: "slate.600"
                            })} />

                        }
                    />
                </div>

                <div className={css({
                    p: 10,
                    w: "full"
                })}>
                    <Overview data={graphRevenue} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
