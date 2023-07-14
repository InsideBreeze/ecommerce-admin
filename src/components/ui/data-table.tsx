import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { css } from "../../../styled-system/css";
import { useState } from "react";
import { hstack } from "../../../styled-system/patterns";
import { button } from "../../../styled-system/recipes";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey
}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters
        }
    })

    return (
        <div className={css({
            w: "full",
        })}>

            {/* filter */}
            <div className={hstack({
                py: 4
            })}>
                <input
                    placeholder="Search.."
                    className={css({
                        outline: "none",
                        border: "1px solid token(colors.slate.200)",
                        h: 10,
                        rounded: "md",
                        p: 2,
                        _focus: {
                            ring: "1px solid blue"
                        }
                    })}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                />
            </div>
            <div className={css({
                border: "1px solid token(colors.slate.200)",
                rounded: "md",
            })}>
                <table className={css({
                    w: "full",
                    fontSize: "sm"
                })}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className={css({
                                borderBottom: "1px solid token(colors.slate.200)",
                                _hover: {
                                    bg: "slate.100",
                                    transition: "color"
                                },
                                color: "slate.600"
                            })}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan} className={css({
                                            textAlign: "start",
                                            px: 4,
                                            h: 12,
                                        })}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </>

                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={css({
                        "& > tr:last-child": {
                            border: 0
                        },
                        color: "slate.800"
                    })}>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className={css({
                                        borderBottom: "1px solid token(colors.slate.200)",
                                        _hover: {
                                            bg: "slate.100"
                                        },
                                        transition: "color"
                                    })}>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className={css({
                                                p: 4
                                            })}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr className={css(
                                    {
                                        _hover: {
                                            bg: "slate.100"
                                        },
                                        transition: "color"
                                    }
                                )}>
                                    <td className={css({
                                        h: 24,
                                        textAlign: "center"
                                    })}
                                        colSpan={columns.length}
                                    >
                                        No results
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            <div className={hstack({
                justify: "end",
                w: "full",
                py: 4,
                color: "slate.800"
            })}>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    className={button({
                        visual: "outline"
                    })}>
                    prev
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    className={button({
                        visual: "outline"
                    })}>
                    Next
                </button>
            </div>
        </div>
    )
}
