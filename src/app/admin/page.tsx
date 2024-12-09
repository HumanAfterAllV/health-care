import Link from "next/link";

import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { columns } from "@/components/table/Columns";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";

import { Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchPatient from "@/components/SearchPatient";

export default async function Page(): Promise<JSX.Element> {
    const { data, counts } = await getRecentAppointments();

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-200 to-teal-100 p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between px-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Admin Dashboard
                        </h1>
                        <div>
                            <Link href="/">
                                <Button variant="ghost">
                                    <Home className="mr-2 h-4 w-4"/>
                                    Return to home
                                </Button>
                            </Link>
                            <Button variant="ghost">
                                <LogOut className="mr-2 h-4 w-4" />
                                LogOut
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative">
                            <SearchPatient/>
                        </div>
                    </div>
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
                    <div className="overflow-x-auto pt-10">
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}
