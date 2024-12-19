import { getRecentAppointments } from '@/lib/actions/appointment.actions';
import { getNumberOfPatients } from '@/lib/actions/appointment.actions'

import { Users, Calendar, Hourglass, TriangleAlert } from 'lucide-react'
import { Card } from './ui/card';

export default async function StatCard(): Promise<JSX.Element> {
    const {counts} = await getRecentAppointments();
    const countPatient = getNumberOfPatients();

    const stats = [
        { icon: Users, label: "Patients", count: countPatient, color: "bg-white" ,cardColor: "bg-orange-500"},
        { icon: Calendar, label: "Scheduled", count: counts.scheduledCount, color: "bg-white", cardColor: "bg-green-400"},
        { icon: Hourglass, label: "Pending", count: counts.pendingCount, color: "bg-white", cardColor: "bg-purple-500"},
        { icon: TriangleAlert, label: "Cancelled", count: counts.cancelledCount, color: "bg-white", cardColor: "bg-red-300"},
    ];
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className={`flex flex-col border-none shadow-md items-center justify-center p-4 text-center ${stat.cardColor}`}>
                        <div className={`mb-3 rounded-2xl ${stat.color} p-3 text-black`}>
                            <stat.icon className="h-6 w-6"/>
                        </div>
                        <div className='text-2xl font-bold text-white'>{stat.count}</div>
                        <div className='text-sm font-bold text-white'>{stat.label}</div>
                    </Card>
                ))}
            </div>
        </div>
    )
}