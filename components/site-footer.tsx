import { Droplets } from "lucide-react"

const columns = [
  {
    title: "Product",
    links: ["Services", "Pricing (TZS)", "Vendors", "Dar delivery areas"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Become a vendor", "Press"],
  },
  {
    title: "Support",
    links: ["Help center", "Contact", "Terms", "Privacy"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Droplets className="size-5" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                FreshFold
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              On-demand laundry and dry cleaning across Dar es Salaam with free pickup
              and delivery, powered by trusted local vendors.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FreshFold Tanzania. All rights reserved.</p>
          <p>Made in Dar es Salaam for people who hate laundry day.</p>
        </div>
      </div>
    </footer>
  )
}
