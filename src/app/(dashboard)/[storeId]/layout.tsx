import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
    children: React.ReactNode
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
    children
}) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    });

    return (
        <div>
            <Navbar data={stores} />
            {children}
        </div>
    );
};

export default DashboardLayout;
