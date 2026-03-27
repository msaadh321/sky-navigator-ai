import { motion } from "framer-motion";
import { MapPin, TrendingUp } from "lucide-react";

const destinations = [
  { city: "Paris", country: "France", code: "CDG", price: 349, emoji: "🇫🇷" },
  { city: "Tokyo", country: "Japan", code: "NRT", price: 589, emoji: "🇯🇵" },
  { city: "Dubai", country: "UAE", code: "DXB", price: 429, emoji: "🇦🇪" },
  { city: "New York", country: "USA", code: "JFK", price: 299, emoji: "🇺🇸" },
  { city: "Bali", country: "Indonesia", code: "DPS", price: 499, emoji: "🇮🇩" },
  { city: "London", country: "UK", code: "LHR", price: 319, emoji: "🇬🇧" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const PopularDestinations = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
          <TrendingUp className="h-4 w-4" />
          Trending Destinations
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Popular Flights
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Discover the most booked destinations with the best deals
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {destinations.map((dest) => (
          <motion.div
            key={dest.code}
            variants={item}
            className="glass-card rounded-xl p-5 flight-card-hover cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{dest.emoji}</span>
                <div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-secondary transition-colors">
                    {dest.city}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {dest.country} · {dest.code}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">from</p>
                <p className="font-display font-bold text-lg text-secondary">${dest.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PopularDestinations;
