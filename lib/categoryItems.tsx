import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  name: string;
  title: string;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "fashion",
    title: "Fashion",
  },
  {
    id: 2,
    name: "electronics",
    title: "Electronics",
  },

  {
    id: 1,
    name: "food",
    title: "Food",
  },
  {
    id: 3,
    name: "exchanges",
    title: "Exchange",
  },
  {
    id: 4,
    name: "baggages",
    title: "Baggage",
  },
  {
    id: 5,
    name: "other",
    title: "Other",
  },
];
