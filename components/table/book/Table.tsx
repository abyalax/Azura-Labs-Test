"use client"

import { useEffect, useState } from "react"
import Table from "../core/Table"
import { createDateRangeFilter } from "../core/filters"
import columns from "./columns"
import { Book } from "@/types"

interface DataTableProps<TData> {
    data: TData[]
}

export default function TableBook({ data }: DataTableProps<Book>) {
    const [lists, setLists] = useState<string[]>(['']);

    const filter = [
        {
            label: "Filter By Category",
            lists,
            columnId: "category"
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/book/category', { method: 'GET' })
                .then(res => res.json())
                .then(data => setLists(data))

        }
        fetchData()
        return () => setLists([]);
    }, []);

    useEffect(() => {
        console.log(lists);
        return () => {
        };
    }, [lists]);
    

    return (
        <Table columns={columns} data={data} filterColumns={filter} filters={{ dateRange: createDateRangeFilter() }} />
    )

}