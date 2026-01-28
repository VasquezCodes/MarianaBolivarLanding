"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // If we are not on the home page, redirect to home with the hash
        if (window.location.pathname !== "/") {
            window.location.href = "/" + href;
            return;
        }

        const targetId = href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);

        if (elem) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: elem,
                    offsetY: 120,
                    autoKill: false
                },
                ease: "power2.out",
                overwrite: "auto"
            });
            setIsOpen(false);
        }
    };

    const navLinks = ["Inicio", "Acerca de", "Servicios", "Contacto"];

    return (
        <nav
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled || isOpen ? "bg-white py-4 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                <Link
                    href="#inicio"
                    className="font-serif text-2xl font-bold tracking-wider text-black z-50 relative group"
                    onClick={(e) => handleLinkClick(e, "#inicio")}
                >
                    Mariana <span className="relative inline-block">
                        Bolivar
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-vinotinto" viewBox="0 0 100 12" preserveAspectRatio="none">
                            <path d="M0 6 Q 25 12 50 6 T 100 6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden gap-8 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(" ", "-")}`}
                            onClick={(e) => handleLinkClick(e, `#${item.toLowerCase().replace(" ", "-")}`)}
                            className="text-sm font-medium tracking-widest text-black/70 transition-colors uppercase hover:text-vinotinto"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
                {/* Mobile Menu Button */}
                <button
                    className="flex flex-col gap-1.5 md:hidden z-50 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>

                {/* Mobile Overlay */}
                <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-white transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                    <div className="flex flex-col gap-8 text-center">
                        {navLinks.map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                onClick={(e) => handleLinkClick(e, `#${item.toLowerCase().replace(" ", "-")}`)}
                                className="font-serif text-3xl font-bold text-black transition-colors hover:text-vinotinto"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </nav>
    );
}
