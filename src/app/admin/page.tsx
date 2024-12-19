
import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { columns } from "@/components/table/Columns";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";

import { Card } from "@/components/ui/card";
import WelcomeBanner from "@/components/WelcomeBanner";
import RecentPatient from "@/components/RecentPatient";

export default async function Page() : Promise<JSX.Element> {

    const{ data } = await getRecentAppointments();

    return (
        <>
            <div className="grid gap-8 px-10">
                <WelcomeBanner/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <div className="space-y-8 bg-[#e8ebfe] p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">Report</h2>
                        <StatCard/>
                    </div>
                    <Card className="col-span-1 bg-[#e8ebfe] p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">Recent Patients</h2>
                        <RecentPatient />
                    </Card>
                </div>
            </div>
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#e8ebfe] shadow-md p-6 rounded-2xl m-10">
                  <h2 className="text-xl font-semibold mb-4 text-blue-900">All Patients</h2>
                  <DataTable columns={columns} data={data}/>
            </Card>
        </>
    );
}
