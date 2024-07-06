import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Select from "./Select";
import { Button } from "../ui/button";
import { productFilterSchema, ProductFilterValues } from "@/lib/zodSchemas";

async function filterJobs(formData: FormData) {
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

export default async function ProductFilterSidebar({ defaultValues }: ProductFilterSidebarProps) {
  const distinctLocations = (await prisma.product
    .findMany({
      where: { status: "published" },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) => locations.map(({ location }) => location).filter(Boolean))) as string[];

  return (
    <form action={filterJobs} key={JSON.stringify(defaultValues)} className="space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex flex-col w-full md:flex-1">
          <Input id="q" name="q" placeholder="search product.." defaultValue={defaultValues.q} className="w-full" />
        </div>
        <div className="flex flex-col w-full md:flex-1 mt-4 md:mt-0">
          <Select id="location" name="location" defaultValue={defaultValues.location || ""} className="w-full">
            <option value="">All locations</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit" className="mt-4 md:mt-0">
          Submit
        </Button>
      </div>
    </form>
  );
}
