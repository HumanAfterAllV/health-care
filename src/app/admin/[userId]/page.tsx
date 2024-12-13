
import Link from 'next/link';

import { getUser } from '@/lib/actions/patient.actions';
import { getPatientMedicalNotes } from '@/lib/actions/doctor.actions';
import { formatDateTime } from '@/lib/utils';

import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon, HeartPulseIcon, Hospital, Dna } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default async function Page({params: {userId} }: SearchParamProps): Promise<JSX.Element> {

    const user = await getUser(userId);
    const notes = await getPatientMedicalNotes(userId);

    const birthDate = user.birthDate ? new Date(user.birthDate) : null;
    
    const calculateAge = (birthDate: Date): number => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        return age;
    }

    const age = birthDate ?  calculateAge(birthDate) : "";

    console.log(notes);
    return (
        <div className='container mx-auto p-6'>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#ADE8F4] to-cyan-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold text-[#0077B6]">Patient Information</CardTitle>
                        <Avatar className="h-16 w-16 bg-[#ADE8F4] rounded-full">
                            <AvatarImage alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-[#0077B6]">{user.name}</h3>
                                <p className="text-sm text-[#0077B6]">Age: {age} - {user.gender}</p>
                                <p className="text-sm text-[#0077B6]">Birth date: {formatDateTime(user.birthDate).dateOnly}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MailIcon className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <PhoneIcon className="h-4 w-4" />
                                    <span>{user.phone ? user.phone : "N/A"}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>{user.address ? user.address : "N/A" }</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <HeartPulseIcon className="h-4 w-4 text-red-500" />
                                    <p>Blood Type: <span className='font-semibold'>{user.bloodType ? user.bloodType : "N/A"}</span></p>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Dna className="h-4 w-4 text-blue-500" />
                                    <span>Allergies: {user.allergies}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Hospital className="h-4 w-4 text-green-500" />
                                    <span>Medication: {user.currentMedication}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-cyan-100 to-indigo-50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-cyan-800">Recent Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {notes.map((note) => (
                            <Link href="" key={note.noteId} className="block">
                                <div className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <ClockIcon className="h-4 w-4" />
                                                <span>{formatDateTime(note.createdAt).dateTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-pink-100 to-indigo-50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-pink-800">Medical History Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                This section would typically contain a summary of the patient&apos;s medical history, 
                                including past conditions, surgeries, and ongoing treatments. For privacy reasons, 
                                we&apos;re not displaying mock medical data here.
                            </p>
                            <Button className="bg-pink-600 hover:bg-pink-700">View Full Medical History</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};