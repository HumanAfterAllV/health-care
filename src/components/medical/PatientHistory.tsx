import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export default function PatientHistory(): JSX.Element {
    return(
        <Card className="w-1/6 h-full shadow-lg bg-white">
            <CardHeader className="bg-accent text-accent-foreground p-4">
                <CardTitle className="text-2xl">Medical Note History:</CardTitle>
            </CardHeader>
            <CardContent className="p-0">

            </CardContent>
      </Card>
    )
}