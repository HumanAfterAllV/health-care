import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const initLenis = (): Lenis => {
    if(!lenisInstance){
        lenisInstance = new Lenis({
            smoothWheel: true,
        });

        lenisInstance.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisInstance?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    return lenisInstance;
}

export const cleanupLenis = (): void => {
    if(lenisInstance){
        gsap.ticker.remove((time) => {
            lenisInstance?.raf(time * 1000);
        })
        lenisInstance.destroy();
        lenisInstance = null;
    }
};

/* const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
})

gsap.ticker.lagSmoothing(0); */