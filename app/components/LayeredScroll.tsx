"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LayeredScroll() {
    const container = useRef(null);

    // Initialize Lenis
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect Lenis to ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // Implement User's Stacked Panels Logic
    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const panels: HTMLElement[] = gsap.utils.toArray(".section");

            // Ensure proper z-index stacking (later panels cover earlier ones)
            panels.forEach((panel, i) => {
                panel.style.zIndex = `${i + 1}`;
            });

            // Remove the last panel from the array (it shouldn't animate out)
            if (panels.length > 0) {
                panels.pop();
            }

            panels.forEach((panel) => {
                // Get the element holding the content inside the panel
                const innerpanel = panel.querySelector(".section-inner") as HTMLElement;
                if (!innerpanel) return;

                // Get the Height of the content inside the panel
                const panelHeight = innerpanel.offsetHeight;

                // Get the window height
                const windowHeight = window.innerHeight;

                const difference = panelHeight - windowHeight;

                // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling.
                const fakeScrollRatio = difference > 0 ? (difference / (difference + windowHeight)) : 0;

                // if we need to fake scroll, add margin to bottom
                if (fakeScrollRatio) {
                    panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
                }

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "bottom bottom",
                        // end needs to be strictly typed or defined
                        end: () => fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
                        pinSpacing: false,
                        pin: true,
                        scrub: true,
                    }
                });

                // fake scroll animation
                if (fakeScrollRatio) {
                    tl.to(innerpanel, {
                        yPercent: -100,
                        y: windowHeight,
                        duration: 1 / (1 - fakeScrollRatio) - 1,
                        ease: "none"
                    });
                }

                // Scale and Fade out effect
                tl.fromTo(panel,
                    { scale: 1, opacity: 1 },
                    { scale: 0.7, opacity: 0.5, duration: 0.9 }
                ).to(panel,
                    { opacity: 0, duration: 0.1 }
                );
            });
        });
    }, []); // Scope removed to allow global selection of .section class

    return null; // This component strictly handles logic
}
