import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
    type: "appointments" | "pending" | "cancelled";
    count: number;
    label: string;
    icon: string;
}

export default function StatCard({count = 0, label, icon, type}: StatCardProps): JSX.Element {
    return (
        <div className={clsx("stat-card", {
            "bg-appointments": type === "appointments",
            "bg-pending": type === "pending",
            "bg-cancelled": type === "cancelled"
        })}>
            <div className="flex items-center gap-4">
                <Image
                    src={icon}
                    alt={label}
                    width={32}
                    height={32}
                    className="size-8 w-fit"
                />
                <h2 className="text-32-bold text-dark-200">{count}</h2>
            </div>

            <p className="text-14-regular">{label}</p>

        </div>
    )
}