"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MessageCircle, FileText, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Acceso a Capital & Estructuración",
        desc: "Preparamos tu empresa para cumplir requisitos financieros, optimizar perfil crediticio y abrir puertas a líneas de crédito y capital de trabajo.",
        price: "Servicio Principal",
        highlight: true,
    },
    {
        title: "Consultoría Estratégica",
        desc: "Acompañamiento para organizar y posicionar tu negocio hacia un crecimiento sostenible y escalable.",
        price: "A medida",
        highlight: false,
    },
    {
        title: "Mentoria 1:1",
        desc: "Auditoría financiera y plan de acción personalizado para dueños de negocio.",
        price: "Consultar",
        highlight: false,
    },
];

export default function Services() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(".reveal-text", {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="flex min-h-[85vh] w-full flex-col justify-center bg-white px-6 py-24 text-black md:px-12 lg:px-24"
        >
            <div className="mx-auto w-full max-w-7xl">
                {/* Header */}
                <div className="mb-20 text-center md:text-left reveal-text">
                    <span className="mb-4 block font-sans text-xs font-bold tracking-[0.2em] text-vinotinto uppercase">
                        Servicio Exclusivo
                    </span>
                    <h2 className="font-serif text-4xl font-bold leading-tight md:text-6xl max-w-3xl">
                        <span className="italic text-vinotinto">Acceso a Capital</span>
                    </h2>
                </div>

                <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
                    {/* Column 1: The Struggle (Pain) */}
                    <div className="reveal-text flex flex-col justify-center space-y-8 lg:col-span-5 border-l-2 border-neutral-200 pl-6 md:pl-10">
                        <h3 className="font-serif text-2xl text-neutral-800">
                            Sin Estrategia de Capital:
                        </h3>
                        <ul className="space-y-6 text-lg text-neutral-700">
                            <li className="flex items-start gap-4">
                                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                                <span className="leading-relaxed">Crecimiento limitado por tu propio flujo de caja o ahorros personales.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                                <span className="leading-relaxed">Riesgo directo a tu patrimonio familiar al usar crédito personal.</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                                <span className="leading-relaxed">Rechazo bancario por falta de "perfil comercial" estructurado.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: The Solution (Gain) */}
                    <div id="programa-capital" className="reveal-text relative flex flex-col justify-center lg:col-span-7">
                        <div className="absolute -left-12 -top-12 -z-10 h-64 w-64 rounded-full bg-pearl-gray opacity-50 blur-3xl"></div>

                        <h3 className="mb-6 font-serif text-3xl font-bold text-black md:text-4xl">
                            Tu Empresa como Activo Financiable
                        </h3>
                        <p className="mb-10 text-xl leading-relaxed text-neutral-700">
                            Transformamos tu negocio para que califique a líneas de crédito corporativas reales. Accede al combustible financiero de $50k a $250k+ para escalar sin frenos.
                        </p>

                        <ul className="mb-12 grid gap-y-4 gap-x-8 sm:grid-cols-2">
                            {[
                                "Separación total de finanzas/responsabilidad.",
                                "Líneas de Crédito Revolventes.",
                                "Estrategia para 0% de interés introductorio.",
                                "Capital de trabajo sin ceder acciones.",
                                "Construcción de historial comercial sólido.",
                                "Acceso a Banca Tier 1 (Chase, Amex, BoA)."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="mt-1 h-5 w-5 shrink-0 text-vinotinto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-base font-medium text-black">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-6 mt-4">
                            {/* Button 1: Doubts (WhatsApp) */}
                            <a
                                href="https://wa.me/13213686440?text=Hola,%20tengo%20dudas%20sobre%20el%20servicio%20de%20Acceso%20a%20Capital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-3 rounded-full border border-black px-8 py-3 text-sm font-bold tracking-widest text-black transition-all hover:bg-black hover:text-white"
                            >
                                <MessageCircle size={18} />
                                TENGO DUDAS
                            </a>

                            {/* Button 2: Application Form */}
                            <a
                                href="/aplicar"
                                className="group flex items-center justify-center gap-3 rounded-full bg-vinotinto px-8 py-3 text-sm font-bold tracking-widest text-white shadow-lg transition-all hover:bg-vinotinto-light hover:scale-105"
                            >
                                <FileText size={18} />
                                APLICAR AL PROGRAMA
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
