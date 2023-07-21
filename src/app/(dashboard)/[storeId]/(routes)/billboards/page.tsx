import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import BillboardClient from "./components/client";

interface BillboardPageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const BillboardPage: React.FC<BillboardPageProps> = async ({
    params
}) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedBillboards = billboards.map(billboard => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <BillboardClient data={formattedBillboards} />
        </div>
    );
};

export default BillboardPage;
