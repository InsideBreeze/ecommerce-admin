import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { hstack } from "../../../../../../../styled-system/patterns";
import { css } from "../../../../../../../styled-system/css";

export type ColorColumn = {
    name: string;
    value: string;
    createdAt: string;
    id: string
}


const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        header: "Value",
        cell: ({ row }) => (
            <div className={hstack()}>
                {row.original.value}
                <div
                    style={{ backgroundColor: row.original.value }}
                    className={css({
                        p: 3,
                        rounded: "full",
                        border: "1px solid token(colors.slate.200)"
                    })}
                />
            </div>
        )
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
