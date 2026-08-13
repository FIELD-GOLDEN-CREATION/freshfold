import Image from "next/image"
import { Truck, MapPinned, CreditCard, BellRing } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free pickup & delivery",
    desc: "Doorstep pickup and drop-off included on every order over TSh 30,000.",
  },
  {
    icon: MapPinned,
    title: "Live order tracking",
    desc: "Follow your laundry across Dar in real time from pickup to delivery.",
  },
  {
    icon: CreditCard,
    title: "Pay with mobile money",
    desc: "Pay with M-Pesa, Tigo Pesa, Airtel Money or card — no cash at the door.",
  },
  {
    icon: BellRing,
    title: "Smart notifications",
    desc: "Get alerts at every step so you always know your order status.",
  },
]

export function Delivery() {
  return (
    <section id="delivery" className="bg-secondary/50 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
            <Image
              src="/images/delivery.png"
              alt="A FreshFold courier delivering a bag of clean folded laundry to a customer's door"
              width={800}
              height={800}
              className="h-auto w-full"
            />
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Pickup &amp; delivery
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            We come to you — twice
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Skip the trip to the laundromat. Our drivers pick up your bags and return
            everything clean, folded, and fresh, right when you want them.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
