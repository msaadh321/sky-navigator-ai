import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FlightSearchForm from "@/components/FlightSearchForm";
import PopularDestinations from "@/components/PopularDestinations";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import heroSky from "@/assets/hero-sky.jpg";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero Section */}
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroSky}
          alt="Airplane wing above clouds at sunset"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-medium text-foreground mb-6">
            ✨ AI-Powered Flight Booking
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Your Journey,{" "}
            <span className="text-gradient">Reimagined</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            Search, compare, and book flights worldwide with real-time tracking and smart AI recommendations.
          </p>
        </motion.div>

        <FlightSearchForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span>✅ No booking fees</span>
          <span>✅ 500+ airlines</span>
          <span>✅ 24/7 support</span>
        </motion.div>
      </div>
    </section>

    <PopularDestinations />
    <Features />
    <Footer />
    <AIChatbot />
  </div>
);

export default Index;
