import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import ModulesSection from '@/components/landing/ModulesSection';
import WhiteLabelSection from '@/components/landing/WhiteLabelSection';
import SegmentsSection from '@/components/landing/SegmentsSection';
import PricingSection from '@/components/landing/PricingSection';
import LandingFooter from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main>
        <HeroSection />
        <ModulesSection />
        {/* <WhiteLabelSection /> */}
        <SegmentsSection />
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
