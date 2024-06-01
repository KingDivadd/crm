import Image from "next/image";
import Hero from "./component/hero";
import Footer from "./component/footer";
import LandingNav from "./component/landingNav";

export default function Home(){
  return (
    <main className="overflow-hidden">
      <Hero />
      <Footer />
    </main>
  );
}
