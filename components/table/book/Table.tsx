"use client"

import { useEffect, useMemo, useState } from "react"
import Table from "../core/Table"
import { createDateRangeFilter } from "../core/filters"
import columns from "./columns"
import { Book } from "@/types"

export default function TableBook() {
    const [lists, setLists] = useState<string[]>(['']);
    const [data, setData] = useState<Book[]>([])
    const memoizeColumns = useMemo(() => columns, [])

    const filter = [
        {
            label: "Filter By Category",
            lists,
            columnId: "category"
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/book/category/unique', { method: 'GET' })
                .then(res => res.json())
                .then(data => setLists(data))

            await fetch('/api/book', { method: 'GET' })
                .then(res => res.json())    
                .then(data => setData(data))

        }
        fetchData()
        return () => {setLists([]); setData([]);};
    }, []);

    useEffect(() => {
        console.log(lists);
        console.log(data);
        return () => {
        };
    }, [data, lists]);
    

    return (
        <Table columns={memoizeColumns} data={data} filterColumns={filter} filters={{ dateRange: createDateRangeFilter() }} />
    )

}