import { Shirt, Sparkles, Wind, Footprints, Layers, Baby } from "lucide-react"

const services = [
  {
    icon: Shirt,
    title: "Wash & Fold",
    desc: "Everyday laundry washed, dried, and neatly folded by the pound.",
  },
  {
    icon: Sparkles,
    title: "Dry Cleaning",
    desc: "Professional care for suits, dresses, and delicate fabrics.",
  },
  {
    icon: Wind,
    title: "Ironing & Press",
    desc: "Crisp, wrinkle-free shirts and garments pressed to perfection.",
  },
  {
    icon: Footprints,
    title: "Shoe & Sneaker Care",
    desc: "Deep cleaning and restoration for your favorite pairs.",
  },
  {
    icon: Layers,
    title: "Bedding & Bulky",
    desc: "Comforters, duvets, and curtains cleaned with heavy-duty care.",
  },
  {
    icon: Baby,
    title: "Delicates & Baby",
    desc: "Gentle, hypoallergenic washing for sensitive fabrics.",
  },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
          Our services
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Every kind of clean, in one app
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Here&apos;s a look at what Dar vendors offer — every service is priced
          upfront in TSh and booked right inside the FreshFold app.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <service.icon className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
