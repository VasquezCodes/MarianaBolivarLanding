export default function Footer() {
    return (
        <footer className="relative z-[50] w-full bg-black py-16 text-white text-center md:text-left">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 md:flex-row">

                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="font-serif text-3xl font-bold tracking-tight">
                        Finax<span className="text-vinotinto">.</span>
                    </span>
                    <p className="text-sm text-neutral-400 max-w-xs text-center md:text-left">
                        Elevando tu consciencia financiera para lograr la libertad que mereces.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
                    <nav className="flex gap-8 text-sm font-medium text-neutral-300">
                        <a href="#about" className="hover:text-white transition-colors">Acerca de</a>
                        <a href="#services" className="hover:text-white transition-colors">Servicios</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
                    </nav>

                    <div className="h-px w-full bg-white/10 md:h-8 md:w-px"></div>

                    <div className="flex gap-6 text-neutral-400">
                        <a href="#" className="hover:text-white hover:scale-110 transition-all">Instagram</a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all">LinkedIn</a>
                    </div>
                </div>

                <p className="text-xs text-neutral-600 mt-8 md:mt-0">
                    &copy; {new Date().getFullYear()} Mariana Bolivar.
                </p>
            </div>
        </footer>
    );
}
