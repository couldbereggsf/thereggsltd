import Hero           from "../components/sections/Hero";
import About          from "../components/sections/About";
import PainPoints     from "../components/sections/PainPoints";
import Qualifier      from "../components/sections/Qualifier";
import Outcomes       from "../components/sections/Outcomes";
import LiveDemo       from "../components/sections/LiveDemo";
import StackAssessment from "../components/sections/StackAssessment";
import Projects       from "../components/sections/Projects";
import Pricing        from "../components/sections/Pricing";
import CTA            from "../components/sections/CTA";
import Contact        from "../components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <PainPoints />
      <Qualifier />
      <Outcomes />
      <LiveDemo />
      <StackAssessment />
      <Projects />
      <Pricing />
      <CTA />
      <Contact />
    </main>
  );
}
