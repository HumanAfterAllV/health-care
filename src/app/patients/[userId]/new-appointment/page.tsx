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
{/*                 <div className="w-1/3 h-full overflow-hidden">
                    <video 
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/assets/video/test.mp4" />
                    </video>
                </div> */}
            </section>
        </div>
    )
}