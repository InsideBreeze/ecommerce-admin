import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import SizeClient from "./components/client";

interface SizePageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const SizePage: React.FC<SizePageProps> = async ({
    params
}) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedSizes = sizes.map(size => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <SizeClient data={formattedSizes} />
        </div>
    );
};

export default SizePage;
