import { Users, Calendar, Hourglass, TriangleAlert } from 'lucide-react'
import { getNumberOfPatients, getRecentAppointments } from '@/lib/actions/appointment.actions'
import { Card } from './ui/card';


export default async function StatCard(): Promise<JSX.Element> {
    const { counts } = await getRecentAppointments();
    const countPatient = getNumberOfPatients();

    const stats = [
        { icon: Users, label: "Patients", count: countPatient, color: "bg-indigo-600" },
        { icon: Calendar, label: "Scheduled", count: counts.scheduledCount, color: "bg-cyan-500" },
        { icon: Hourglass, label: "Pending", count: counts.pendingCount, color: "bg-pink-500", },
        { icon: TriangleAlert, label: "Cancelled", count: counts.cancelledCount, color: "bg-red-500" },
    ];
    return (
        <div>
            <p className="text-xl font-semibold pb-2">Report</p>
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex flex-col items-center justify-center p-4 text-center bg-white">
                        <div className={`mb-3 rounded-full ${stat.color} p-3 text-white`}>
                            <stat.icon className="h-6 w-6"/>
                        </div>
                        <div className='text-2xl font-bold'>{stat.count}</div>
                        <div className='text-sm text-muted-foreground'>{stat.label}</div>
                    </Card>
                ))}
            </div>
        </div>
    )
}