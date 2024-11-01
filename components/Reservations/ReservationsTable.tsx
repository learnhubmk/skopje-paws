import { useState, useEffect, InputHTMLAttributes } from "react";
import {
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
};

const columns = [
    {
        accessorKey: "date",
        header: "Датум",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "time",
        header: "Време",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "walkDuration",
        header: "Времетраење на прошетка",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "name",
        header: "Име и презиме",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "email",
        header: "Е-пошта",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "phoneNumber",
        header: "Телефонски број",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "city",
        header: "Град",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "municipality",
        header: "Општина",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "address",
        header: "Адреса",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "dogBreed",
        header: "Раса на куче",
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "walkType",
        header: "Тип на прошетка",
        cell: (props) => <p>{props.getValue()}</p>
    }
];

export default function ReactTable({ reservations }) {
    const [data, setData] = useState([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        setData(reservations);
    }, [reservations]);

    const table = useReactTable({
        data,
        columns,
        filterFns: { fuzzy: fuzzyFilter },
        state: { columnFilters, globalFilter },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto flex flex-col gap-2">
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="flex w-full sm:w-64 p-2 font-lg shadow border border-black rounded"
                    placeholder="Пребарувај"
                />
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="text-black">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 border-2 border-black">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-b hover:bg-gray-200">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-2 py-1 border border-black">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="px-2 py-1 border text-black">
                                    Нема резервации од вчера натаму
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
    }, [value, debounce]);

    return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}