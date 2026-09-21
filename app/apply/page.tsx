"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Check, Store, ArrowRight, TrendingUp, Users, Truck,
  Star, Shield, Zap, BarChart3, Clock, Phone, Loader2,
} from "lucide-react"
import { createVendorApplication, getSubscriptionPlans } from "@/lib/api"
import type { SubscriptionPlan } from "@/lib/types"

const fallbackPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "basic",
    display_name: "Basic",
    price_tzs: 0,
    billing_period: "monthly",
    max_orders_per_month: 30,
    max_packages: 1,
    max_active_promos: 0,
    max_delivery_zones: 1,
    features: ["Up to 30 orders/month", "1 service package", "1 delivery zone", "Basic analytics", "Standard support"],
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    name: "pro",
    display_name: "Pro",
    price_tzs: 75000,
    billing_period: "monthly",
    max_orders_per_month: -1,
    max_packages: 5,
    max_active_promos: 3,
    max_delivery_zones: 3,
    features: ["Unlimited orders", "5 service packages", "3 active promos", "3 delivery zones", "Full analytics dashboard", "Featured listing", "Priority support"],
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    name: "enterprise",
    display_name: "Enterprise",
    price_tzs: 200000,
    billing_period: "monthly",
    max_orders_per_month: -1,
    max_packages: -1,
    max_active_promos: -1,
    max_delivery_zones: 5,
    features: ["Everything in Pro", "Multi-location (up to 5)", "API access", "Bulk order import", "Dedicated account manager", "Custom branding", "24/7 phone support"],
    is_active: true,
    sort_order: 3,
  },
]

const planStyles: Record<string, { color: string; icon: React.ReactNode; popular?: boolean }> = {
  basic: { color: "#64748B", icon: <Store className="size-5" /> },
  pro: { color: "#1A5C58", icon: <TrendingUp className="size-5" />, popular: true },
  enterprise: { color: "#D4841A", icon: <Zap className="size-5" /> },
}

const stats = [
  { value: "120+", label: "Active Vendors", icon: <Users className="size-5" /> },
  { value: "TZS 2M+", label: "Monthly Earnings", icon: <TrendingUp className="size-5" /> },
  { value: "4.8", label: "Average Rating", icon: <Star className="size-5" /> },
  { value: "24h", label: "Fast Payouts", icon: <Clock className="size-5" /> },
]

const benefits = [
  {
    icon: <Truck className="size-6" />,
    title: "Free Pickup & Delivery",
    description: "We handle logistics so you can focus on quality.",
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: "Real-Time Analytics",
    description: "Track orders, revenue, and customer ratings live.",
  },
  {
    icon: <Shield className="size-6" />,
    title: "Secure Payments",
    description: "M-Pesa, Tigo Pesa, and card payments — paid weekly.",
  },
  {
    icon: <Users className="size-6" />,
    title: "Growing Customer Base",
    description: "Access 10,000+ customers across Dar es Salaam.",
  },
]

const testimonials = [
  {
    name: "Marina Fresh",
    role: "Pro Vendor since 2025",
    quote: "FreshFold doubled our monthly orders in just 3 months. The analytics help us optimize our services.",
    rating: 5,
  },
  {
    name: "Bright & Fold",
    role: "Pro Vendor since 2025",
    quote: "The platform handles everything — scheduling, payments, even driver logistics. We just focus on cleaning.",
    rating: 5,
  },
  {
    name: "Crisp Corner",
    role: "Enterprise Vendor since 2025",
    quote: "We run 3 locations through FreshFold. The multi-location feature is a game changer for us.",
    rating: 5,
  },
]

export default function ApplyPage() {
  const [step, setStep] = useState<"landing" | "form">("landing")
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plans, setPlans] = useState<SubscriptionPlan[]>(fallbackPlans)
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    officeName: "",
    officeLocation: "",
    contactPhone: "",
    whatsapp: "",
  })

  useEffect(() => {
    getSubscriptionPlans()
      .then((res) => {
        if (res.data?.length) setPlans(res.data)
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await createVendorApplication({
        office_name: form.officeName,
        office_location: form.officeLocation || undefined,
        contact_phone: form.contactPhone || undefined,
        contact_whatsapp: form.whatsapp || undefined,
        plan: selectedPlan as "basic" | "pro" | "enterprise",
      })
      setSubmitted(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const selected = plans.find((p) => p.name === selectedPlan)!
  const selectedStyle = planStyles[selectedPlan] ?? planStyles.basic

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 top-40 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:py-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Store className="size-4 text-primary" />
              Join 120+ vendors across Dar es Salaam
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Grow your laundry business
              <br />
              <span className="text-primary">with FreshFold</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Apply to become a FreshFold vendor. Choose a plan that fits your
              business, and start receiving orders from thousands of customers
              across Dar es Salaam — all from your phone.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#plans"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Choose Your Plan
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Three simple steps to start earning
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a Plan",
                desc: "Pick the plan that fits your business size and goals.",
              },
              {
                step: "02",
                title: "Apply & Get Approved",
                desc: "Fill out your details and we'll review within 24–48 hours.",
              },
              {
                step: "03",
                title: "Start Earning",
                desc: "Receive orders, provide great service, and get paid weekly.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-border bg-card p-8 text-center">
                <span className="font-display text-5xl font-extrabold text-primary/10">
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Why Vendors Choose FreshFold
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Everything you need to run a successful laundry business
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {b.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Plans ────────────────────────────────────────────── */}
        <section id="plans" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Start free, upgrade when you're ready to grow
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const style = planStyles[plan.name] ?? planStyles.basic
              const isSelected = selectedPlan === plan.name
              const features = Array.isArray(plan.features) ? plan.features : []
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border-2 bg-card p-7 transition-all ${
                    isSelected
                      ? "border-primary shadow-xl"
                      : "border-border hover:border-primary/40"
                  } ${style.popular ? "ring-2 ring-primary/20" : ""}`}
                >
                  {style.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                      Most Popular
                    </span>
                  )}

                  {/* Header */}
                  <div className="mb-5">
                    <div
                      className="mb-3 inline-flex size-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${style.color}15`, color: style.color }}
                    >
                      {style.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold">{plan.display_name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {plan.name === "basic"
                        ? "Perfect for testing the waters"
                        : plan.name === "pro"
                        ? "For growing laundry businesses"
                        : "For multi-location operators"}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="font-display text-4xl font-extrabold tracking-tight">
                      {plan.price_tzs === 0 ? "Free" : `TZS ${Number(plan.price_tzs).toLocaleString()}`}
                    </span>
                    {plan.price_tzs > 0 && (
                      <span className="text-muted-foreground">/{plan.billing_period === "monthly" ? "month" : "year"}</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {features.map((f) => {
                      const text = typeof f === "string" ? f : String(f)
                      return (
                        <li key={text} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className="mt-0.5 size-4 shrink-0"
                            style={{ color: style.color }}
                          />
                          <span>{text}</span>
                        </li>
                      )
                    })}
                  </ul>

                {/* CTA */}
                <button
                  onClick={() => {
                    setSelectedPlan(plan.name)
                    setStep("form")
                  }}
                  className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
                    style.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  Get Started with {plan.display_name}
                </button>
              </div>
              )
            })}
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                What Vendors Say
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Hear from businesses already growing with FreshFold
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "How long does approval take?",
                a: "We review applications within 24–48 hours. You'll receive an email and in-app notification once approved.",
              },
              {
                q: "Can I switch plans later?",
                a: "Yes! You can upgrade or downgrade your plan at any time from your vendor dashboard.",
              },
              {
                q: "What payment methods are supported?",
                a: "We support M-Pesa, Tigo Pesa, Airtel Money, and card payments. Payouts are processed weekly.",
              },
              {
                q: "Is there a contract or commitment?",
                a: "No long-term contracts. Monthly plans can be cancelled anytime. Free plan has no commitment at all.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-display font-bold">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────── */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-14">
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                  Ready to Grow Your Business?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                  Join 120+ vendors already earning with FreshFold. Start with our
                  free plan — no credit card required.
                </p>
                <a
                  href="#plans"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  Get Started Today
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Application Form (shown after plan selection) ────── */}
        {step === "form" && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-8 shadow-2xl">
              <button
                onClick={() => setStep("landing")}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>

              <div className="mb-6 flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                  style={{ backgroundColor: `${selectedStyle.color}15`, color: selectedStyle.color }}
                >
                  {selectedStyle.icon}
                  {selected.display_name} Plan
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold tracking-tight">
                Vendor Application
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in your details to apply as a FreshFold vendor
              </p>

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-xl border border-border p-5">
                  <h3 className="mb-4 font-display font-bold">Personal Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateForm("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        placeholder="+255 712 345 678"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-5">
                  <h3 className="mb-4 font-display font-bold">Business Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Business Name *</label>
                      <input
                        required
                        type="text"
                        value={form.officeName}
                        onChange={(e) => updateForm("officeName", e.target.value)}
                        placeholder="My Laundry Shop"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Location *</label>
                      <input
                        required
                        type="text"
                        value={form.officeLocation}
                        onChange={(e) => updateForm("officeLocation", e.target.value)}
                        placeholder="12 Chole Road, Masaki"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Contact Phone *</label>
                      <input
                        required
                        type="tel"
                        value={form.contactPhone}
                        onChange={(e) => updateForm("contactPhone", e.target.value)}
                        placeholder="+255 712 345 678"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">WhatsApp</label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => updateForm("whatsapp", e.target.value)}
                        placeholder="+255 712 345 678"
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="size-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* ── Success State ────────────────────────────────────── */}
        {submitted && (
          <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="mx-auto max-w-md rounded-2xl bg-card p-10 text-center shadow-2xl">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Application Submitted!
              </h2>
              <p className="mt-4 text-muted-foreground">
                Thank you for applying to join FreshFold as a{" "}
                <span className="font-semibold text-foreground">{selected.display_name}</span>{" "}
                vendor. Our team will review your application and get back to you
                within 24–48 hours.
              </p>
              <a
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Back to Home
              </a>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
