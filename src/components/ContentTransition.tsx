
import { useRef, useEffect } from "react";
import Image from "next/image"

import SplitType from "split-type";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import { imgItems, servicesCopy, specialtyServices } from "@/constants"

export default function ContentTransition(): JSX.Element {

    const stickySectionRef = useRef<HTMLDivElement | null>(null);
    const servicesRef = useRef<HTMLDivElement[]>([]);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const currentCountRef = useRef<HTMLSpanElement | null>(null);
    const serviceImgRef = useRef<HTMLDivElement | null>(null);
    const serviceCopyRef = useRef<HTMLParagraphElement | null>(null);
  
    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
  
      const stickySection = stickySectionRef.current;
      const indicator = indicatorRef.current;
      const currentCount = currentCountRef.current;
      const serviceImg = serviceImgRef.current;
      const serviceCopy = serviceCopyRef.current;
  
      if (!stickySection || !indicator || !currentCount || !serviceImg || !serviceCopy) return;
  
      const services = servicesRef.current;
      const stickyHeight = window.innerHeight * 8;
      const serviceHeight = 38;
      const imgHeight = 250;
      const scrollPerService = window.innerHeight;
  
      serviceCopy.textContent = servicesCopy[0][0];
      let currentSplitText = new SplitType(serviceCopy, { types: "lines" });
  
      
      const measureContainer = document.createElement("div");
      measureContainer.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-size: 60px;
            font-weight: 600;
            text-transform: uppercase;
      `;
      document.body.appendChild(measureContainer);
  
      const serviceWidths = services.map((service) => {
        measureContainer.textContent = service.querySelector("p")?.textContent || "";
        return measureContainer.offsetWidth + 8;
      });
  
      document.body.removeChild(measureContainer);
  
      gsap.set(indicator, {
            width: serviceWidths[0],
            xPercent: -50,
            left: "50%",
        });
  
      let currentIndex = 0;
  
      const animateTextChange = (index: number) => {
        return new Promise<void>((resolve) => {
          gsap.to(currentSplitText.lines, {
                opacity: 0,
                y: -20,
                duration: 0.25,
                stagger: 0.025,
                ease: "power3.inOut",
                onComplete: () => {
                currentSplitText.revert();
    
                const newText = servicesCopy[index][0];
                serviceCopy.textContent = newText;
    
                currentSplitText = new SplitType(serviceCopy, {
                    types: "lines",
                });
    
                gsap.set(currentSplitText.lines, {
                    opacity: 0,
                    y: 20,
                });
    
                gsap.to(currentSplitText.lines, {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    stagger: 0.025,
                    ease: "power3.out",
                    onComplete: resolve,
                });
                },
            });
        });
      };
  
      ScrollTrigger.create({
            trigger: stickySection,
            start: "top top",
            end: `${stickyHeight}px`,
            pin: true,
            onUpdate: async (self) => {
                const progress = self.progress;
                gsap.set(".progress", { scaleY: progress });
        
                const scrollPosition = Math.max(0, self.scroll() - window.innerHeight);
                const activeIndex = Math.floor(scrollPosition / scrollPerService);

                console.log("Scroll Position:", scrollPosition);
                console.log("Active Index:", activeIndex);
        
                if (activeIndex >= 0 && activeIndex < services.length && currentIndex !== activeIndex) {
                    console.log("Updating to Active Index:", activeIndex);
                    currentIndex = activeIndex;
        
                    services.forEach((service) => service.classList.remove("active"));
                    services[activeIndex]?.classList.add("active");
        
                    await Promise.all([
                    gsap.to(indicator, {
                        y: activeIndex * serviceHeight,
                        width: serviceWidths[activeIndex],
                        duration: 0.3,
                        ease: "power3.inOut",
                        overwrite: true,
                    }),
        
                    gsap.to(serviceImg, {
                        y: -(activeIndex * imgHeight),
                        duration: 0.3,
                        ease: "power3.inOut",
                        overwrite: true,
                    }),
        
                    gsap.to(currentCount, {
                        innerText: activeIndex + 1,
                        snap: { innerText: 1 },
                        duration: 0.3,
                        ease: "power3.out",
                    }),
        
                    animateTextChange(activeIndex),
                    ]);
                }
            },
        });
    }, []);


    
    return (
        <section ref={stickySectionRef} className="w-full h-full relative flex max-900:flex-col">
            <div className="col flex flex-1 flex-col justify-center items-center gap-[2em] ">
                <div className="services relative flex flex-col align-center max-900:pt-1/4 max-900:justify-start">
                    <div ref={indicatorRef} className="indicator absolute top-0 left-0 w-full h-[38px] translate-y-0 bg-blue-900 -z-10 rounded-md"></div>
                    {specialtyServices.map((service, index) => (
                        <div key={index} ref={(el) => {servicesRef.current[index] = el!}} className={`service ${index[0] ? "active" : ""}`}>
                            <p>{service}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col flex flex-1 flex-col justify-center items-center gap-[2em]">
                <div className="service-img-wrapper max-900:w-1/4">
                    <div ref={serviceImgRef} className="service-img w-full h-[2000px] translate-y-0 will-change-transform ">
                        {imgItems.map((items, index) => (
                            <Image
                                key={index}
                                src={items.image}
                                alt={items.alt}
                                width={500}
                                height={250}
                                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-3/5 text-lg font-light max-900:text-sm">
                    <p ref={serviceCopyRef}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                        deserunt soluta, consequatur sit et tenetur facilis ex ab
                        voluptatibus possimus voluptatem doloribus delectus id eveniet qui
                        similique magnam quibusdam nostrum.
                    </p>
                </div>
            </div>
            <div className="progress-bar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[2.5px] h-3/5 bg-[#d5d5d5] max-900:top-1/2 max-900:h-1/2 max-900:rotate-[-90deg]">
                <div className="progress absolute top-0 left-0 w-full h-full bg-black origin-top transform scale-y-0 will-change-transform"></div> 
            </div>
            <div className="index absolute left-1/2 bottom-[10%] transform -translate-x-1/2 w-[60px] px-1 py-1 justify-between flex items-center bg-blue-900 text-white max-900:top-[5%]">
                <span ref={currentCountRef}>1</span>
                <span className="separator relative top-[-1px] w-[20px] h-[2px] bg-white"></span>
                <span>9</span>
            </div>
        </section>
    )
};