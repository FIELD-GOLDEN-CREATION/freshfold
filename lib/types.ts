export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  role: "admin" | "vendor" | "customer" | "staff" | "driver"
  photo_url: string | null
  created_at?: string
}

export interface ShopPhoto {
  id: number
  shop_id: number
  url: string
  sort_order: number
}

export interface ShopWorkingDay {
  id: number
  shop_id: number
  day: string
  open_time: string | null
  close_time: string | null
  is_closed: boolean
}

export interface ShopService {
  id: number
  shop_id: number
  name: string
  description: string | null
  price_tzs: number
}

export interface VendorCategory {
  id: number
  shop_id: number
  category_id: number
  category?: Category
}

export interface VendorItem {
  id: number
  shop_id: number
  item_id: number
  custom_price_tzs: number | null
  is_available: boolean
  item?: Item
}

export interface VendorAddon {
  id: number
  shop_id: number
  title: string
  description: string | null
  price_tzs: number
  is_available: boolean
}

export interface Shop {
  id: number
  owner_id: number
  name: string
  slug: string
  description: string | null
  phone: string | null
  email: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  image_url: string | null
  badge: string | null
  is_open: boolean
  rating_avg: number
  rating_count: number
  total_orders: number
  total_revenue: number
  balance: number
  commission_rate: number
  turnaround: number | null
  open_time: string | null
  close_time: string | null
  is_24h: boolean
  status: "active" | "inactive" | "suspended"
  created_at?: string
  updated_at?: string
  photos?: ShopPhoto[]
  working_days?: ShopWorkingDay[]
  services?: ShopService[]
  vendor_categories?: VendorCategory[]
  vendor_items?: VendorItem[]
  vendor_addons?: VendorAddon[]
}

export interface Category {
  id: number
  name: string
  name_swahili: string | null
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  items?: Item[]
}

export interface Item {
  id: number
  category_id: number
  name: string
  name_swahili: string | null
  description: string | null
  image_url: string | null
  default_price_tzs: number
  unit: string
  is_available: boolean
  sort_order: number
  category?: Category
}

export interface PackageItem {
  id: number
  package_id: number
  item_id: number
  item_name: string
  qty: number
  unit_price_tzs: number
}

export interface PackageInclusion {
  id: number
  package_id: number
  label: string
}

export interface PackageServiceTag {
  id: number
  package_id: number
  tag: string
}

export interface Package {
  id: number
  shop_id: number
  name: string
  tagline: string | null
  kind: "weight" | "itemCount" | "household" | "subscription"
  price_tzs: number
  price_unit: string
  compare_at_tzs: number | null
  note: string | null
  tag: string | null
  is_active: boolean
  order_count: number
  created_at?: string
  shop?: Shop
  items?: PackageItem[]
  inclusions?: PackageInclusion[]
  service_tags?: PackageServiceTag[]
}

export interface Promo {
  id: number
  shop_id: number | null
  code: string
  title: string
  description: string | null
  discount_value: number
  is_percentage: boolean
  applies_to: "entireOrder" | "specificCategory" | "specificItem"
  target_category_id: number | null
  target_item_id: number | null
  audience: "allUsers" | "firstTimeCustomers" | "returningCustomers"
  min_spend_tzs: number
  max_redemptions: number | null
  current_redemptions: number
  starts_at: string | null
  expires_at: string | null
  is_active: boolean
  image_url: string | null
  created_by: number
  created_at?: string
  shop?: Shop
}

export interface OrderLine {
  id: number
  order_id: number
  item_id: number | null
  name: string
  qty: number
  unit_price_tzs: number
  total_tzs: number
  line_type: "item" | "package" | "addon"
  package_id: number | null
}

export interface OrderAddon {
  id: number
  order_id: number
  addon_id: number | null
  title: string
  price_tzs: number
}

export interface OrderTracking {
  id: number
  order_id: number
  status: string
  note: string | null
  created_at: string
}

export interface Order {
  id: number
  order_number: string
  customer_id: number
  shop_id: number
  driver_id: number | null
  status:
    | "pending"
    | "accepted"
    | "in_wash"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
  fulfillment: "delivery" | "self"
  payment_method: string | null
  payment_status: "pending" | "paid" | "failed" | "refunded"
  subtotal_tzs: number
  delivery_fee_tzs: number
  discount_tzs: number
  total_tzs: number
  pickup_address: string | null
  pickup_day: string | null
  pickup_slot: string | null
  delivery_address: string | null
  delivery_lat: number | null
  delivery_lng: number | null
  note: string | null
  promo_code: string | null
  priority: "standard" | "express"
  customer_name: string
  customer_phone: string
  accepted_at: string | null
  picked_up_at: string | null
  delivered_at: string | null
  cancelled_at: string | null
  created_at?: string
  updated_at?: string
  shop?: Shop
  customer?: User
  driver?: User | null
  lines?: OrderLine[]
  addons?: OrderAddon[]
  tracking?: OrderTracking[]
  review?: Review | null
}

export interface Review {
  id: number
  order_id: number
  customer_id: number
  shop_id: number
  rating: number
  comment: string | null
  created_at?: string
  customer?: User
  shop?: Shop
}

export interface SubscriptionPlan {
  id: number
  name: string
  display_name: string
  price_tzs: number
  billing_period: "monthly" | "yearly"
  max_orders_per_month: number
  max_packages: number
  max_active_promos: number
  max_delivery_zones: number
  features: string[] | Record<string, unknown>
  is_active: boolean
  sort_order: number
}

export interface VendorApplication {
  id: number
  client_id: number
  office_name: string
  office_location: string | null
  contact_phone: string | null
  contact_whatsapp: string | null
  business_description: string | null
  plan: "basic" | "pro" | "enterprise"
  status: "pending" | "approved" | "rejected"
  reviewed_by: number | null
  reviewed_at: string | null
  created_at?: string
  client?: User
}

export interface Notification {
  id: number
  user_id: number
  type: string
  title: string
  body: string
  icon: string | null
  data: Record<string, unknown> | null
  is_read: boolean
  created_at: string
}

export interface ChatThread {
  id: number
  customer_id: number
  shop_id: number
  last_message_at: string | null
  created_at: string
  shop?: Shop
}

export interface ChatMessage {
  id: number
  thread_id: number
  sender_id: number
  text: string
  is_read: boolean
  created_at: string
  sender?: User
}

export interface CustomerAddress {
  id: number
  user_id: number
  label: string
  line: string
  latitude: number | null
  longitude: number | null
  is_default: boolean
}

export interface SavedCard {
  id: number
  user_id: number
  holder_name: string
  last4: string
  expiry: string
  brand: "visa" | "mastercard" | "bank"
}

export interface CustomerFavorite {
  id: number
  user_id: number
  shop_id: number
  shop?: Shop
}

export interface VendorSubscription {
  id: number
  shop_id: number
  plan_id: number
  status: "active" | "cancelled" | "expired"
  current_period_start: string
  current_period_end: string
  cancelled_at: string | null
  plan?: SubscriptionPlan
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface LoginResponse {
  success: boolean
  token: string
  user: User
}

export interface PromoValidationResponse {
  success: boolean
  data: {
    promo_id: number
    code: string
    title: string
    discount_value: number
    is_percentage: boolean
    discount_amount_tzs: number
  }
  message?: string
}
