"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Entrance Animations
            tl.from(imageContainerRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
            })
            if (imageContainerRef.current) {
                tl.from(imageContainerRef.current.querySelectorAll(".hero-image-card"), {
                    y: 100,
                    opacity: 0,
                    scale: 0.8,
                    rotation: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                }, "-=1");
            }
            if (textRef.current) {
                tl.from(textRef.current.querySelectorAll(".hero-text"), {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                }, "-=1");
            }

            if (ctaRef.current) {
                tl.fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=0.8"
                );
            }



            // Mouse Move Parallax
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 20;
                const yPos = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to(".floating-shape", {
                    x: xPos * 2,
                    y: yPos * 2,
                    duration: 1,
                    ease: "power1.out",
                });

                gsap.to(".hero-image-card", {
                    x: -xPos,
                    y: -yPos,
                    duration: 1.2,
                    ease: "power1.out",
                });
            };

            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="relative flex min-h-screen w-full flex-col-reverse justify-center overflow-x-hidden bg-noise pt-24 lg:flex-row lg:items-center lg:pt-0"
        >
            {/* Organic Background Elements */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="floating-shape absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-vinotinto/10 blur-[100px] md:h-[800px] md:w-[800px]" />
                <div className="floating-shape absolute -left-[10%] top-[40%] h-[300px] w-[300px] rounded-full bg-pearl-gray blur-[80px] md:h-[600px] md:w-[600px]" />
                <div className="floating-shape absolute bottom-[10%] right-[20%] h-[200px] w-[200px] rounded-full bg-vinotinto/5 blur-[60px]" />
            </div>

            <div className="container relative z-10 mx-auto flex flex-col-reverse gap-12 px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-12 items-center">
                {/* Left Content */}
                <div ref={textRef} className="flex flex-col items-start justify-center lg:col-span-7">
                    <span className="hero-text mb-6 inline-block rounded-full bg-vinotinto/5 px-4 py-2 font-sans text-xs font-bold tracking-[0.2em] uppercase text-vinotinto ring-1 ring-vinotinto/20">
                        Finax Consulting
                    </span>

                    <h1 className="hero-text font-sans text-5xl font-black leading-[0.9] tracking-tighter text-black sm:text-7xl md:text-8xl lg:text-[7rem]">
                        CAPITAL
                    </h1>

                    <h2 className="hero-text -mt-2 font-serif text-3xl font-medium italic text-vinotinto xs:text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                        Estratégico
                    </h2>

                    <p className="hero-text mt-8 max-w-lg text-lg font-normal leading-relaxed text-neutral-600 sm:text-xl md:max-w-xl">
                        Ayudamos a dueños de negocio a acceder al capital que necesitan para crecer de forma estratégica.
                    </p>

                    <div className="mt-8">
                        <a
                            ref={ctaRef}
                            href="#aplicar"
                            className="opacity-0 group relative z-50 inline-flex items-center gap-2 rounded-full border border-vinotinto bg-vinotinto px-4 py-3 shadow-lg transition-all hover:bg-white hover:text-vinotinto hover:scale-105 md:gap-3 md:px-8 md:py-4"
                            aria-label="Ir a aplicar"
                        >
                            <span className="font-sans text-[10px] font-bold tracking-widest text-white transition-colors group-hover:text-vinotinto uppercase sm:text-xs md:text-sm">
                                Quiero Aplicar
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4 text-white transition-colors group-hover:text-vinotinto"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </a>
                    </div>


                </div>

                {/* Right Image (Collage) */}
                <div
                    ref={imageContainerRef}
                    className="relative flex h-[400px] w-full items-center justify-center lg:col-span-5 lg:h-screen lg:justify-end md:h-[500px]"
                >
                    <div className="relative h-full w-full max-w-[500px]">
                        {/* Main Image (Foto 2) */}
                        <div className="hero-image-card absolute left-1/2 top-1/2 z-20 h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px] shadow-2xl md:h-[500px] md:w-[360px] lg:h-[600px] lg:w-[420px]">
                            <Image
                                src="/marianaFotos/marianaFoto2.jpeg"
                                alt="Mariana Bolivar Principal"
                                fill
                                className="object-cover"
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                unoptimized
                            />
                        </div>

                        {/* Secondary Image (Foto 4) - Top Right Behind */}
                        <div className="hero-image-card absolute -right-4 top-[5%] z-10 h-[160px] w-[120px] rotate-6 overflow-hidden rounded-[24px] shadow-xl md:-right-24 md:h-[280px] md:w-[210px] lg:-right-36 lg:top-[10%]">
                            <Image
                                src="/marianaFotos/marianaFoto4.jpeg"
                                alt="Mariana Bolivar Detail"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 33vw, 20vw"
                                unoptimized
                            />
                        </div>

                        {/* Tertiary Image (Foto 5) - Bottom Left Front */}
                        <div className="hero-image-card absolute -left-4 bottom-[15%] z-30 h-[160px] w-[130px] -rotate-6 overflow-hidden rounded-[24px] border-4 border-white shadow-2xl md:-left-16 md:h-[280px] md:w-[220px] lg:-left-12 lg:bottom-[10%]">
                            <Image
                                src="/marianaFotos/marianaFoto5.jpeg"
                                alt="Mariana Bolivar Working"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 20vw"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
