import Image from "next/image"
import Link from "next/link"

import PatientForms from "@/components/forms/PatientForms"
import PasskeyModal from "@/components/PasskeyModal";
import Logo from "@/components/Logo";

export default function Page({ searchParams }: SearchParamProps): JSX.Element {
    const isAdmin = searchParams?.admin === "true";
    
    return(
        <section className="flex h-screen max-h-screen">
            {isAdmin && <PasskeyModal/>}
            <div className="remove-scroll container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Link href="/" className="py-8">
                        <Logo />
                    </Link>
                    <PatientForms />
                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 NextHealth
                        </p>
                        <Link href={"/patients/?admin=true"} className="text-[#00B4D8] ">
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
            <Image src="/assets/images/doctor-world.jpg" height={1000} width={1000} alt="patient" className="side-img max-w-[50%]"/>
        </section>
    )
}