import Hero from "@/components/sections/hero"
import FeaturedCertificates from "@/components/sections/featured-certificates"
import CertificatesGrid from "@/components/sections/certificates-grid"
import AboutSection from "@/components/sections/about-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Hero />
      <FeaturedCertificates />
      <CertificatesGrid />
      <AboutSection />
    </main>
  )
}
