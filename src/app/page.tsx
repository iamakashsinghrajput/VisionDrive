import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FleetShowcase from "@/components/FleetShowcase";

export default function Home() {
  return (
    <main className="bg-zinc-900">
      <HeroSection />
      <StatsSection/>
      <FleetShowcase/>
    </main>
  );
}