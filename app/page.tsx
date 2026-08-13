import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowItWorks } from "@/components/how-it-works"
import { Vendors } from "@/components/vendors"
import { Delivery } from "@/components/delivery"
import { DownloadCta } from "@/components/download-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Vendors />
        <Delivery />
        <DownloadCta />
      </main>
      <SiteFooter />
    </div>
  )
}
