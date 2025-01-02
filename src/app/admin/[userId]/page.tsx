"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon, HeartPulseIcon, Hospital, Dna } from 'lucide-react'

import { useFetch } from '@/hooks/useFetch';
import { getUser } from '@/lib/actions/patient.actions';
import { getPatientMedicalNotes } from '@/lib/actions/doctor.actions';
import { formatDateTime } from '@/lib/utils';

/* import { Button } from '@/components/ui/button'; */
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SkeletonCard from '@/components/SkeletonCard';
import ErrorRender from '@/components/ErrorRender';


export default function Page(): JSX.Element {

    const params = useParams();
    const userId = params.userId as string;

    const { data: user, loading, error } = useFetch(getUser, userId);
    const { data: notes, loading: notesLoading, error: notesError } = useFetch(getPatientMedicalNotes, userId);

    if(loading || notesLoading) return <SkeletonCard />;
    if(error || notesError) return <ErrorRender code={error?.status} />;

    const birthDate = user && user.birthDate ? new Date(user.birthDate) : null;
    
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

    if(user === undefined) {
        return <div>Loading...</div>
    }

    return (
        <section className='container mx-auto p-6'>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2 lg:col-span-2 bg-yellow-500 shadow-none border-none rounded-3xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[32px] font-medium text-dark-800">Patient Information</CardTitle>
                        <Avatar className="h-16 w-16 bg-dark-800 text-white rounded-full">
                            <AvatarImage alt={user.name} />
                            <AvatarFallback>{user.name ? user.name.split(' ').map(n => n[0]).join('') : 'N/A'}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-dark-800">{user.name}</h3>
                                <p className="text-sm text-dark-800">Age: {age} - {user.gender}</p>
                                <p className="text-sm text-dark-800">Birth date: {formatDateTime(user.birthDate ? user.birthDate : "").dateOnly}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <MailIcon className="h-4 w-4" />
                                    <span>{user.email ? user.email : "N/A"}</span>
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
                                    <Hospital className="h-4 w-4 text-green-400" />
                                    <span>Medication: {user.currentMedication}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 lg:col-span-1 bg-purple-600 shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[32px] font-medium text-white">Recent Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {notes && notes.map((note) => (
                            <Link href="" key={note.noteId} className="block">
                                <div className="rounded-lg bg-dark-800 p-4 shadow-md transition-all hover:shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-sm text-white">
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
                <Card className="md:col-span-2 lg:col-span-3 bg-green-400 shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-[32px] font-medium text-dark-800">Medical History Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                This section would typically contain a summary of the patient&apos;s medical history, 
                                including past conditions, surgeries, and ongoing treatments. For privacy reasons, 
                                we&apos;re not displaying mock medical data here.
                            </p>
                            {/* <Button className="bg-pink-500 hover:bg-pink-400">View Full Medical History</Button> */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
};