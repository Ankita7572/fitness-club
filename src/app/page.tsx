import Image from "next/image";
import LoginPage from "./login/page";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "./components/Navbar";
import Hero from "./components/Hero";
import FitnessCategories from "./components/FitnessCategory";
import About from "./components/About";
import Membership from "./components/Membership";
import Testimonials from "./components/Testimonial";
import Blog from "./components/Blog";
import { GymCarousel } from "./components/GymCarousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FitnessCategories />
      <About/>
      <Membership/>
      <Testimonials />
      <Blog />
      <GymCarousel/>
      <Footer />
    </>
  );
}
