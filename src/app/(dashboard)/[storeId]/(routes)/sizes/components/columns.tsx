import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type SizeColumn = {
    name: string;
    value: string;
    createdAt: string;
    id: string
}


const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "value",
        header: "Value"
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
