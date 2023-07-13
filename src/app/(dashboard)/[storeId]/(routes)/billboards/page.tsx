import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import BillboardClient from "./components/client";

interface BillboardPageProps {
    params: {
        storeId: string;
    }
};

const BillboardPage: React.FC<BillboardPageProps> = async ({
    params
}) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })
    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            {
                billboards.map(b => (
                    <div key={b.id}>
                        {b.id}
                    </div>
                ))
            }
            <BillboardClient data={billboards} />
        </div>
    );
};

export default BillboardPage;
