import { Droplets } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Vendors", href: "#vendors" },
  { label: "Delivery", href: "#delivery" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2" aria-label="FreshFold home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Droplets className="size-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">FreshFold</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/apply"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-medium")}
          >
            Become a Vendor
          </a>
          <a
            href="#download"
            className={cn(buttonVariants({ size: "lg" }), "font-medium")}
          >
            Download app
          </a>
        </div>
      </div>
    </header>
  )
}
