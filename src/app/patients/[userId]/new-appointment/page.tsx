import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Logo from "@/components/Logo";


export default async function NewAppointment({params: {userId}}: SearchParamProps): Promise<JSX.Element> {

    const patient = await getUser(userId);

    return(
        <div className="flex h-screen max-h-screen">
            <section className="remoce-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Link href="/" className="py-10">
                        <Logo />
                    </Link>

                    <AppointmentForm type="create" userId={userId} patient={patient}/>
                    <p className="copyright  mt-10 py-12">
                        © 2024 CarePulse
                    </p>
                </div>
            </section>
            <Image
                src="/assets/images/test-5.jpg"
                height={1000} 
                width={1000}
                alt="patient"
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    )
}