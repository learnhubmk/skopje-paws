import {deleteReservation, getReservations} from "../../actions/reservationActions";
import Table from "@/reusable/table";
import {useState} from "react";


export default function ReservationsTable() {
    const [rerender, setRerender] = useState(false);
    const handleDeleteReservation = async (id: number) => {
        const isConfirmed = window.confirm("Дали сигурно сакате да ја избришете резервацијата?");
        if (isConfirmed) {
            await deleteReservation(id)
                .then(getReservations);

            setRerender(true);
        }
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
            header: "Траење",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "name",
            header: "Име/Презиме",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "email",
            header: "Емаил",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "phoneNumber",
            header: "Број",
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
            header: "Раса",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "walkType",
            header: "Тип",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "walker",
            header: "Шетач",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            // todo permission based
            accessorKey: "id",
            header: "Избриши",
            enableSorting: false,
            cell: (props) => (
                <button
                    onClick={() => handleDeleteReservation(props.getValue())}
                    className="font-semibold text-red-500"
                >
                    X
                </button>
            )
        }
    ];

    const labels = {"pagination": "резервации"}
    return  <Table columns={columns} callback={getReservations} labels={labels}/>
}