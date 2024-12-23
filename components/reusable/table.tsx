import { InputHTMLAttributes, useEffect, useState } from "react";
import {
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
};

export default function Table({ callback, columns, labels }) {
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    // const handleDeleteReservation = async (id: number) => {
    //     const isConfirmed = window.confirm("Дали сигурно сакате да ја избришете резервацијата?");
    //
    //     if (isConfirmed) {
    //         // await deleteReservation(id);
    //         callback();
    //     }
    // };

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        filterFns: { fuzzy: fuzzyFilter },
        state: { columnFilters, globalFilter, sorting },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        sortDescFirst: false,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto flex flex-col gap-2">
                <div className="flex gap-4">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="flex w-full sm:w-64 p-2 font-lg shadow border border-black rounded"
                        placeholder="Пребарувај"
                    />
                </div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="text-black">
                                {headerGroup.headers.map((header, index) => {
                                    const deleteHeader = index === headerGroup.headers.length - 1;
                                    return (
                                        <th
                                            key={header.id}
                                            className={`p-2 border-2 border-black ${header.column.getCanSort() && !deleteHeader
                                                ? 'cursor-pointer select-none hover:bg-gray-100'
                                                : ''}`}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex items-center justify-center gap-1 w-full">
                                                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                    {!deleteHeader && (
                                                        <div className="flex flex-col items-center">
                                                            <span
                                                                className={`${header.column.getIsSorted() === 'asc'
                                                                    ? 'text-black opacity-100'
                                                                    : 'text-gray-500 opacity-20'}`}
                                                            >
                                                                ▲
                                                            </span>
                                                            <span
                                                                className={`${header.column.getIsSorted() === 'desc'
                                                                    ? 'text-black opacity-100'
                                                                    : 'text-gray-500 opacity-20'}`}
                                                            >
                                                                ▼
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {(
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-b hover:bg-gray-200">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-2 py-1 border border-black">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Страна</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} од {" "}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Оди до страна:
                        <input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Покажи {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Прикажани {table.getRowModel().rows.length.toLocaleString()} од {" "}
                    {table.getRowCount().toLocaleString()} {labels.pagination}
                </div>
            </div>
        </div>
    );
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => onChange(value), debounce);
        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}