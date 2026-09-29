import { Apple, Play } from "lucide-react"
import { cn } from "@/lib/utils"

type StoreBadgesProps = {
  className?: string
  variant?: "dark" | "light"
}

export function StoreBadges({ className, variant = "dark" }: StoreBadgesProps) {
  const base =
    variant === "dark"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "bg-card text-foreground hover:bg-card/90 ring-1 ring-border"

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href="#download"
        className={cn(
          "group flex items-center gap-3 rounded-xl px-5 py-3 transition-colors",
          base,
        )}
        aria-label="Download on the App Store"
      >
        <Apple className="size-7 shrink-0" strokeWidth={1.5} />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[11px] opacity-70">Download on the</span>
          <span className="font-display text-base font-semibold">App Store</span>
        </span>
      </a>
      <a
        href="/downloads/freshfold-v1.0.8.apk"
        download="freshfold-v1.0.8.apk"
        className={cn(
          "group flex items-center gap-3 rounded-xl px-5 py-3 transition-colors",
          base,
        )}
        aria-label="Download FreshFold APK for Android (v1.0.8)"
      >
        <Play className="size-6 shrink-0 fill-current" strokeWidth={1.5} />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[11px] opacity-70">Download for Android</span>
          <span className="font-display text-base font-semibold">
            APK v1.0.8
          </span>
        </span>
      </a>
    </div>
  )
}
