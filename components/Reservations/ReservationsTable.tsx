import { useState, useEffect } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

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

    useEffect(() => {
        setData(reservations);
    }, [reservations]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="text-black">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 border-2 border-black">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
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
                                <td colSpan={11} className="px-2 py-1 border text-black">Нема резервации од вчера натаму</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}