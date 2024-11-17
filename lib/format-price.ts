export const formatPrice = (price: number, currency: "IDR" | "USD" | "EUR" = "IDR") => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
  }).format(price);
};
