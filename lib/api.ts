import type {
  ApiResponse,
  Shop,
  Category,
  Item,
  Package,
  Promo,
  Order,
  Review,
  User,
  SubscriptionPlan,
  VendorApplication,
  LoginResponse,
  PromoValidationResponse,
  Notification,
  ChatThread,
  ChatMessage,
  CustomerAddress,
  SavedCard,
  CustomerFavorite,
} from "./types"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://freshfold.qecure.online/api"

const TOKEN_KEY = "freshfold_token"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY)
  }
}

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new ApiError(
      json.message || `Request failed with status ${res.status}`,
      res.status
    )
  }

  return json as T
}

function qs(params: Record<string, string | number | undefined | null>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  )
  if (entries.length === 0) return ""
  return "?" + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
}

// ─── Auth ────────────────────────────────────────────────────────────

export async function login(idToken: string): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  })
}

export async function register(
  idToken: string,
  phone?: string
): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken, phone }),
  })
}

export async function getUser(): Promise<ApiResponse<User>> {
  return request<ApiResponse<User>>("/auth/user")
}

export async function logout(): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>("/auth/logout", {
    method: "POST",
  })
}

// ─── Shops (public) ─────────────────────────────────────────────────

export async function getShops(): Promise<ApiResponse<Shop[]>> {
  return request<ApiResponse<Shop[]>>("/shops")
}

export async function getShopBySlug(slug: string): Promise<ApiResponse<Shop>> {
  return request<ApiResponse<Shop>>(`/shops/${encodeURIComponent(slug)}`)
}

// ─── Categories (public) ─────────────────────────────────────────────

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return request<ApiResponse<Category[]>>("/categories")
}

export async function getCategoryById(id: number): Promise<ApiResponse<Category>> {
  return request<ApiResponse<Category>>(`/categories/${id}`)
}

// ─── Items (public) ──────────────────────────────────────────────────

export async function getItems(categoryId?: number): Promise<ApiResponse<Item[]>> {
  return request<ApiResponse<Item[]>>("/items" + qs({ category_id: categoryId }))
}

// ─── Packages (public) ───────────────────────────────────────────────

export async function getPackages(shopId?: number): Promise<ApiResponse<Package[]>> {
  return request<ApiResponse<Package[]>>("/packages" + qs({ shop_id: shopId }))
}

// ─── Promos (public) ─────────────────────────────────────────────────

export async function getPromos(shopId?: number): Promise<ApiResponse<Promo[]>> {
  return request<ApiResponse<Promo[]>>("/promos" + qs({ shop_id: shopId }))
}

// ─── Subscription Plans (public) ─────────────────────────────────────

export async function getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
  return request<ApiResponse<SubscriptionPlan[]>>("/subscriptions/plans")
}

// ─── Settings (public) ───────────────────────────────────────────────

export async function getSettings(): Promise<ApiResponse<Record<string, string>>> {
  return request<ApiResponse<Record<string, string>>>("/settings")
}

// ─── Customer Profile ────────────────────────────────────────────────

export async function getCustomerProfile(): Promise<ApiResponse<User>> {
  return request<ApiResponse<User>>("/customer/profile")
}

export async function updateCustomerProfile(data: {
  name?: string
  phone?: string
  photo_url?: string
}): Promise<ApiResponse<User>> {
  return request<ApiResponse<User>>("/customer/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// ─── Customer Addresses ──────────────────────────────────────────────

export async function getAddresses(): Promise<ApiResponse<CustomerAddress[]>> {
  return request<ApiResponse<CustomerAddress[]>>("/customer/addresses")
}

export async function createAddress(data: {
  label: string
  line: string
  latitude?: number
  longitude?: number
  is_default?: boolean
}): Promise<ApiResponse<CustomerAddress>> {
  return request<ApiResponse<CustomerAddress>>("/customer/addresses", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateAddress(
  id: number,
  data: {
    label?: string
    line?: string
    latitude?: number
    longitude?: number
    is_default?: boolean
  }
): Promise<ApiResponse<CustomerAddress>> {
  return request<ApiResponse<CustomerAddress>>(`/customer/addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteAddress(id: number): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>(`/customer/addresses/${id}`, {
    method: "DELETE",
  })
}

// ─── Customer Cards ──────────────────────────────────────────────────

export async function getCards(): Promise<ApiResponse<SavedCard[]>> {
  return request<ApiResponse<SavedCard[]>>("/customer/cards")
}

export async function createCard(data: {
  holder_name: string
  last4: string
  expiry: string
  brand: "visa" | "mastercard" | "bank"
}): Promise<ApiResponse<SavedCard>> {
  return request<ApiResponse<SavedCard>>("/customer/cards", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function deleteCard(id: number): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>(`/customer/cards/${id}`, {
    method: "DELETE",
  })
}

// ─── Customer Favorites ──────────────────────────────────────────────

export async function getFavorites(): Promise<ApiResponse<CustomerFavorite[]>> {
  return request<ApiResponse<CustomerFavorite[]>>("/customer/favorites")
}

export async function addFavorite(shopId: number): Promise<ApiResponse<CustomerFavorite>> {
  return request<ApiResponse<CustomerFavorite>>(`/customer/favorites/${shopId}`, {
    method: "POST",
  })
}

export async function removeFavorite(shopId: number): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>(`/customer/favorites/${shopId}`, {
    method: "DELETE",
  })
}

// ─── Vendor Application ──────────────────────────────────────────────

export async function createVendorApplication(data: {
  office_name: string
  office_location?: string
  contact_phone?: string
  contact_whatsapp?: string
  business_description?: string
  plan: "basic" | "pro" | "enterprise"
}): Promise<ApiResponse<VendorApplication>> {
  return request<ApiResponse<VendorApplication>>("/vendor/apply", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ─── Orders ──────────────────────────────────────────────────────────

export async function getOrders(): Promise<ApiResponse<Order[]>> {
  return request<ApiResponse<Order[]>>("/orders")
}

export async function getOrder(id: number): Promise<ApiResponse<Order>> {
  return request<ApiResponse<Order>>(`/orders/${id}`)
}

export async function createOrder(data: {
  shop_id: number
  fulfillment: "delivery" | "self"
  payment_method?: string
  pickup_address?: string
  pickup_day?: string
  pickup_slot?: string
  delivery_address?: string
  delivery_lat?: number
  delivery_lng?: number
  note?: string
  promo_code?: string
  priority?: "standard" | "express"
  items: {
    item_id?: number
    name: string
    qty: number
    unit_price_tzs: number
    line_type: "item" | "package" | "addon"
    package_id?: number
  }[]
  addons?: {
    addon_id?: number
    title: string
    price_tzs: number
  }[]
}): Promise<ApiResponse<Order>> {
  return request<ApiResponse<Order>>("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ─── Reviews ─────────────────────────────────────────────────────────

export async function getShopReviews(shopId: number): Promise<ApiResponse<Review[]>> {
  return request<ApiResponse<Review[]>>(`/shops/${shopId}/reviews`)
}

export async function createReview(
  orderId: number,
  data: { rating: number; comment?: string }
): Promise<ApiResponse<Review>> {
  return request<ApiResponse<Review>>(`/orders/${orderId}/review`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ─── Promo Validation ────────────────────────────────────────────────

export async function validatePromo(
  code: string,
  shopId: number,
  subtotalTzs: number
): Promise<PromoValidationResponse> {
  return request<PromoValidationResponse>("/promos/validate", {
    method: "POST",
    body: JSON.stringify({
      code,
      shop_id: shopId,
      subtotal_tzs: subtotalTzs,
    }),
  })
}

// ─── Notifications ───────────────────────────────────────────────────

export async function getNotifications(): Promise<ApiResponse<Notification[]>> {
  return request<ApiResponse<Notification[]>>("/notifications")
}

export async function markNotificationRead(id: number): Promise<ApiResponse<Notification>> {
  return request<ApiResponse<Notification>>(`/notifications/${id}/read`, {
    method: "PUT",
  })
}

export async function markAllNotificationsRead(): Promise<{
  success: boolean
  message: string
}> {
  return request<{ success: boolean; message: string }>("/notifications/read-all", {
    method: "PUT",
  })
}

// ─── Chat ────────────────────────────────────────────────────────────

export async function getChatThreads(): Promise<ApiResponse<ChatThread[]>> {
  return request<ApiResponse<ChatThread[]>>("/chat/threads")
}

export async function getChatMessages(threadId: number): Promise<ApiResponse<ChatMessage[]>> {
  return request<ApiResponse<ChatMessage[]>>(`/chat/threads/${threadId}`)
}

export async function sendChatMessage(
  threadId: number,
  text: string
): Promise<ApiResponse<ChatMessage>> {
  return request<ApiResponse<ChatMessage>>(`/chat/threads/${threadId}/messages`, {
    method: "POST",
    body: JSON.stringify({ text }),
  })
}

// ─── Vendor Subscription ─────────────────────────────────────────────

export async function getVendorSubscription(): Promise<
  ApiResponse<import("./types").VendorSubscription | null>
> {
  return request<ApiResponse<import("./types").VendorSubscription | null>>(
    "/vendor/subscription"
  )
}

export async function subscribeToPlan(planId: number): Promise<
  ApiResponse<import("./types").VendorSubscription>
> {
  return request<ApiResponse<import("./types").VendorSubscription>>("/vendor/subscribe", {
    method: "POST",
    body: JSON.stringify({ plan_id: planId }),
  })
}
