import Image from "next/image";
import LoginPage from "./login/page";
import { ModeToggle } from "@/components/mode-toggle";

import Hero from "./components/Hero";
import FitnessCategories from "./components/FitnessCategory";
import About from "./components/About";
import Membership from "./components/Membership";
import Testimonials from "./components/Testimonial";
import Blog from "./components/Blog";
import { GymCarousel } from "./components/GymCarousel";
import Footer from "./components/Footer";
import { Header } from "./components/Navbar";


export default function Home() {
  return (
    <>


      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
    
      <Hero />
      <FitnessCategories />
      <About/>
      <Membership/>
      <Testimonials />
      <Blog />
      <GymCarousel/>
      </main>
      <Footer />
      </div>
    </>
  );
}
