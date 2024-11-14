import Image from "next/image";
import { getUser } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";


export default async function NewAppointment({params: {userId}}: SearchParamProps): Promise<JSX.Element> {

    const patient = await getUser(userId);

    return(
        <div className="flex h-screen max-h-screen">
            <section className="remoce-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000} 
                        width={1000}
                        alt=""
                        className="mb-12 h-10 w-fit"
                    />

                    <AppointmentForm type="create" userId={userId} patient={patient}/>
                    <p className="copyright  mt-10 py-12">
                        © 2024 CarePulse
                    </p>
                </div>
            </section>
            <Image
                src="/assets/images/appointment-img.png"
                height={1000} 
                width={1000}
                alt="patient"
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    )
}