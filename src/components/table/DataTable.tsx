import { getRecentAppointments } from "@/lib/actions/appointment.actions"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import Image from "next/image"



export default async function DataTable(): JSX.Element {
    const {data, counts} = await getRecentAppointments();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
   
    return (
        <div className="data-table">
            <Table className="shad-table">
                <TableHeader className="text-gray-500">
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="">
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className=""
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="table-actions">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="shad-teal-btn"
                >
                    <Image
                        src="/assets/icons/arrow.svg"
                        width={24}
                        height={24}
                        alt="arrow"
                    />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="shad-teal-btn"
                >
                    <Image
                        src="/assets/icons/arrow.svg"
                        width={24}
                        height={24}
                        alt="arrow"
                        className="rotate-180"
                    />
                </Button>

            </div>
        </div>
    )
}

