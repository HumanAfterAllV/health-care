import { getRecentAppointments } from "@/lib/actions/appointment.actions";

import { columns } from "@/components/table/Columns";
import { Card } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/table/DataTable";
import WelcomeBanner from "@/components/WelcomeBanner";
import RecentPatient from "@/components/RecentPatient";

export const dynamic = "force-dynamic";
export const revalidate = 0

export default async function Page() : Promise<JSX.Element> {
    
    const{ data } = await getRecentAppointments();

    return (
        <>
            <div className="grid gap-4 pl-5< pr-5">
                <WelcomeBanner/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Card className="space-y-8 bg-purple-600 text-white p-6 rounded-3xl shadow-none">
                        <h2 className="text-[32px] font-medium mb-4">Report</h2>
                        <StatCard/>
                    </Card>
                    <Card className="col-span-1 bg-purple-600 p-6 rounded-3xl shadow-none">
                        <h2 className="text-[32px] font-medium mb-4 text-white">Recent Patients</h2>
                        <RecentPatient />
                    </Card>
                </div>
            </div>
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 text-dark-800 border-none shadow-none p-6 rounded-3xl mt-5">
                  <h2 className="text-[32px] font-medium mb-4">All Patients</h2>
                  <DataTable columns={columns} data={data}/>
            </Card>
        </>
    );
}
