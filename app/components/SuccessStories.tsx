"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/ui/carousel";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Instagram, Play, Pause } from "lucide-react";

function VideoPlayer({ src, thumbnailSrc }: { src: string, thumbnailSrc: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative w-full h-full group" onClick={togglePlay}>
            <video
                ref={videoRef}
                className="w-full h-full object-cover bg-neutral-900"
                preload="metadata"
                playsInline
                onEnded={() => setIsPlaying(false)}
            >
                <source src={src} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </video>

            {/* Thumbnail / Play Overlay */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10 bg-black/20 backdrop-blur-[2px] ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            >
                {/* Avatar Circle with Pulse Effect */}
                <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-75 duration-3000"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <Image
                            src={thumbnailSrc}
                            alt="Cliente"
                            fill
                            className="object-cover"
                        />

                        {/* Play Icon Overlay on Avatar */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-white ml-1 drop-shadow-lg" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Text Overlay - Always visible at bottom, perhaps fade out slightly when playing if desired, but good context */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none transition-opacity duration-300">
                <p className="text-white font-serif text-lg md:text-xl italic leading-tight mb-1">
                    "Ella nos asesoro super bien, la super recomiendo!"
                </p>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    — Sandra Frometa
                </p>
            </div>
        </div>
    );
}

const successStories = [
    {
        id: 1,
        company: "Aroma Orlando",
        logo: "/logos/aromaOrlando_ParaMariana.jpg",
        metric: "+$50,000 USD",
        description: "en financiamiento obtenido",
        quote: "Gracias a la asesoría, logramos el capital necesario para expandir nuestra operación.",
        instagramUrl: "https://www.instagram.com/aroma_orlando/?hl=es",
    },
    {
        id: 2,
        company: "By Sandra Frometa",
        logo: "/logos/logoSandra_ParaMariana.jpg",
        metric: "+$30,000 USD",
        description: "en financiamiento obtenido",
        quote: "La estrategia financiera transformó completamente nuestra capacidad de inversión.",
        instagramUrl: "https://www.instagram.com/bysandrafrometa/",
    },
];

export default function SuccessStories() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header - Title at Top */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="inline-block py-1 px-3 border border-vinotinto/20 rounded-full text-vinotinto text-xs font-bold uppercase tracking-widest mb-4 bg-vinotinto/5">
                        Resultados Reales
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-[1.1]">
                        Historias de <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-vinotinto to-vinotinto/80 italic px-2">Transformación</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 md:mb-24 relative">
                    {/* Left Column - Editorial Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 order-2 lg:order-1 text-center lg:text-left"
                    >


                        <div className="flex flex-row gap-4 mb-8">
                            <span className="text-vinotinto text-6xl font-serif leading-none opacity-80 select-none">“</span>
                            <blockquote className="text-xl md:text-2xl text-neutral-700 font-medium leading-relaxed relative">
                                La transformación de mi negocio fue inmediata. No solo obtuvimos capital, sino una estrategia clara para crecer.
                            </blockquote>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-neutral-100">
                                <Image
                                    src="/logos/logoSandra_ParaMariana.jpg"
                                    alt="Sandra Frometa"
                                    width={56}
                                    height={56}
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-black text-base font-serif">Sandra Frometa</p>
                                <p className="text-vinotinto/80 text-xs font-semibold uppercase tracking-wider">CEO, By Sandra Frometa</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Video Section */}

                    {/* Right Column - Video with Offset Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative max-w-[280px] sm:max-w-sm mx-auto lg:mr-auto order-1 lg:order-2"
                    >
                        {/* Abstract Backdrop Elements */}
                        <div className="absolute -right-6 md:-right-8 -bottom-6 md:-bottom-8 w-full h-full bg-pearl-gray rounded-[2rem] -z-10 transform rotate-3 transition-transform duration-700 group-hover:rotate-6 scale-95 md:scale-100"></div>
                        <div className="absolute -left-6 md:-left-8 -top-6 md:-top-8 w-full h-full border border-vinotinto/10 rounded-[2rem] -z-20 transform -rotate-2 scale-95 md:scale-100"></div>

                        {/* Video Container */}
                        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/20">
                            <VideoPlayer
                                src="/videos/testimonialVideo.mp4"
                                thumbnailSrc="/logos/logoSandra_ParaMariana.jpg"
                            />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -right-4 md:-right-4 top-8 md:top-12 z-20 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 scale-90 md:scale-100 origin-top-right"
                        >
                            <p className="text-vinotinto font-bold text-2xl mb-0.5 leading-none">+$30k</p>
                            <p className="text-neutral-500 text-[10px] leading-tight uppercase font-bold tracking-wide">Financiamiento</p>
                        </motion.div>
                    </motion.div>
                </div>



                <div className="flex justify-center">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: false,
                            }) as any,
                        ]}
                        className="w-full max-w-4xl"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {successStories.map((story) => (
                                <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                                    <div className="p-1 md:p-2">
                                        <Card className="relative border-none shadow-sm bg-neutral-50 hover:bg-neutral-100 hover:shadow-md transition-all duration-300">
                                            {/* Instagram Link */}
                                            <Link
                                                href={story.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-4 right-4 text-neutral-400 hover:text-vinotinto transition-colors duration-300 z-10 p-2"
                                                aria-label={`Ver Instagram de ${story.company}`}
                                            >
                                                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                                            </Link>

                                            <CardContent className="flex flex-col items-center justify-center p-6 md:p-10 text-center min-h-[350px]">
                                                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-neutral-100">
                                                    <Image
                                                        src={story.logo}
                                                        alt={`${story.company} logo`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-black">
                                                    {story.company}
                                                </h3>

                                                <div className="mt-2 mb-4 space-y-1">
                                                    <span className="text-3xl md:text-4xl font-bold text-vinotinto block tracking-tight">
                                                        {story.metric}
                                                    </span>
                                                    <span className="text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-widest line-clamp-2">
                                                        {story.description}
                                                    </span>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="border-vinotinto/20 text-vinotinto hover:bg-vinotinto hover:text-white transition-colors" />
                            <CarouselNext className="border-vinotinto/20 text-vinotinto hover:bg-vinotinto hover:text-white transition-colors" />
                        </div>
                    </Carousel>
                </div>
            </div >
        </section >
    );
}
