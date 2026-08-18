import { Star, MapPin, Clock } from "lucide-react"

const vendors = [
  {
    name: "Safi Dobi Masaki",
    tag: "Eco-friendly",
    rating: 4.9,
    reviews: 1280,
    area: "Masaki",
    eta: "Same day",
    price: "TSh 3,500/kg",
  },
  {
    name: "Kilimanjaro Dry Cleaners",
    tag: "Dry cleaning pro",
    rating: 4.8,
    reviews: 940,
    area: "Mikocheni",
    eta: "24 hrs",
    price: "TSh 4,200/kg",
  },
  {
    name: "Uhuru Laundry Hub",
    tag: "Budget friendly",
    rating: 4.7,
    reviews: 2150,
    area: "Kariakoo",
    eta: "Same day",
    price: "TSh 2,800/kg",
  },
]

export function Vendors() {
  return (
    <section id="vendors" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
            Dar es Salaam vendors
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Vetted cleaners you can trust
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Real reviews, upfront TZS pricing, and live tracking. Browse a preview
            below — booking happens inside the app once you download it.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-center">
          <p className="font-display text-3xl font-bold text-primary">120+</p>
          <p className="mt-1 text-sm text-muted-foreground">
            vendors available across Dar
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {vendors.map((vendor) => (
          <article
            key={vendor.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary">
                {vendor.name.charAt(0)}
              </span>
              <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">
                {vendor.tag}
              </span>
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold">{vendor.name}</h3>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-accent text-accent" />
              <span className="font-semibold text-foreground">{vendor.rating}</span>
              <span className="text-muted-foreground">
                ({vendor.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                {vendor.area}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-primary" />
                {vendor.eta}
              </div>
            </dl>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="font-display text-lg font-bold text-foreground">
                {vendor.price}
              </span>
              <span className="text-sm font-medium text-primary">In the app</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
