import { getRecentPatients } from "@/lib/actions/appointment.actions";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function RecentPatient(): Promise<JSX.Element> {
    
    const data = await getRecentPatients();

    return (
        <div className="relative space-y-4">
            {data.map((patient,index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Avatar  className="rounded-full bg-dark-800 text-white">
                        <AvatarImage alt={patient.name}/>
                        <AvatarFallback>{patient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none text-white">{patient.name}</p>
                        <p className="text-xs font-light text-gray-200">{patient.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}