import { getRecentPatients } from "@/lib/actions/appointment.actions";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
/* import { formatDateTime } from "@/lib/utils"; */

export default async function RecentPatient(): Promise<JSX.Element> {
    const data = await getRecentPatients();

    return (
        <div className="space-y-4">
            {data.map((patient,index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Avatar  className="rounded-full bg-[#CAF0F8]">
                        <AvatarImage alt={patient.name}/>
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}