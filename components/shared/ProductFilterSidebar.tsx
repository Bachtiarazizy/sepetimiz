// components/ProductFilterSidebar.tsx
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Select from "./Select";
import { Button } from "../ui/button";
import { productFilterSchema, ProductFilterValues } from "@/lib/zodSchemas";

const validCategories = ["fashion", "electronics", "food", "others", "exchanges", "baggages"] as const;

async function filterProducts(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, location } = productFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location && { location }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface ProductFilterSidebarProps {
  defaultValues: ProductFilterValues;
}

const ProductFilterSidebar = async ({ defaultValues }: ProductFilterSidebarProps) => {
  const distinctLocations = (await prisma.product
    .findMany({
      where: { status: "published" },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) => locations.map(({ location }) => location).filter(Boolean))) as string[];

  return (
    <form action={filterProducts} key={JSON.stringify(defaultValues)} className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-col w-full md:flex-1">
          <Input id="q" name="q" placeholder="Search product..." defaultValue={defaultValues.q} className="w-full" />
        </div>
        <div className="flex flex-col w-full md:flex-1 md:mt-0">
          <Select id="location" name="location" defaultValue={defaultValues.location || ""} className="w-full">
            <option value="">All locations</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        {/* <div className="flex flex-col w-full md:flex-1 md:mt-0">
          <Select id="category" name="category" defaultValue={defaultValues.category || ""} className="w-full">
            <option value="">All categories</option>
            {validCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div> */}
        <Button type="submit" className="">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ProductFilterSidebar;
