import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";

import { css } from "../../../../../../styled-system/css";

interface ColorPageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const ColorPage: React.FC<ColorPageProps> = async ({
    params
}) => {

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedColors = colors.map(color => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMMM do, yyyy")
    }))
    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <ColorClient data={formattedColors} />
        </div>
    );
};

export default ColorPage;
