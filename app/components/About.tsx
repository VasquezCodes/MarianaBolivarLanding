"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="flex w-full flex-col items-center justify-center gap-12 bg-white px-6 py-12 text-black md:flex-row md:gap-24 md:px-20 md:py-20"
        >
            {/* Photo Collage */}
            <div className="relative h-[500px] w-full max-w-lg md:h-[650px] md:w-1/2">
                {/* Photo 1: Main Portrait (Back/Left) */}
                <div className="absolute left-0 top-10 h-[80%] w-[65%] overflow-hidden rounded-[2rem] shadow-xl bg-neutral-200">
                    <Image
                        src="/marianaFotos/marianaFoto1.jpeg"
                        alt="Mariana Bolivar Portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        priority
                        unoptimized
                    />
                </div>

                {/* Photo 2: Secondary (Top Right) */}
                <div className="absolute right-0 top-0 h-[45%] w-[45%] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-500 hover:scale-105 hover:z-30 z-10 bg-neutral-200 block">
                    <Image
                        src="/marianaFotos/marianaFoto3.jpeg"
                        alt="Mariana Bolivar Detail"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                </div>

                {/* Photo 3: Tertiary (Bottom Right) */}
                <div className="absolute bottom-5 right-4 h-[40%] w-[50%] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl z-20 bg-neutral-200 block">
                    <Image
                        src="/marianaFotos/marianaFoto.jpeg"
                        alt="Mariana Bolivar Working"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full border border-vinotinto/30" />
            </div>

            <div ref={textRef} className="flex max-w-lg flex-col gap-8 md:w-1/2">
                <span className="font-sans text-xs font-bold tracking-widest text-vinotinto uppercase">
                    Sobre Mí
                </span>
                <h2 className="font-serif text-4xl font-bold text-black md:text-5xl leading-tight">
                    Más que dinero, <br />
                    <span className="text-vinotinto italic">es estrategia.</span>
                </h2>
                <div className="h-1 w-20 bg-vinotinto"></div>
                <p className="text-lg font-normal leading-relaxed text-neutral-600">
                    Nuestro enfoque va más allá de solo “conseguir dinero”. Acompañamos a cada empresario en el proceso de organización, posicionamiento y estrategia financiera.
                </p>
                <p className="text-lg font-normal leading-relaxed text-neutral-600">
                    Creemos que el capital correcto, en el momento correcto, puede transformar un negocio. Y nuestro trabajo es ayudarte a acceder a él de manera inteligente.
                </p>


            </div>
        </section>
    );
}
