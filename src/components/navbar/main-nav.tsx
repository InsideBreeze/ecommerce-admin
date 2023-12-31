"use client";

import { useParams, usePathname } from "next/navigation";
import { css } from "../../../styled-system/css";
import { hstack } from "../../../styled-system/patterns";
import Link from "next/link";

const MainNav = () => {

    const pathname = usePathname()
    const params = useParams();
    const routes = [
        {
            label: "Overview",
            href: `/${params.storeId}`,
            active: pathname === `/${params.storeId}`
        },
        {
            label: "Billboards",
            href: `/${params.storeId}/billboards`,
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            label: "Categories",
            href: `/${params.storeId}/categories`,
            active: pathname === `/${params.storeId}/categories`
        },
        {
            label: "Sizes",
            href: `/${params.storeId}/sizes`,
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            label: "Colors",
            href: `/${params.storeId}/colors`,
            active: pathname === `/${params.storeId}/colors`
        },
        {
            label: "Products",
            href: `/${params.storeId}/products`,
            active: pathname === `/${params.storeId}/products`
        },
        {
            label: "Orders",
            href: `/${params.storeId}/orders`,
            active: pathname === `/${params.storeId}/orders`
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
