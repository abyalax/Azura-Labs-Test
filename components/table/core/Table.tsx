"use client"

import { useEffect, useState } from "react"
import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    VisibilityState,
    FilterFn,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table as Container, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createFuzzyFilter } from "./filters"
import { FilterByDropdown } from "./ui/dropdown"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { DateRangeFilter } from "./ui/date-range"

export interface Columns {
    label: string
    columnId: string
    lists: string[]
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters?: {
        dateRange?: FilterFn<unknown>
    }
    filterColumns?: Columns[]
}

export default function Table<TData, TValue>({ columns, data, filters, filterColumns }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2019, 0, 20),
        to: addDays(new Date(2025, 0, 20), 20),
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        filterFns: filters,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
            globalFilter
        },
        globalFilterFn: createFuzzyFilter<TData>(),
    })

    useEffect(() => {
        const getRange = async () => {
            await fetch('/api/book/publish/range', { method: 'GET' })
                .then(res => res.json())
                .then(data => setDateRange({
                    from: new Date(data.from),
                    to: new Date(data.to)
                }))
        }
        getRange()
        return () => { };
    }, []);

    useEffect(() => {
        console.log(dateRange);
        return () => { };
    }, [dateRange]);

    useEffect(() => {
        if (filters && filters.dateRange) {
            if (dateRange?.from || dateRange?.to) {
                console.log('update ui');
                table.setColumnFilters((old) => [
                    ...old.filter((f) => f.id !== "publishAt"), {
                        id: "publishAt",
                        value: dateRange,
                    },
                ])
            } else {
                console.log(table.getColumn("publishAt"));
                console.log('update ui');
                table.setColumnFilters((old) => old.filter((f) => f.id !== "publishAt"))
            }
        } else {
            return () => { };
        }
    }, [dateRange, filters, table])


    return (
        <div className="w-fit min-w-full mx-auto">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="Search..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm me-5"
                />
                {filters?.dateRange ? (<DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />) : null}
                <div className="flex gap-3">
                    {filterColumns && (
                        filterColumns.map((e, index) => (
                            <FilterByDropdown key={index} label={e.label} lists={e.lists} table={table} columnId={e.columnId} />
                        ))
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="rounded-md border">
                <Container>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
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
                </Container>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

        </div>
    )
}
