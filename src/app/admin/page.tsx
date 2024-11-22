import Image from "next/image";
import Link from "next/link";

import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { columns } from "@/components/table/Columns";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";

export default async function Page(): Promise<JSX.Element> {
    const { data, counts } = await getRecentAppointments();

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="logo"
                        width={162}
                        height={32}
                        className="h-8 w-fit"
                    />
                </Link>
                <p className="text-16-semibold">Admin Dashboard</p>
            </header>
            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome</h1>
                    <p className="text-dark-700">Start the day with managing new appointments</p>
                </section>
                <section className="admin-stat">
                    <StatCard
                        type="appointments"
                        count={counts.scheduledCount}
                        label="Scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StatCard
                        type="pending"
                        count={counts.pendingCount}
                        label="Pending appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    <StatCard
                        type="cancelled"
                        count={counts.cancelledCount}
                        label="Cancel appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>
                <DataTable columns={columns} data={data} />
            </main>
        </div>
    );
}
