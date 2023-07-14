import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
    name: string;
    isArchived: boolean;
    isFeatured: boolean;
    category: string;
    size: string;
    color: string;
    price: number;
    createdAt: string;
    id: string
}


const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "isArchived",
        header: "Archived"
    },
    {
        accessorKey: "isFeatured",
        header: "Featured"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "size",
        header: "Size"
    },
    {
        accessorKey: "color",
        header: "Color"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]

export default columns;
