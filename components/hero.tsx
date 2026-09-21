import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Truck } from "lucide-react"
import { StoreBadges } from "@/components/store-badges"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-40 size-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <MapPin className="size-4 text-primary" />
            Now live across Dar es Salaam
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Laundry day, <span className="text-primary">handled.</span>
          </h1>

          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            FreshFold connects you to trusted dobi and dry cleaners across Dar es
            Salaam — book, pay with M-Pesa or Tigo Pesa, and get free pickup &amp;
            delivery, all inside the app. Download it here to get started.
          </p>

          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-foreground">
              Download the app to book a vendor
            </p>
            <StoreBadges />
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Star className="size-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">4.9</span> Play Store
            </span>
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-primary" />
              120+ vendors in Dar
            </span>
          </div>

          <div className="mt-6">
            <Link
              href="/apply"
              className={cn(
                buttonVariants({ variant: "link" }),
                "p-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
              )}
            >
              Are you a laundry business? Become a vendor →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-accent/30 to-primary/10" />
          <Image
            src="/images/hero-phone.png"
            alt="FreshFold laundry app shown on a smartphone surrounded by fresh folded laundry"
            width={720}
            height={720}
            priority
            className="mx-auto w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
