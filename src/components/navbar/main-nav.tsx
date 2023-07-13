"use client";

import { useParams, usePathname } from "next/navigation";
import { css } from "../../../styled-system/css";
import { hstack } from "../../../styled-system/patterns";
import Link from "next/link";

interface MainNavProps {

};

const MainNav: React.FC<MainNavProps> = () => {

    const pathname = usePathname()
    const params = useParams();
    const routes = [
        {
            label: "Overview",
            href: "/",
            active: pathname === `/${params.storeId}`
        },
        {
            label: "Settings",
            href: `/${params.storeId}/settings`,
            active: pathname === `/${params.storeId}/settings`
        },
    ]
    return (
        <nav className={hstack({
            mx: 6,
            gap: {
                base: 4,
                lg: 6
            }
        })}>
            {
                routes.map(route => (
                    <Link href={route.href} key={route.label} className={css({
                        color: {
                            base: route.active ? "black" : "slate.600",
                            _hover: "black"
                        },
                        transition: "color"
                    })}>
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    );
};

export default MainNav;
