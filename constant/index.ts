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
  { href: "/sell-products", id: 3, name: "Sell Your Product" },
  { href: "/customer-service", id: 4, name: "Customer Service" },
];

export const categoryFilters = ["Frontend", "Backend", "Full-Stack", "Mobile", "UI/UX", "Game Dev", "DevOps", "Data Science", "Machine Learning", "Cybersecurity", "Blockchain", "E-commerce", "Chatbots"];

export const footerLinks = [
  {
    title: "About Us",
    links: [
      { id: 1, name: "Company Profile ", href: "/about-us" },
      { id: 2, name: "Our Team", href: "/about-us" },
      { id: 3, name: "Our Values", href: "/about-us" },
      { id: 4, name: "Contact Us", href: "/about-us" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { id: 1, name: "Sell on sepetimiz", href: "/sell-products" },
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
    links: ["Example@gmail.com", "123-456-7890", "Lane, Istanbul, Turkey"],
  },
];
