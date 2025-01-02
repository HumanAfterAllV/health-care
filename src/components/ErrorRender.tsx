import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link";
import { Button } from "./ui/button";

interface ErrorRenderProps {
    code?: number;
}

export default function ErrorRender({code = 500} : ErrorRenderProps): JSX.Element {

    const errorMessages = {
        404: {
            title: "Page not found",
            description: "The page you are looking for does not exist."
        },
        500: {
            title: "Internal Server Error",
            description: "An error occurred while processing your request. Please try again later."
        },
        503: {
            title: "Service Unavailable",
            description: "The server is currently unavailable. Please try again later."
        }
    };

    const { title, description } = errorMessages[code] || {
        title: "Unknown Error",
        description: "An unknown error occurred. Please try again later."
    };


    return (
        <div className='h-screen flex items-center justify-center p-4'>
            <Card className="rounded-3xl">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <AlertCircle className="h-10 w-10 text-destructive text-red-500" aria-hidden="true" />
                        <div className="grid gap-1">
                            <h1 className="text-4xl font-bold tracking-tight">Error {code}</h1>
                            <p className="text-lg text-muted-foreground">{title}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                <Alert variant="destructive" className="mb-4">
                        <AlertTitle>Error: {title}</AlertTitle>
                        <AlertDescription>{description}</AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" className='shad-primary-btn-rt' onClick={() => window.location.reload()}>
                        Refresh
                    </Button>
                    <Button className='shad-primary-btn-rt' variant="outline">
                        <Link href="/">
                            Go to Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}