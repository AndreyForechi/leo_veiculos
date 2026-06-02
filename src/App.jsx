import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import Sobre from "./components/Sobre";
import Servicos from "./components/Servicos";
import Antes_Depois from "./components/Antes_Depois";
import Reviews from "./components/Avaliacoes";
import Contact from "./components/Contact";
import CarroMes from "./components/Carro_Mes";
import Footer from "./components/Footer";

export function App() {


  return (
    <>


      <div className="bg-black/60 text-white min-h-screen overflow-x-hidden relative">

        {/* Background blur */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-125 h-125 bg-white/5 blur-[140px]" />
        </div>



        {/* Navbar */}
        <Navbar />

        

        {/* HERO */}

        <Hero />

        {/* {Carro Mes} */}
        <CarroMes />

        {/* SOBRE */}
        <Sobre />

        {/* SERVIÇOS */}

        <Servicos />

        {/* ANTES E DEPOIS */}

        <Antes_Depois />

        {/* AVALIAÇÕES */}

        <Reviews />

        {/* CONTATO */}

        <Contact />

      <Footer />

      </div>

    </>
  );
}

export default App;