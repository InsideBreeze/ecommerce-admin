import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../../styled-system/css";
import SizeForm from "./components/size-form";

interface SizePageProps {
    params: {
        storeId: string;
        sizeId: string
    }
};

const SizePage: React.FC<SizePageProps> = async ({
    params: {
        storeId,
        sizeId
    }
}) => {

    const size = await prismadb.size.findUnique({
        where: {
            id: sizeId,
            storeId
        }
    });



    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <SizeForm data={size} />
        </div>
    );
};

export default SizePage;
