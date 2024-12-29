import {retrieveEmployees} from "../../actions/employeeActions";
import Table from "@/reusable/table";
import {deleteReservation} from "../../actions/reservationActions";

export default function EmployeeTable() {

    const fetchEmployees = async () => {
        try {
            await retrieveEmployees();
        } catch (error) {
            console.error("error fetching employees", error)
        }
    }

    const handleDeleteEmployee = async (id: number) => {
        const isConfirmed = window.confirm("Дали сигурно сакате да го избришете вработениот?");

        if (isConfirmed) {
            await deleteReservation(id)
                .then(fetchEmployees);
        }
    };


    const columns = [
        {
            accessorKey: "created_at",
            header: "Датум на вработување",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "name",
            header: "Име и презиме",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "username",
            header: "Корисничко име",
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
            accessorKey: "password",
            header: "Password",
            cell: () => <p>Reset Password</p>
        },
        {
            accessorKey: "id",
            header: "Избриши",
            enableSorting: false,
            cell: (props) => (
                // <div>permission based checking</div>
                <button
                    onClick={() => handleDeleteEmployee(props.getValue())}
                    className="font-semibold text-red-500"
                >
                    X
                </button>
            )
        }
    ];

    const labels = {"pagination": "вработени", "add": "вработен"};

    return <Table columns={columns} callback={fetchEmployees} labels={labels}/>
}