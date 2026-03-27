import { motion } from "framer-motion";
import { Bot, MapPin, Shield, CreditCard } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Travel Assistant",
    description: "Get smart recommendations and trip planning powered by AI",
    color: "from-secondary to-sky-end",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Track your flights live with status updates and notifications",
    color: "from-accent to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Enterprise-grade security with encrypted payments",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "We compare thousands of flights to find you the best deals",
    color: "from-violet-500 to-purple-600",
  },
];

const Features = () => (
  <section className="py-20 px-4 bg-muted/30">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Why Choose SkyVoyage?
        </h2>
        <p className="text-muted-foreground mt-2">Everything you need for seamless travel</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 text-center flight-card-hover"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feat.color} mb-4`}>
              <feat.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{feat.title}</h3>
            <p className="text-sm text-muted-foreground">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
