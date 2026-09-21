"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star, MapPin, Clock, Loader2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getShops } from "@/lib/api"
import type { Shop } from "@/lib/types"

export function Vendors() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getShops()
      .then((res) => setShops(res.data?.slice(0, 3) ?? []))
      .catch(() => setShops([]))
      .finally(() => setLoading(false))
  }, [])

  const totalVendors = shops.length > 0 ? shops.length : 0

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
          <p className="font-display text-3xl font-bold text-primary">
            {loading ? <Loader2 className="inline size-8 animate-spin" /> : `${totalVendors}+`}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            vendors available across Dar
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 animate-pulse"
              >
                <div className="flex items-start justify-between">
                  <div className="size-12 rounded-xl bg-muted" />
                  <div className="h-6 w-24 rounded-full bg-muted" />
                </div>
                <div className="mt-4 h-5 w-32 rounded bg-muted" />
                <div className="mt-2 h-4 w-20 rounded bg-muted" />
                <div className="mt-5 flex gap-4">
                  <div className="h-4 w-16 rounded bg-muted" />
                  <div className="h-4 w-16 rounded bg-muted" />
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <div className="h-5 w-24 rounded bg-muted" />
                  <div className="h-4 w-16 rounded bg-muted" />
                </div>
              </div>
            ))
          : shops.map((shop) => (
              <article
                key={shop.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary">
                    {shop.name.charAt(0)}
                  </span>
                  {shop.badge && (
                    <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-medium text-accent-foreground">
                      {shop.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold">{shop.name}</h3>

                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  <Star className="size-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">
                    {shop.rating_avg?.toFixed(1) ?? "0.0"}
                  </span>
                  <span className="text-muted-foreground">
                    ({(shop.rating_count ?? 0).toLocaleString()} reviews)
                  </span>
                </div>

                <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {shop.address && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-primary" />
                      {shop.address}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" />
                    {shop.turnaround ? `${shop.turnaround}h turnaround` : shop.is_24h ? "24h" : "Check hours"}
                  </div>
                </dl>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-display text-lg font-bold text-foreground">
                    {shop.services?.[0]
                      ? `TSh ${Number(shop.services[0].price_tzs).toLocaleString()}`
                      : "View in app"}
                  </span>
                  <span className="text-sm font-medium text-primary">In the app</span>
                </div>
              </article>
            ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Want to join our network of trusted vendors?
        </p>
        <Link
          href="/apply"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-4 font-medium"
          )}
        >
          Become a Vendor
        </Link>
      </div>
    </section>
  )
}
