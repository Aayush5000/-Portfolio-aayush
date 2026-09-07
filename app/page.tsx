import { About } from "@/components/About";
import { Achievement } from "@/components/Achievement";
import { AnalyticsShowcase } from "@/components/AnalyticsShowcase";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { DataMindset } from "@/components/DataMindset";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

/**
 * Scroll order tells the story: who I am → how I think → what I have built →
 * proof that I can do the work → the tools → the record → the credential →
 * the strongest signal → how to reach me.
 *
 * The order here must match the `sections` registry in lib/content.ts, which
 * drives the navbar, the active-section indicator and the ⌘K palette.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <DataMindset />
      <Projects />
      <AnalyticsShowcase />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Achievement />
      <Contact />
    </>
  );
}
