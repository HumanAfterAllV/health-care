import RenderUserAppointment from "@/components/RenderUserAppointment";

export default function Success(): JSX.Element {

    return (
        <section className="flex flex-col h-screen max-h-screen ">
            <div className="success-img"> 
                
                <RenderUserAppointment/>
                <p className="copyright mt-10 py-12">
                    © 2024 CarePulse
                </p>
            </div>
        </section>
    )
}