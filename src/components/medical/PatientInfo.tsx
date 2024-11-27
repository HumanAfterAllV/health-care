"use client";

import {useState} from "react";

import CustomFormField from "../CustomFormField";

import { TabsContent } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Form } from "../ui/form";

export default function PatientInfo(): JSX.Element {

    const [bloodPressure, setBloodPressure] = useState<string>("");
    const handleBloodPressureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if(value.length > 3){
            value = value.slice(0, 3) + "/" + value.slice(3, 6);
        }
        setBloodPressure(value);
    }

    return (
        <Card className="w-1/5 h-full overflow-auto bg-white rounded-lg shadow-xl">
            <CardHeader>
                <CardTitle>
                    Patient
                    {/* Patient Name */}
                </CardTitle>
                <CardDescription>Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="info">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="vitals">Vitals signs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info">
                        <div className="mt-8 space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Allergies:</h3>
                                <p>
                                    {/* Allergies */}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Medical History:</h3>
                            <p>
                                {/* Medical History */}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Family History:</h3>
                            <p>
                                {/* Family History */}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Blood Type:</h3>
                            <p>
                                {/* Social History */}
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="vitals">
                        <div className="space-y-4">
                            <Form>
                                <form action="">
                                    <div className="grid w-full items-center gap-1.5">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="height"
                                            label="Height"
                                            placeholder="mts"
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="weight"
                                            label="Weight"
                                            placeholder="kgs"
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            value={bloodPressure}
                                            onChange={handleBloodPressureChange}
                                            name="bloodPressure"
                                            label="Blood Pressure"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <CustomFormField
                                            fieldType={FormFieldTypes.INPUT}
                                            control={form.control}
                                            name="heartRate"
                                            label="Heart Rate"
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