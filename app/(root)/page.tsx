import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Technologies from '@/components/Technologies';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Technologies />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default Home;