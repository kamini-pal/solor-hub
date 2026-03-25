import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import SavingsCalculator from '../components/home/SavingsCalculator';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import GalleryPreview from '../components/home/GalleryPreview';
import LeadForm from '../components/home/LeadForm';

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <SavingsCalculator />
      <FeaturedProducts />
      <AboutSection />
      <WhyChooseUsSection />
      <GalleryPreview />
      <LeadForm />
    </>
  );
}
