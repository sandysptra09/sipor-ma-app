import HeroSection from "./sections/hero-section"
import TransparencyDashboardSection from "./sections/transparency-dashboard-section"
import FeatureSection from "./sections/features-section"
import WorkflowSection from "./sections/workflow-section"
import CtaSection from "./sections/cta-section"

export default function LandingContent() {
    return (
        <div className='flex flex-col w-full'>
            <HeroSection />
            <TransparencyDashboardSection />
            <FeatureSection />
            <WorkflowSection />
            <CtaSection />
        </div>
    )
}
