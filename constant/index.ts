export const NavLinks = [
  { href: "/", id: 0, name: "Home" },
  { href: "/about-us", id: 1, name: "About us" },
  {
    href: "/products/all",
    id: 2,
    name: "Find Product",
    dropdown: [
      { id: 1, name: "fashions", href: "/products/fashion" },
      { id: 2, name: "foods", href: "/products/food" },
      { id: 3, name: "electronics", href: "/products/electronics" },
      { id: 4, name: "baggages", href: "/products/baggages" },
      { id: 4, name: "exchange", href: "/products/exchanges" },
    ],
  },
  { href: "/Dashboard/sell-product", id: 3, name: "Sell Your Product" },
  { href: "/customer-service", id: 4, name: "Customer Service" },
];

export const categoryFilters = [
  { name: "Fashions", href: "/products/fashion" },
  { name: "Electronics", href: "/products/electronics" },
  { name: "Food", href: "/products/food" },
  { name: "Bagages", href: "/products/baggages" },
  { name: "Exchanges", href: "/products/exchanges" },
  { name: "All", href: "/products/all" },
];

export const footerLinks = [
  {
    title: "About Us",
    links: [
      { id: 1, name: "Company Profile ", href: "/about-us" },
      { id: 2, name: "Our Team", href: "/about-us" },
      { id: 3, name: "Our Values", href: "/about-us" },
      { id: 4, name: "Contact Us", href: "/customer-service" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { id: 1, name: "Sell on sepetimiz", href: "Dashboard/sell-product" },
      { id: 2, name: "Buy Products", href: "/products/all" },
      { id: 3, name: "Affiliate program", href: "/customer-service" },
      { id: 4, name: "Advertise your store", href: "/customer-service" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { id: 1, name: "Help Center", href: "/customer-service" },
      { id: 2, name: "Contact Us", href: "/customer-service" },
      { id: 3, name: "FAQs", href: "/customer-service" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { id: 1, name: "sepetimiz.bk@gmail.com", href: "mailto:sepetimiz.bk@gmail.com" },
      { id: 2, name: "+90 555 444 33 22", href: "tel:+905554443322" },
      { id: 3, name: "Lane, Istanbul, Turkey", href: "#" },
    ],
  },
];
