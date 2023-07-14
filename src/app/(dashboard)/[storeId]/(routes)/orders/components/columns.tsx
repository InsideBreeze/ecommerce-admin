import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
    id: string;
    phone: string;
    adress: string;
    totalPrice: number;
    paid: boolean;
    products: string;
}


const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products"
    },
    {
        accessorKey: "adress",
        header: "Adress"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "totalPrice",
        header: "Total price"
    },
    {
        accessorKey: "paid",
        header: "Paid"
    },
]

export default columns;
