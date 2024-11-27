export default function BackgroundVideo() {
    return(
        <div className="absolute inset -z-10 h-full w-full overflow-hidden">
            <video 
                className="object-cover h-full w-full"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/video/BackgroundVideo2.mp4"/>
            </video>
            <div className="absolute inset-0 bg-neutral-50 bg-opacity-50"></div> 
        </div>
    )
}