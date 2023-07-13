import { UserButton, auth } from "@clerk/nextjs";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { hstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface NavbarProps {
};

const Navbar: React.FC<NavbarProps> = async () => {
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
        <div className={hstack({
            h: 16,
            px: 4,
            borderBottom: "1px solid token(colors.slate.200)"
        })}>
            <StoreSwitcher data={stores} />
            <MainNav />
            <div className={css({
                ml: "auto"
            })}>
                <UserButton />
            </div>
        </div>
    );
};

export default Navbar;
