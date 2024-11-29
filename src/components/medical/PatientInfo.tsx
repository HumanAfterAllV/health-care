import CustomFormField from "../CustomFormField";

import { useMedicalNote } from "./MedicalNoteContext";

import { FormFieldTypes } from "@/types/supabase.types";

import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Form } from "../ui/form";
import { formatDateTime } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PatientInfo(): JSX.Element {

    const { form, appointment } = useMedicalNote();
    
    const birthDate = Array.isArray(appointment.userId) && appointment.userId.length > 0
        ? appointment.userId[0].birthDate: typeof appointment.userId === 'object' && appointment.userId !== null
        ? (appointment.userId as UserDetails).birthDate
        : undefined;
    
    

    return (
        <Card className="w-1/5 h-full overflow-auto bg-white rounded-lg shadow-xl">
            <CardHeader className="bg-teal-700 mb-4 text-white">
                <CardTitle className="flex text-3xl mb-2">
                    <Link href="/admin">
                        <ArrowLeft width={24} height={24} color="#ffffff" className="mt-2 mr-2 cursor-pointer"/>
                    </Link>
                    {typeof appointment.userId === "object" && "name" in appointment.userId ? appointment.userId.name : ""}
                </CardTitle>
                <CardDescription>Birth Date: {birthDate ?  formatDateTime(birthDate).dateOnly : ""}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="flex bg-gray-200 rounded-md">
                        <TabsTrigger 
                            value="info" 
                            className="flex-1 text-sm font-medium text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-300 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
                            >
                                Info
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vitals"
                            className="flex-1 text-sm font-medium text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-300 data-[state=active]:bg-teal-500 data-[state=active]:text-white" 
                            >
                                Vitals signs
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold mb-2">Allergies:</h3>
                            <p className="text-sm">
                                {typeof appointment?.userId === "object" && "allergies" in appointment.userId ? appointment.userId.allergies : "N/A"}
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold">Current Medication:</h3>
                            <p className="text-sm">
                                {typeof appointment.userId === "object" && "currentMedication" in appointment.userId ? appointment.userId.currentMedication : "N/A"}
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold mb-2">Family History:</h3>
                            <p className="text-sm">
                                {typeof appointment.userId === "object" && "familyMedicalHistory" in appointment.userId ? appointment.userId.familyMedicalHistory : "N/A"}
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="font-semibold mb-2">Blood Type:</h3>
                            <p className="text-sm">
                                {typeof appointment.userId === "object" && "bloodType" in appointment.userId ? appointment.userId.bloodType : "N/A"}
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="vitals">
                        <div className="mt-6 space-y-4">
                            <Form {...form}>
                                <form action="">
                                    <div className="grid w-full items-center pb-4">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="height"
                                            label="Height"
                                            placeholder="cm"
                                            iconSrc="/assets/icons/height.svg"
                                            iconAlt="height"
                                        />
                                    </div>
                                    <div className="grid w-full items-center pb-4">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="weight"
                                            label="Weight"
                                            placeholder="kgs"
                                            iconSrc="/assets/icons/weight.svg"
                                            iconAlt="weight"
                                        />
                                    </div>
                                    <div className="grid w-full items-center pb-4">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="bloodPressure"
                                            label="Blood Pressure"
                                            placeholder="mmHg"
                                            iconSrc="/assets/icons/pressure.svg"
                                            iconAlt="pressure"
                                        />
                                    </div>
                                    <div className="grid w-full items-center pb-4">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="heartRate"
                                            label="Heart Rate"
                                            placeholder="min"
                                            iconSrc="/assets/icons/heart-pulse.svg"
                                            iconAlt="heart pulse"
                                        />
                                    </div>
                                    <div className="grid w-full items-center pb-4">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="temperature"
                                            label="Temperature"
                                            placeholder="C°"
                                            iconSrc="/assets/icons/thermometer.svg"
                                            iconAlt="thermometer"
                                        />
                                    </div>
                                    <div className="grid w-full items-center">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="oxygenSaturation"
                                            label="Oxygen Saturation"
                                            placeholder="80%"
                                            iconSrc="/assets/icons/percent.svg"
                                            iconAlt="percent"
                                        />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </TabsContent>
                </Tabs>
                
            </CardContent>
        </Card>
    )
}