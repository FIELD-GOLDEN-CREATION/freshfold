import { UserPlus, CalendarClock, WashingMachine, PackageCheck } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Download & pick a vendor",
    desc: "Install the app, log in, and browse rated laundry vendors near you in Dar.",
  },
  {
    icon: CalendarClock,
    title: "Book & schedule pickup",
    desc: "Select your services and choose a pickup window that fits your day.",
  },
  {
    icon: WashingMachine,
    title: "We clean it fresh",
    desc: "Your vendor handles the washing, drying, and folding with care.",
  },
  {
    icon: PackageCheck,
    title: "Pay & get it delivered",
    desc: "Pay with M-Pesa or Tigo Pesa in-app and track your order to your doorstep.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Fresh laundry in four simple steps
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <step.icon className="size-6" />
                </span>
                <span className="font-display text-4xl font-bold text-primary/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
