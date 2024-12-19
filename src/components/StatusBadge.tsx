import clsx from "clsx";


export default function StatusBadge({status} : {status: Status}): JSX.Element{
    return(
        <div className={clsx("status-badge", {
            "bg-green-400": status === "scheduled",
            "bg-purple-500": status === "pending",
            "bg-red-200": status === "cancelled",
        })}>

            <p className={clsx("text-12-semibold capitalize", {
                "text-green-800": status === "scheduled",
                "text-purple-800": status === "pending",
                "text-red-800": status === "cancelled",
            })}>
                {status}
            </p>
        </div>
    )
}