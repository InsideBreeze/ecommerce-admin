import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import SettingForm from "./components/setting-form";
import { redirect } from "next/navigation";

interface SettingPageProps {
    params: {
        storeId: string
    }
};

const SettingPage: React.FC<SettingPageProps> = async ({
    params
}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    if (!store) {
        redirect("/")
    }

    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <SettingForm initialName={store.name} />
        </div>
    );
};

export default SettingPage;
