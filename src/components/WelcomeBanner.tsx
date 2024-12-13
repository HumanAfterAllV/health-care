import Image from "next/image"
import { Card } from "./ui/card"
import { formatDateTime } from "@/lib/utils"

export default function WelcomeBanner(): JSX.Element {
    const currentTime = formatDateTime(new Date()).dateTime;

    return (
        <Card className="flex items-center justify-between bg-[#00B4D8] p-4 text-white rounded-2xl">
            <div className="flex items-center gap-8">
                <Image
                    src="/assets/images/ui-doc2.png"
                    alt="profile"
                    width={120}
                    height={120}
                />
                <div className="space-y-1">
                    <p className="text-3xl font-light">Welcome, <span className="text-3xl font-bold">Dr. Jasmine</span></p>
                    <p className="text-white">Have a nice day at work</p>
                </div>
            </div>
            <div className="font-semibold">
                {currentTime}
            </div>
        </Card>
    )
}