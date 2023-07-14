import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { css } from "../../../../../../styled-system/css";
import OrderClient from "./components/client";

interface OrderPageProps {
    params: {
        storeId: string;
    }
};

export const revalidate = 0;

const OrderPage: React.FC<OrderPageProps> = async ({
    params
}) => {

    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedOrders = orders.map(order => ({
        id: order.id,
        phone: order.phone,
        adress: order.adress,
        totalPrice: order.orderItems.reduce((total, item) => total + Number(item.product.price), 0),
        paid: order.isPaid,
        products: order.orderItems.map(item => item.product.name).join(" ")
    }));

    return (
        <div className={css({
            p: 8,
            pt: 6,
        })}>
            <OrderClient data={formattedOrders} />
        </div>
    );
};

export default OrderPage;
