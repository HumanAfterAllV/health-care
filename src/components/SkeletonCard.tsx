import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SkeletonCard(): JSX.Element {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full mx-16 items-center justify-center shadow-none">
                <CardHeader className="space-y-2">
                    <Skeleton className="h-8 w-3/4 bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" /> 
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 bg-gray-200" /> 
                        <Skeleton className="h-10 w-full rounded-3xl bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 bg-gray-200" /> 
                        <Skeleton className="h-10 w-full rounded-3xl bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 bg-gray-200" /> 
                        <Skeleton className="h-10 w-full rounded-3xl bg-gray-200" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-4 w-full rounded-3xl bg-gray-200" />
                </CardFooter>
            </Card>
        </div>
    )
}