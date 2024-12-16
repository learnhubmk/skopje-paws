import {retrieveEmployees} from "../../actions/employeeActions";
import Table from "@/reusable/table";

export default function EmployeeTable() {

    const fetchEmployees = async () => {
        try {
            const {employees} = await retrieveEmployees();
            console.log("employees", employees);
        } catch (error) {
            console.error("error fetching employees", error)
        }
    }

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
            accessorKey: "password",
            header: "Password",
            cell: () => <p>Reset Password</p>
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
            accessorKey: "id",
            header: "Избриши",
            enableSorting: false,
            cell: (props) => (
                <div>permission based checking</div>
                // <button
                //     onClick={() => handleDeleteReservation(props.getValue())}
                //     className="font-semibold text-red-500"
                // >
                //     X
                // </button>
            )
        }
    ];

    return <Table columns={columns} callback={fetchEmployees} labels={{"pagination": "вработени"}}></Table>
}