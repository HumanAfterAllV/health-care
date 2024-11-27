import {Heart} from "lucide-react"

export default function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-primary rounded-full"></div>
                <Heart className="absolute inset-0 m-auto  text-primary-foreground w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-teal-600">NextHealth</span>
        </div>
    )
}