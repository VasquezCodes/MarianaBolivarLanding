"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Instagram } from "lucide-react";

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                ".contact-reveal",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-24 md:py-32 w-full bg-white relative overflow-hidden">

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-pearl-gray/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 justify-between items-start md:items-center">

                    <div ref={textRef} className="max-w-2xl">
                        <h2 className="contact-reveal font-serif text-5xl md:text-7xl font-bold text-black mb-6">
                            Hablemos<span className="text-vinotinto">.</span>
                        </h2>
                        <p className="contact-reveal text-lg md:text-xl text-neutral-600 mb-12 max-w-lg font-light">
                            ¿Lista para transformar tu realidad financiera? Estoy aquí para guiarte en cada paso hacia tu libertad.
                        </p>

                        <div className="space-y-8">
                            <div className="contact-reveal group cursor-pointer">
                                <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-2">Email</p>
                                <a
                                    href="mailto:Business@marianabolivar.com"
                                    className="font-serif text-2xl md:text-4xl text-black group-hover:text-vinotinto transition-colors duration-300 border-b border-transparent group-hover:border-vinotinto pb-1"
                                >
                                    Business@marianabolivar.com
                                </a>
                            </div>

                            <div className="contact-reveal group cursor-pointer">
                                <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-2">Teléfono</p>
                                <a
                                    href="tel:+13213686440"
                                    className="font-serif text-2xl md:text-4xl text-black group-hover:text-vinotinto transition-colors duration-300 border-b border-transparent group-hover:border-vinotinto pb-1"
                                >
                                    +1 (321) 368-6440
                                </a>
                            </div>

                            <div className="contact-reveal group cursor-pointer">
                                <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-2">Sígueme</p>
                                <a
                                    href="https://www.instagram.com/marianabolivar.business/?hl=es-la"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 font-serif text-2xl md:text-4xl text-black group-hover:text-vinotinto transition-colors duration-300 border-b border-transparent group-hover:border-vinotinto pb-1"
                                >
                                    <Instagram className="w-6 h-6 md:w-8 md:h-8" />
                                    @marianabolivar.business
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
