import { Plane } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12 px-4">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-secondary rounded-lg p-1.5">
            <Plane className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">SkyVoyage</span>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          © 2026 SkyVoyage. All rights reserved. AI-powered flight booking.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
