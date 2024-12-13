"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getPatientsByName } from "@/lib/actions/doctor.actions"

import { Input } from "./ui/input"
import { Search, Loader } from "lucide-react"

export default function SearchPatient(): JSX.Element {
    const [ searchTerm, setSearchTerm ] = useState<string>("");
    interface Patient {
        userId: string;
        name: string;
    }

    const [result, setResults] = useState<Array<Patient>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchPatient = async() => {
            if(!debouncedSearchTerm){
                setResults([]);
                return;
            }
            setIsLoading(true)
    
            try{
                const data = await getPatientsByName(debouncedSearchTerm);
                setResults(data);
            }
            catch(error: unknown){
                console.error("Error fetching data:", error);
            }
            finally{
                setIsLoading(false)
            }
        };

        fetchPatient();

    },[debouncedSearchTerm]);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search patients"
                    className="pl-8 bg-white border-[#48CAE4] focus:border-[#0096C7] focus:ring-[#0096C7]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" size={20} />
                {isLoading && <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" size={15} />}
            </div>
            {result.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border">
                    {result.map((patient) => (
                        <li key={patient.userId} className="last:border-none">
                            <Link href={`/admin/${patient.userId}`} className="block px-4 py-2 hover:bg-[#CAF0F8]">
                                {patient.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function useDebounce<T>(value: T, wait: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, wait);

        return () => {
            clearTimeout(handler);
        };
    }, [value, wait]);

    return debouncedValue;
}