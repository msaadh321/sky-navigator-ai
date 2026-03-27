import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Clock, ArrowRight, Filter, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AIChatbot from "@/components/AIChatbot";

interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
}

const mockFlights: Flight[] = [
  { id: "1", airline: "SkyVoyage Air", airlineCode: "SV", from: "JFK", to: "LHR", departTime: "08:30", arriveTime: "20:45", duration: "7h 15m", stops: 0, price: 429, class: "Economy" },
  { id: "2", airline: "Atlantic Wings", airlineCode: "AW", from: "JFK", to: "LHR", departTime: "10:15", arriveTime: "22:00", duration: "6h 45m", stops: 0, price: 389, class: "Economy" },
  { id: "3", airline: "Global Express", airlineCode: "GE", from: "JFK", to: "LHR", departTime: "14:00", arriveTime: "03:30+1", duration: "8h 30m", stops: 1, price: 319, class: "Economy" },
  { id: "4", airline: "SkyVoyage Air", airlineCode: "SV", from: "JFK", to: "LHR", departTime: "19:00", arriveTime: "07:15+1", duration: "7h 15m", stops: 0, price: 459, class: "Economy" },
  { id: "5", airline: "EuroConnect", airlineCode: "EC", from: "JFK", to: "LHR", departTime: "22:30", arriveTime: "10:45+1", duration: "7h 15m", stops: 0, price: 349, class: "Economy" },
  { id: "6", airline: "Pacific Blue", airlineCode: "PB", from: "JFK", to: "LHR", departTime: "06:00", arriveTime: "19:30", duration: "8h 30m", stops: 1, price: 289, class: "Economy" },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "NYC";
  const to = searchParams.get("to") || "LON";
  const [sortBy, setSortBy] = useState<"price" | "duration">("price");
  const [maxStops, setMaxStops] = useState<number>(2);

  const filteredFlights = useMemo(() => {
    return mockFlights
      .filter((f) => f.stops <= maxStops)
      .sort((a, b) => (sortBy === "price" ? a.price - b.price : 0));
  }, [sortBy, maxStops]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to search
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {from} <ArrowRight className="inline h-5 w-5 text-secondary mx-2" /> {to}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredFlights.length} flights found · {searchParams.get("departure") || "Apr 15, 2026"}
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort:</span>
            </div>
            {(["price", "duration"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  sortBy === s
                    ? "gradient-sky text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s === "price" ? "Cheapest" : "Fastest"}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Stops:</span>
              {[0, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setMaxStops(s)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    maxStops === s
                      ? "gradient-sky text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {s === 0 ? "Direct" : `≤${s}`}
                </button>
              ))}
            </div>
          </div>

          {/* Flight Cards */}
          <div className="space-y-3">
            {filteredFlights.map((flight, i) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-5 flight-card-hover"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  {/* Airline */}
                  <div className="flex items-center gap-3 md:w-40">
                    <div className="w-10 h-10 rounded-lg gradient-sky flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                      {flight.airlineCode}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{flight.airline}</p>
                      <p className="text-xs text-muted-foreground">{flight.class}</p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-display font-bold text-lg text-foreground">{flight.departTime}</p>
                      <p className="text-xs text-muted-foreground">{flight.from}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        {flight.duration}
                      </div>
                      <div className="w-full h-px bg-border relative">
                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-secondary" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {flight.stops === 0 ? "Direct" : `${flight.stops} stop`}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="font-display font-bold text-lg text-foreground">{flight.arriveTime}</p>
                      <p className="text-xs text-muted-foreground">{flight.to}</p>
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="flex items-center gap-4 md:w-44 justify-end">
                    <p className="font-display font-bold text-xl text-secondary">${flight.price}</p>
                    <Button size="sm" className="gradient-accent text-accent-foreground border-0 font-semibold">
                      Book
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredFlights.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Plane className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No flights match your filters. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIChatbot />
    </div>
  );
};

export default SearchResults;
