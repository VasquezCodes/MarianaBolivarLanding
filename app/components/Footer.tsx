import { Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-[50] w-full bg-black py-12 md:py-16 text-white text-center border-t border-neutral-900">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6">

                <div className="flex flex-col items-center gap-4">
                    <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
                        Mariana<span className="text-white italic">Bolivar</span>
                    </span>
                    <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                        Elevando tu consciencia financiera para lograr la libertad que mereces.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-300">
                        <a href="#acerca-de" className="hover:text-white transition-colors">Acerca de</a>
                        <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
                        <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
                    </nav>

                    <a
                        href="https://www.instagram.com/marianabolivar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-vinotinto hover:scale-110 transition-all p-2"
                        aria-label="Instagram"
                    >
                        <Instagram size={24} />
                    </a>
                </div>

                <p className="text-xs text-neutral-600">
                    &copy; {new Date().getFullYear()} Mariana Bolivar.
                </p>
            </div>
        </footer>
    );
}
