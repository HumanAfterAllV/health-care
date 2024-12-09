
import Link from 'next/link';

import { getUser } from '@/lib/actions/patient.actions';
import { getPatientMedicalNotes } from '@/lib/actions/doctor.actions';
import { formatDateTime } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default async function Page({params: {userId} }: SearchParamProps): Promise<JSX.Element> {

    const user = await getUser(userId);
    const notes = await getPatientMedicalNotes(userId);

    console.log(notes);
    return (
        <div className='min-h-screen bg-gradient-to-br from-teal-200 to-teal-100 p-8'>
            <main className='container mx-auto px-4'>
                <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                    <div className='p-6 sm:p-10'>
                        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Patient profile</h1>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                                        <p className="text-sm text-gray-500">ID: {user.userId}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Birth Date</p>
                                        <p className="mt-1 text-sm text-gray-900">{formatDateTime(user.birthDate).dateOnly}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Gender</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.gender}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-sm font-medium text-gray-500">Address</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.address}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Allergies</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.allergies}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Current Medication</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.currentMedication}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Family Medical History</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.familyMedicalHistory}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Emergency Contact</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.emergencyContactName}</p>
                                        <p className="mt-1 text-sm text-gray-900">{user.emergencyContactNumber}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Separator className='my-8'/>
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Medical Notes</CardTitle>
                            </CardHeader>
                            {!notes.length ? (
                                <CardContent className="p-6">
                                    <p className="text-gray-500">No medical notes available</p>
                                </CardContent>
                            ) : (
                                <ScrollArea>
                                    <CardContent className="p-6">
                                        <ul className="space-y-4">
                                            {notes.map((note, index) => (
                                                <li key={note.noteId}>
                                                    <Link href={`/notes/${note.noteId}`} className="">
                                                        <p className='text-sm'>{index + 1}.- {formatDateTime(note.createdAt).dateTime}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </ScrollArea>
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
};