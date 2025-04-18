import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn } from '@tanstack/react-table';

/**
 * Generic, type-safe fuzzy filter function
 * Works with any table data type
 */
export const createFuzzyFilter = <TData>(): FilterFn<TData> => {
  return (row, columnId, filterValue) => {
    const value = String(row.getValue(columnId) ?? '');
    const result = rankItem(value, String(filterValue));

    // Optional: simpan score untuk sorting, comment out if not needed
    // (row as any)._fuzzyScore = result.score;

    return result.passed;
  };
};


/**
 * Generic, type-safe date range filter
 * Works with any table data type
 */
export const createDateRangeFilter = <TData>(): FilterFn<TData> => {
  return (row, columnId, filterValue) => {
    const rowDate = new Date(row.getValue(columnId))
    const from = filterValue?.from ? new Date(filterValue.from) : undefined
    const to = filterValue?.to ? new Date(filterValue.to) : undefined

    if (from && rowDate < from) return false
    if (to && rowDate > to) return false
    return true
  }
}