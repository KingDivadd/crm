import Image from "next/image";
import Hero from "./component/hero";
import Footer from "./component/footer";
import PlatformFeatures from "./component/laindingComponent/platformFeatures";
import Reviews from "./component/laindingComponent/reviews"

export default function Home(){
  return (
    <main className="overflow-hidden">
      <Hero />
      <PlatformFeatures />
      <Reviews />
      <Footer />
    </main>
  );
}
