import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../../styled-system/css";
import ColorForm from "./components/color-form";

interface ColorPageProps {
    params: {
        storeId: string;
        colorId: string
    }
};

const ColorPage: React.FC<ColorPageProps> = async ({
    params: {
        storeId,
        colorId
    }
}) => {

    const color = await prismadb.color.findUnique({
        where: {
            id: colorId,
            storeId
        }
    });



    return (
        <div className={css({
            p: 8,
            pt: 6
        })}>
            <ColorForm data={color} />
        </div>
    );
};

export default ColorPage;
