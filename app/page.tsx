import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Reports from "@/components/Reports";
import Screenshots from "@/components/Screenshots";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Reports />
      <Screenshots />
      <Download />
      <Footer />
    </main>
  );
}
