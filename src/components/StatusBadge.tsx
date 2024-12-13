import clsx from "clsx";


export default function StatusBadge({status} : {status: Status}): JSX.Element{
    return(
        <div className={clsx("status-badge", {
            "bg-cyan-200": status === "scheduled",
            "bg-pink-200": status === "pending",
            "bg-red-200": status === "cancelled",
        })}>

            <p className={clsx("text-12-semibold capitalize", {
                "text-cyan-800": status === "scheduled",
                "text-pink-800": status === "pending",
                "text-red-800": status === "cancelled",
            })}>
                {status}
            </p>
        </div>
    )
}