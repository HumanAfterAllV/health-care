/**
 * TODO: Modal for unsaved changes
 */

/* import { useRouter } from "next/navigation";
 */
import { useMedicalNote } from "../../hooks/MedicalNoteContext";

import CustomFormField from "../CustomFormField";

import { FormFieldTypes } from "@/types/supabase.types";
/* import { Editor } from "@tiptap/react";
 */
import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { formatDateTime } from "@/lib/utils";
import { DropletIcon, ShieldAlertIcon, User2Icon } from "lucide-react";


/* interface EditorType {
    editor: Editor | null;
} */

export default function PatientInfo(/* editor: EditorType */): JSX.Element {

    const { form, appointment, /* openModal */ } = useMedicalNote();
    /* const router = useRouter(); */
    
    const birthDate = Array.isArray(appointment.userId) && appointment.userId.length > 0
        ? appointment.userId[0].birthDate: typeof appointment.userId === 'object' && appointment.userId !== null
        ? (appointment.userId as UserDetails).birthDate
        : undefined;
    

/*     const isEditorEmpty = (editor: Editor | null) => {
        if(!editor) return true;
        const content = editor.getJSON();
        return content.content?.length === 0;
    }

    const handleRun = () => {
        if(isEditorEmpty(editor.editor)){
            router.push("/admin");
            return;
        }
        else{
            openModal({
                title: "Unsaved Changes",
                content: "You have unsaved changes. Are you sure you want to leave?",
                onConfirm: () => {
                    router.push("/admin");
                },
                onCancel: () => console.log("cancelled")
            })
        }
    } */

    return (
        <Card className="h-[650px] rounded-2xl bg-[#e8ebfe] shadow-md">
            <CardHeader className="bg-blue-900 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
{/*                     <ArrowLeft onClick={handleRun} width={24} height={24} color="#ffffff" className="mt-2 mr-2 cursor-pointer"/>*/}
                    <User2Icon className="h-5 w-5" />
                    Patient Information
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-sm">
                <Tabs defaultValue="info" className="w-full">
                    <TabsList className="flex bg-white rounded-md">
                        <TabsTrigger 
                            value="info" 
                            className="flex-1 text-sm font-medium text-gray-500 rounded-lg py-2 px-6 data-[state=active]:bg-[#0865fe] data-[state=active]:text-white"
                        >
                            Info
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vitals"
                            className="flex-1 text-sm font-medium text-gray-500 rounded-lg py-2 px-6  data-[state=active]:bg-[#0865fe] data-[state=active]:text-white" 
                        >
                            Vitals signs
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <div className="mt-6 space-y-9">
                            <div className="flex items-center gap-2 text-indigo-800">
                                <User2Icon className="h-5 w-5"/>
                                <div>
                                    <div className="font-semibold text-blue-700">{typeof appointment?.userId === "object" && "name" in appointment.userId ? appointment.userId.name : "N/A"}</div>
                                    <div className="text-sm text-blue-500">Birth Date: {birthDate ?  formatDateTime(birthDate).dateOnly : ""}</div>
                                    <div className="text-sm text-blue-500">Gender: {typeof appointment?.userId === "object" && "gender" in appointment.userId ? appointment.userId.gender : "N/A"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-pink-800">
                                <DropletIcon className="h-5 w-5"/>
                                <div>
                                    <div className="font-semibold">Blood Type</div>
                                    <div className="text-sm text-pink-600">{typeof appointment?.userId === "object" && "bloodType" in appointment.userId ? appointment.userId.bloodType : "N/A"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-cyan-800">
                                <ShieldAlertIcon className="h-5 w-5"/>
                                <div>
                                    <div className="font-semibold">Allergies</div>
                                    <div className="text-sm text-cyan-600">{typeof appointment?.userId === "object" && "allergies" in appointment.userId ? appointment.userId.allergies : "N/A"}</div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="vitals">
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 w-full gap-1 items-center">
                                <CustomFormField
                                    fieldType={FormFieldTypes.INPUT}
                                    control={form.control}
                                    name="height"
                                    label="Height"
                                    placeholder="cm"
                                    iconAlt="height"
                                />
                                <CustomFormField
                                    fieldType={FormFieldTypes.INPUT}
                                    control={form.control}
                                    name="weight"
                                    label="Weight"
                                    placeholder="kgs"
                                    iconAlt="weight"
                                />
                            </div>
                            <div className="grid w-full items-center">
                            </div>
                            <div className="grid w-full items-center">
                                <CustomFormField
                                    fieldType={FormFieldTypes.INPUT}
                                    control={form.control}
                                    name="bloodPressure"
                                    label="Blood Pressure"
                                    placeholder="mmHg"
                                    iconAlt="pressure"
                                />
                            </div>
                            <div className="grid w-full items-center">
                                <CustomFormField
                                    fieldType={FormFieldTypes.INPUT}
                                    control={form.control}
                                    name="heartRate"
                                    label="Heart Rate"
                                    placeholder="min"
                                    iconAlt="heart pulse"
                                />
                            </div>
                            <div className="grid w-full items-center">
                                <CustomFormField
                                    fieldType={FormFieldTypes.INPUT}
                                    control={form.control}
                                    name="temperature"
                                    label="Temperature"
                                    placeholder="C°"
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
                                    iconAlt="percent"
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

