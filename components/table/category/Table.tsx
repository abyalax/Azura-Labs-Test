"use client"

import { useEffect, useState } from "react";
import Table from "../core/Table"
import columns from "./columns"
import { Category } from "@/types";

export default function TableCategory() {
    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            await fetch('/api/book/category', { method: 'GET' })
                .then(res => res.json())
                .then(data => setData(data))
        }
        fetchData()
        return () => setData([]);
    }, []);

    return (
        <Table columns={columns} data={data} />
    )

}