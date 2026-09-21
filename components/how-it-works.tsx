import { ClipboardCheck, Handshake, MapPinned, Store } from "lucide-react"

const steps = [
  {
    icon: ClipboardCheck,
    title: "Place an assured order",
    desc: "Tell us what needs cleaning in the app — every order is confirmed and assured instantly.",
  },
  {
    icon: Handshake,
    title: "Get matched with pros",
    desc: "We connect you with professional, vetted laundry vendors around your area.",
  },
  {
    icon: MapPinned,
    title: "Pick a vendor on the map",
    desc: "See nearby vendors mapped around you with ratings, prices, and distance — then choose.",
  },
  {
    icon: Store,
    title: "Drop off & pick up fresh",
    desc: "Drop your bag at the vendor you picked, pay with M-Pesa or Tigo Pesa, and collect it sparkling.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden py-20">
      {/* Gradient backdrop — breaks the long white stretch between Services and Vendors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b3b38] via-[#134e4a] to-[#0a2a3a]" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-widest text-amber-300">
            How it works
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From order to fresh — no delivery needed
          </h2>
          <p className="mt-3 text-pretty text-lg text-white/70">
            We assure your order and link you to trusted pros mapped around you.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.12]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#134e4a] shadow-lg">
                  <step.icon className="size-6" />
                </span>
                <span className="font-display text-4xl font-bold text-white/20 transition-colors group-hover:text-amber-300/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-white/70">{step.desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-300 to-teal-300 transition-transform duration-300 group-hover:scale-x-100" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
