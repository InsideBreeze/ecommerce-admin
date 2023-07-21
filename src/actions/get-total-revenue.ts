import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    return paidOrders.reduce((acc, curr) => acc +
        curr.orderItems.reduce(
            (acc, curr) => acc + Number(curr.product.price), 0), 0)

}
