/* import Link from "next/link";
 */
import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { Input } from "@/components/ui/input";

import { columns } from "@/components/table/Columns";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";

import { Search } from "lucide-react";

export default async function Page(): Promise<JSX.Element> {
    const { data, counts } = await getRecentAppointments();

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Admin Dashboard
                    </h1>
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative">
                            {/* Search patients */}
                            <Input
                                type="text"
                                placeholder="Search patients"
                                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        {/* Filter button */}
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
