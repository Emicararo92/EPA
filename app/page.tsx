import Navbar from "../components/public/Navbar/Navbar";
import Hero from "./../components/home/Hero/Hero";
import AnimalsSection from "../components/public/AnimalsSection/AnimalsSection";
import PostsSection from "../components/public/PostsSection/PostsSection";
import DonationSection from "../components/public/DonationSection/DonationSection";
import EpaDivider from "@/components/public/EpaDivider/EpaDivider";
import Footer from "@/components/public/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <Hero />

        {/* PRIMER MOMENTO — IMPACTO */}
        <EpaDivider variant="impact" />

        {/* ANIMALES */}
        <AnimalsSection />

        {/* SEGUNDO MOMENTO — COMUNIDAD */}
        <EpaDivider variant="community" />

        {/* HISTORIAS / NOTICIAS */}
        <PostsSection />

        {/* TERCER MOMENTO — COMPROMISO */}
        <EpaDivider variant="commitment" />

        {/* DONACIONES */}
        <DonationSection />
      </main>

      <Footer />
    </>
  );
}
