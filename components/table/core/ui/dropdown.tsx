'use client';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
    label: string
    table: Table<TData>;
    lists: string[];
    columnId?: string;
};

export function FilterByDropdown<TData>({ label, table, lists, columnId, }: Props<TData>) {

    const column = table.getColumn(columnId ?? '');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup
                    value={(column?.getFilterValue() as string) ?? ""}
                    onValueChange={(value) => column?.setFilterValue(value)}
                >
                    <DropdownMenuRadioItem value="">All Lists</DropdownMenuRadioItem>
                    {lists.map((item, index) => (
                        <DropdownMenuRadioItem key={index} value={item}>
                            {item}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
