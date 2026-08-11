import Navbar from "../components/public/Navbar/Navbar";
import Hero from "./../components/home/Hero/Hero";
import AnimalsSection from "../components/public/AnimalsSection/AnimalsSection";
//import PostsSection from "../components/public/PostsSection/PostsSection";
import DonationSection from "../components/public/DonationSection/DonationSection";
import EpaDivider from "@/components/public/EpaDivider/EpaDivider";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <EpaDivider variant="sand" />

        <AnimalsSection />
        <EpaDivider variant="white" />
        {/* <PostsSection /> */}

        <DonationSection />
      </main>
    </>
  );
}
