import { getRecentAppointments } from '@/lib/actions/appointment.actions';
import { getNumberOfPatients } from '@/lib/actions/appointment.actions'

import { Users, Calendar, Hourglass, TriangleAlert } from 'lucide-react'
import { Card } from './ui/card';

export default async function StatCard(): Promise<JSX.Element> {
    const {counts} = await getRecentAppointments();
    const countPatient = getNumberOfPatients();

    const stats = [
        { icon: Users, label: "Patients", count: countPatient, color: "bg-[#023E8A]" },
        { icon: Calendar, label: "Scheduled", count: counts.scheduledCount, color: "bg-[#48CAE4]" },
        { icon: Hourglass, label: "Pending", count: counts.pendingCount, color: "bg-pink-500", },
        { icon: TriangleAlert, label: "Cancelled", count: counts.cancelledCount, color: "bg-red-500" },
    ];
    return (
        <div>
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