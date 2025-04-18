"use client"

import Table from "../core/Table"
import columns from "./columns"
import { Category } from "@/types"

interface DataTableProps<TData> {
    data: TData[]
}

export default function TableCategory({ data }: DataTableProps<Category>) {

    return (
        <Table columns={columns} data={data} />
    )

}