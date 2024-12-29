import {deleteReservation, getReservationsFromYesterday} from "../../actions/reservationActions";
import Table from "@/reusable/table";
import {useState} from "react";


export default function ReservationsTable() {
    const [activeReservations, setActiveReservations] = useState([])
    const [allReservations, setAllReservations] = useState([])

    const fetchReservations = async () => {
        const {reservations: activeReservations, error: activeReservationsError} = await getReservationsFromYesterday();
        // const {reservations: allReservations, error: allReservationsError} = await retrieveReservations();

        // if (activeReservationsError || allReservationsError) {
        //     throw new Error(activeReservationsError || allReservationsError);
        // }

        setActiveReservations(activeReservations);
        // setAllReservations(allReservations);
    };


    const handleDeleteReservation = async (id: number) => {
        const isConfirmed = window.confirm("Дали сигурно сакате да ја избришете резервацијата?");

        if (isConfirmed) {
            await deleteReservation(id)
                .then(fetchReservations);
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
        },
        {
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

    return <Table columns={columns} callback={fetchReservations} labels={labels}/>
}