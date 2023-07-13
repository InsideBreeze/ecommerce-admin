import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../../styled-system/css";
import BillboardForm from "./components/billboard-form";

interface BillboardPageProps {
    params: {
        storeId: string;
        billboardId: string
    }
};

const BillboardPage: React.FC<BillboardPageProps> = async ({
    params: {
        storeId,
        billboardId
    }
}) => {

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: billboardId,
            storeId
        }
    });

    console.log("billboard", billboard);

    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <BillboardForm data={billboard} />
        </div>
    );
};

export default BillboardPage;
