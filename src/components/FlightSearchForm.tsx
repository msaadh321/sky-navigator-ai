import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Calendar, Users, ArrowRightLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FlightSearchForm = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: from || "NYC",
      to: to || "LON",
      departure: departure || "2026-04-15",
      passengers,
      tripType,
      ...(tripType === "roundtrip" && returnDate ? { return: returnDate } : {}),
    });
    navigate(`/search?${params.toString()}`);
  };

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-card rounded-2xl p-6 md:p-8 hero-shadow max-w-4xl mx-auto"
    >
      {/* Trip type toggle */}
      <div className="flex gap-2 mb-6">
        {(["roundtrip", "oneway"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              tripType === type
                ? "gradient-sky text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {type === "roundtrip" ? "Round Trip" : "One Way"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* From */}
        <div className="md:col-span-3">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From</label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="New York (JFK)"
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>

        {/* Swap */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="button"
            onClick={swapCities}
            className="p-2 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
        </div>

        {/* To */}
        <div className="md:col-span-3">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To</label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90" />
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="London (LHR)"
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>

        {/* Departure */}
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>

        {/* Return (conditional) */}
        {tripType === "roundtrip" && (
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>
          </div>
        )}

        {/* Passengers */}
        <div className={tripType === "roundtrip" ? "md:col-span-1" : "md:col-span-2"}>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              min="1"
              max="9"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full mt-6 gradient-sky text-primary-foreground border-0 h-12 text-base font-semibold gap-2"
      >
        <Search className="h-5 w-5" />
        Search Flights
      </Button>
    </motion.form>
  );
};

export default FlightSearchForm;
