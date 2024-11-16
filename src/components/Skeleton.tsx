export default function Skeleton({className}: {className: string}): JSX.Element {
    return(
        <div className={`animate-pulse bg-gray-300 rounded-md ${className}`}
        style={{ height: "100%", width: "100%" }}>
            
        </div>
    )
}