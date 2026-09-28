import Image from "next/image"
import { StoreBadges } from "@/components/store-badges"

const stats = [
  { value: "25k+", label: "Dar customers" },
  { value: "120+", label: "Local vendors" },
  { value: "80k+", label: "Loads cleaned" },
  { value: "4.9★", label: "Average rating" },
]

export function DownloadCta() {
  return (
    <section id="download" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-accent/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Download FreshFold and get your first pickup free in Dar
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg text-primary-foreground/80">
              Get the app on Android and iOS, sign up in seconds, and book your first
              laundry pickup in Dar es Salaam today.
            </p>

            <div className="mt-8">
              <StoreBadges variant="light" />
              <p className="mt-4 text-sm text-primary-foreground/70">
                Android APK v1.0.7 (65.5 MB) — release-signed, safe to
                install.{" "}
                <a
                  href="/downloads/freshfold-v1.0.7.apk"
                  download="freshfold-v1.0.7.apk"
                  className="font-semibold underline underline-offset-4 hover:text-primary-foreground"
                >
                  Download APK directly
                </a>{" "}
                ·{" "}
                <a
                  href="/downloads/version.json"
                  className="underline underline-offset-4 hover:text-primary-foreground"
                >
                  version info (SHA-256)
                </a>
              </p>
              <p className="mt-2 text-xs text-primary-foreground/60">
                On first install, allow “Install unknown apps” for your
                browser when prompted. iOS build coming soon.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl font-bold">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-primary-foreground/70">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <Image
              src="/images/app-screens.png"
              alt="FreshFold app screens showing vendor list, service selection, and order tracking"
              width={800}
              height={600}
              className="mx-auto w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
