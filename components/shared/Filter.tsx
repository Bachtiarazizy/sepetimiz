import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import Select from "./Select";
import { productFilterSchema, ProductFilterValues } from "@/lib/zodSchemas";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { location } = productFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(location && { location }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface ProductFilterSidebarProps {
  defaultValues: ProductFilterValues;
}

export default async function Filter({ defaultValues }: ProductFilterSidebarProps) {
  const distinctLocations = (await prisma.product
    .findMany({
      where: { status: "published" },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) => locations.map(({ location }) => location).filter(Boolean))) as string[];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const form = event.target.form;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <form action={filterJobs} key={JSON.stringify(defaultValues)} className="space-y-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex flex-col w-full md:flex-1 mt-4 md:mt-0">
          <Select id="location" name="location" defaultValue={defaultValues.location || ""} className="w-full" onChange={handleChange}>
            <option value="">All locations</option>
            {distinctLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </form>
  );
}
