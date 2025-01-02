"use client"

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link"
import Image from "next/image";

import { useAnimationsGSAP } from "@/hooks/useAnimationsGSAP";  

import PatientForms from "@/components/forms/PatientForms"
import PasskeyModal from "@/components/PasskeyModal";
import Logo from "@/components/Logo";
import SkeletonCard from "@/components/SkeletonCard";

function PatientPageContent(): JSX.Element {

    const searchParams = useSearchParams();
    const isAdmin = searchParams.get("admin") === "true";

    const { elementRef: formAppear } = useAnimationsGSAP("FormAppear");
    
    return(
        <section className="flex h-screen max-h-screen overflow-hidden">
            {isAdmin && <PasskeyModal/>}
            <div ref={formAppear} className="remove-scroll container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Logo className="py-8 animate-item"/>
                    <PatientForms className="space-y-6 flex-1 overflow-hidden"/>
                    <div className="text-14-regular mt-20 flex justify-between animate-item">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 NextHealth
                        </p>
                        <Link href={"/patients/?admin=true"} className="text-green-400 ">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-wrap w-1/2 h-full hidden lg:flex">
                <div className="relative w-full h-full">
                    <Image
                    src="/assets/images/doctor-2.jpg"
                    alt="Doctors"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    />
                </div>
            </div>
        </section>
    )
}

export default function Page(): JSX.Element {
    return (
      <Suspense fallback={<SkeletonCard />}>
        <PatientPageContent />
      </Suspense>
    );
  }