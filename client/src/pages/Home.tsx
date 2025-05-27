import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Samson Tejas - Full Stack Developer & UI/UX Designer</title>
        <meta name="description" content="Professional portfolio of Samson Tejas - A passionate Full Stack Developer specializing in responsive web applications with expertise in both frontend and backend technologies." />
        <meta name="keywords" content="Samson Tejas, Full Stack Developer, UI/UX Designer, Web Developer, React, TypeScript, Portfolio, Web Applications" />
      </Helmet>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
