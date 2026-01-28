import ApplicationForm from "../components/ApplicationForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AplicarPage() {
    return (
        <main className="relative min-h-screen w-full bg-pearl-gray text-black selection:bg-vinotinto selection:text-white">
            <Navbar />

            <div className="w-full pt-32 pb-24 px-6 md:px-12 bg-white">
                <div className="max-w-5xl mx-auto mb-16 md:mb-24">
                    <span className="block text-xs font-bold tracking-[0.2em] text-vinotinto uppercase mb-4">Acceso a Capital</span>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-black">
                        Aplicación de <br /> <span className="italic text-neutral-400">Fondeo Corporativo</span>
                    </h1>
                    <p className="text-lg text-neutral-600 font-light max-w-xl leading-relaxed">
                        Este proceso está diseñado para filtrar y comprender la salud financiera de tu negocio. Tómate el tiempo necesario para responder con precisión.
                    </p>
                </div>

                <ApplicationForm />
            </div>

            <Footer />
        </main>
    );
}
