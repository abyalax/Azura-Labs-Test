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