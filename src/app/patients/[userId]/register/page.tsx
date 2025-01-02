"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { useFetch } from "@/hooks/useFetch";
import { getUser } from "@/lib/actions/patient.actions"

import RegisterForm from "@/components/forms/RegisterForm"
import SkeletonCard from "@/components/SkeletonCard"
import ErrorRender from "@/components/ErrorRender";

export default function Register(): JSX.Element {
    
    const params = useParams();
    const userId = params.userId as string;

    const { data: user, loading, error } = useFetch<User>(getUser, userId);

    if (loading) return <SkeletonCard />;
    if (error) return <ErrorRender code={error.status} />;
    
    return (

        <section className="flex h-screen max-h-screen">
            <div className="remove-scroll container">
                {user && <RegisterForm user={user}/>}
            </div>
            <div className="relative w-1/4 h-full hidden lg:flex bg-purple-600">
                <Image
                    src="/assets/images/test-5.jpg"
                    alt="Medical professional"
                    fill
                    className="object-cover"
                    sizes="25vw"
                    priority={true}
                />
            </div>
        </section>
        
    )
}