import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";
import ImpactChart from "./components/ImpactChart";
import LayeredScroll from "./components/LayeredScroll";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-pearl-gray text-black selection:bg-vinotinto selection:text-white">
      <LayeredScroll />
      <Navbar />
      <div id="inicio" className="w-full">
        <section className="section relative flex min-h-screen w-full items-center justify-center bg-pearl-gray">
          <div className="section-inner w-full">
            <Hero />
          </div>
        </section>
      </div>

      <div className="w-full">
        <section className="section relative min-h-screen w-full bg-white">
          <div className="section-inner w-full">
            <ImpactChart />
          </div>
        </section>
      </div>

      <div id="acerca-de" className="w-full">
        <section className="section relative min-h-screen w-full bg-white">
          <div className="section-inner w-full">
            <About />
          </div>
        </section>
      </div>

      <div id="servicios" className="w-full">
        <section className="section relative min-h-screen w-full bg-pearl-gray">
          <div className="section-inner w-full">
            <Services />
          </div>
        </section>
      </div>

      {/* Footer - Normal flow, no stacking */}
      <div id="contacto">
        <Footer />
      </div>
    </main>
  );
}
