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
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="bagasi,tuker lira etc." defaultValue={defaultValues.q} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={defaultValues.location || ""}>
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </aside>
  );
}
