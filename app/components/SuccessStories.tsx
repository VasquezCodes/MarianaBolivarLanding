"use client";

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
import { Instagram } from "lucide-react";

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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
                        Historias de{" "}
                        <span className="relative inline-block px-2">
                            <span className="absolute inset-0 bg-vinotinto/10 -rotate-2 rounded-sm transform translate-y-1"></span>
                            <span className="relative text-black">Éxito</span>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Negocios que confían en nosotros
                    </p>
                </motion.div>

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
            </div>
        </section>
    );
}
