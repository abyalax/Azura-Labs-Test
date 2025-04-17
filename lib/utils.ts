import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FilterFn } from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fuzzyFilter: FilterFn<unknown> = (row, columnId, value) => {
  return rankItem(row.getValue(columnId), value).passed;
};