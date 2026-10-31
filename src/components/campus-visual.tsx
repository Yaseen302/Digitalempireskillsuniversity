import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
export default function CampusVisual() {
  return (
    <div className="campus-visual">
      <div className="campus-visual-top">
        <span>KARACHI, PAKISTAN</span>
        <ArrowUpRight size={18} />
      </div>
      <div className="campus-map-art" aria-hidden="true">
        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <div className="map-road road-three" />
        <div className="map-river" />
        <span className="map-district district-one">SADDAR</span>
        <span className="map-district district-two">GULSHAN</span>
        <div className="campus-pin pin-saddar">
          <MapPin size={23} />
        </div>
        <div className="campus-pin pin-gulshan">
          <MapPin size={23} />
        </div>
        <span className="map-coordinate">A CITY OF POSSIBILITY</span>
      </div>
      <div className="campus-visual-bottom">
        <strong>
          Two places to begin.
          <br />A world to explore.
        </strong>
        <Link href="#our-campuses">
          Find your campus <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
