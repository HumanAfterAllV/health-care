/**
 * TODO: Modal for unsaved changes
 */

import { DropletIcon, Ruler, ShieldAlertIcon, User2Icon, WeightIcon, Activity, Thermometer, HeartPulse} from "lucide-react";
import { useMedicalNote } from "@/hooks/useNoteContext";

import CustomFormField from "../CustomFormField";
import { CustomProps } from "../CustomFormField";

import { formatDateTime } from "@/lib/utils";
import { FormFieldTypes } from "@/types/supabase.types";

import { TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import SubmitButton from "../SubmitButton";

export default function SignsVitalForm(/* editor: EditorType */): JSX.Element {

    const { form, appointment, loading } = useMedicalNote();
    
    const birthDate = Array.isArray(appointment.userId) && appointment.userId.length > 0
        ? appointment.userId[0].birthDate: typeof appointment.userId === 'object' && appointment.userId !== null
        ? (appointment.userId as UserDetails).birthDate
        : undefined;
    

    const vitalInputItems: CustomProps[] = [
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "height", label: "Height", placeholder: "cm", iconAlt: "height", icon: Ruler},
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "weight", label: "Weight", placeholder: "kgs", iconAlt: "weight", icon: WeightIcon},
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "bloodPressure", label: "Blood Pressure", placeholder: "mmHg", iconAlt: "blood pressure", icon: ShieldAlertIcon},
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "heartRate", label: "Hearth Rate", placeholder: "min", iconAlt: "pulse", icon: HeartPulse},
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "temperature", label: "Temperature", placeholder: "°C", iconAlt: "temperature", icon: Thermometer },
        {fieldType: FormFieldTypes.INPUT, control: form.control, name: "oxygenSaturation", label: "Oxygen Saturation", placeholder: "80%", iconAlt: "respiratory rate", icon: Activity},
    ];

    return (
        <Card className="p-4 h-screen overflow-y-auto bg-white border-l border-gray-200">
            <h2 className="text-2xl font-medium mb-4">Signs Vitals</h2>
            <Card className="col-span-2 shadow-none text-dark-800 bg-green-400">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-2 rounded-full bg-white">
                        <Activity className="h-5 w-5 text-dark-white"/>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font font-medium">General Status</p>
                        <p className="text-2xl font-medium">Stable</p>
                    </div>
                </CardContent>
            </Card>
                <Tabs defaultValue="info" className="w-full mt-3">
                    <TabsList className="flex bg-gray-200 rounded-md">
                        <TabsTrigger 
                            value="info" 
                            className="flex-1 text-sm font-medium text-dark-800 rounded-lg py-2 px-6 data-[state=active]:bg-green-400 data-[state=active]:text-white"
                        >
                            Info
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vitals"
                            className="flex-1 text-sm font-medium text-dark-800 rounded-lg py-2 px-6  data-[state=active]:bg-green-400 data-[state=active]:text-white" 
                        >
                            Vitals
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <div className="mt-6 space-y-9">
                            <div className="flex items-center gap-2">
                                <User2Icon className="h-5 w-5"/>
                                <div className="text-dark-800">
                                    <div className="font-semibold">{typeof appointment?.userId === "object" && "name" in appointment.userId ? appointment.userId.name : "N/A"}</div>
                                    <div className="text-sm">Birth Date: {birthDate ?  formatDateTime(birthDate).dateOnly : ""}</div>
                                    <div className="text-sm">Gender: {typeof appointment?.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : "N/A"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-dark-800">
                                <ShieldAlertIcon className="h-5 w-5"/>
                                <div>
                                    <div className="font-semibold">Allergies</div>
                                    <div className="text-sm text-dark-800">{typeof appointment?.userId === "object" && "allergies" in appointment.userId ? appointment.userId.allergies : "N/A"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-pink-800">
                                <DropletIcon className="h-5 w-5"/>
                                <div>
                                    <div className="font-semibold">Blood Type</div>
                                    <div className="text-sm text-pink-600">{typeof appointment?.userId === "object" && "bloodType" in appointment.userId ? appointment.userId.bloodType : "N/A"}</div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="vitals">
                        {vitalInputItems.map((item, index) => 
                        index % 2 === 0 ? (
                            <Card key={index} className="mb-4 shadow-none p-2">
                                <CustomFormField {...item} />
                                {vitalInputItems[index + 1] && <CustomFormField {...vitalInputItems[index + 1]} />}
                            </Card>
                        ) : null)}
                        <div className="mt-10">
                            <SubmitButton isLoading={loading}>Submit</SubmitButton>
                        </div>
                    </TabsContent>
            </Tabs>
        </Card>
    )
};

