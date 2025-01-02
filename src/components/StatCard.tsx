import { Users, Calendar, Hourglass, TriangleAlert } from 'lucide-react'

import { getRecentAppointments } from '@/lib/actions/appointment.actions';
import { getNumberOfPatients } from '@/lib/actions/appointment.actions'

import { Card } from './ui/card';

export default async function StatCard(): Promise<JSX.Element> {
    const {counts} = await getRecentAppointments();
    const countPatient = getNumberOfPatients();

    const stats = [
        { icon: Users, label: "Patients", count: countPatient, color: "bg-yellow-500" ,cardColor: "bg-white"},
        { icon: Calendar, label: "Scheduled", count: counts.scheduledCount, color: "bg-green-400", cardColor: "bg-white"},
        { icon: Hourglass, label: "Pending", count: counts.pendingCount, color: "bg-purple-600", cardColor: "bg-white"},
        { icon: TriangleAlert, label: "Cancelled", count: counts.cancelledCount, color: "bg-red-400", cardColor: "bg-white"},
    ];
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className={`flex flex-col border-none shadow-md items-center justify-center p-4 text-center ${stat.cardColor}`}>
                        <div className={`mb-3 rounded-2xl ${stat.color} p-3 text-white`}>
                            <stat.icon className="h-6 w-6"/>
                        </div>
                        <div className='text-2xl font-semibold text-dark-800'>{stat.count}</div>
                        <div className='text-sm font-medium text-dark-800'>{stat.label}</div>
                    </Card>
                ))}
            </div>
        </div>
    )
}