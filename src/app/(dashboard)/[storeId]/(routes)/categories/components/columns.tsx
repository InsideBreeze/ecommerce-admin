import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type CategoryColumn = {
    name: string;
    billboard: string;
    createdAt: string;
    id: string
}


const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        header: "Billboard",
        accessorKey: "billboard"
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
