import { UserButton } from "@clerk/nextjs";
import { Store } from "@prisma/client";

import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { hstack } from "styled-system/patterns";
import { css } from "styled-system/css";

interface NavbarProps {
    data: Store[]
};

const Navbar: React.FC<NavbarProps> = async ({
    data
}) => {

    return (
        <div className={hstack({
            h: 16,
            px: 4,
            borderBottom: "1px solid token(colors.slate.200)"
        })}>
            <div>
                <StoreSwitcher data={data} />
            </div>
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
