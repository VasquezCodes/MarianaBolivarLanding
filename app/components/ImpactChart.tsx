"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const data = [
    { month: "Inicio", withFinax: 5000, without: 5000 },
    { month: "M3", withFinax: 12000, without: 6500 },
    { month: "M6", withFinax: 28000, without: 8500 },
    { month: "M9", withFinax: 45000, without: 11000 },
    { month: "M12", withFinax: 75000, without: 14000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-xl">
                <p className="mb-2 font-serif text-sm font-bold text-neutral-900">{label}</p>
                <div className="flex flex-col gap-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-xs font-medium">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-neutral-500">
                                {entry.name}:
                            </span>
                            <span className="font-bold tabular-nums text-neutral-900">
                                ${entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default function ImpactChart() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(titleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }).from(
                chartRef.current,
                {
                    y: 40,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.6"
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="bg-white py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 -z-10 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-pearl-gray blur-xl md:blur-3xl" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16 flex flex-col items-center text-center">
                    <span className="mb-4 inline-block border-b border-vinotinto pb-1 font-sans text-xs font-bold tracking-[0.3em] uppercase text-vinotinto">
                        Resultados Comprobados
                    </span>
                    <h2
                        ref={titleRef}
                        className="max-w-3xl font-serif text-4xl font-bold leading-tight text-black md:text-5xl"
                    >
                        El impacto de una <span className="text-vinotinto italic">Estrategia Correcta</span>
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg text-neutral-600">
                        Visualiza la diferencia entre el crecimiento orgánico tradicional y el
                        crecimiento acelerado mediante inyección de capital estratégico.
                    </p>
                </div>

                <div
                    ref={chartRef}
                    className="mx-auto max-w-5xl rounded-[40px] border border-neutral-100 bg-white p-6 shadow-2xl shadow-black/5 md:p-12"
                >
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex flex-col">
                            <h3 className="font-serif text-2xl font-bold text-black">
                                Proyección de Crecimiento
                            </h3>
                            <p className="text-sm text-neutral-500">Periodo de 12 Meses</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-black" />
                                <span className="text-sm font-medium text-neutral-600">
                                    Sin Asesoría
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-vinotinto" />
                                <span className="text-sm font-bold text-vinotinto">Con Finax</span>
                            </div>
                        </div>
                    </div>



                    <div className="h-[400px] w-full">
                        {isMounted && !isDesktop && (
                            <div className="block h-full w-full md:hidden">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={data}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#f3f4f6"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            cursor={{ fill: '#f3f4f6' }}
                                        />
                                        <Bar
                                            dataKey="without"
                                            fill="#000000"
                                            radius={[4, 4, 0, 0]}
                                            name="Sin Asesoría"
                                            barSize={20}
                                        />
                                        <Bar
                                            dataKey="withFinax"
                                            fill="#5d0418"
                                            radius={[4, 4, 0, 0]}
                                            name="Con Finax"
                                            barSize={20}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* Desktop Area Chart */}
                        {isMounted && isDesktop && (
                            <div className="hidden h-full w-full md:block">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={data}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorFinax" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#5d0418" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#5d0418" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#f3f4f6"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="without"
                                            stroke="#000000"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorWithout)"
                                            name="Sin Asesoría"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="withFinax"
                                            stroke="#5d0418"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorFinax)"
                                            name="Con Finax"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {!isMounted && (
                            <div className="h-full w-full animate-pulse bg-neutral-100 rounded-3xl" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
