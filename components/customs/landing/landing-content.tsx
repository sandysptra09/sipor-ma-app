import HeroSection from "./sections/hero-section"
import TransparencyDashboardSection from "./sections/transparency-dashboard-section"

export default function LandingContent() {
    return (
        <div className='flex flex-col w-full'>
            <HeroSection />
            <TransparencyDashboardSection />
        </div>
    )
}
