import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

async function filterJobs(formData: FormData) {
  "use server";
}

export default function JobFilterSidebar() {
  return (
    <aside className="md:w[260px] sticky top-0 bg-background h-fit rounded-lg  border">
      <form action={filterJobs}>
        <div className="space-y-4">
          <Label>Search</Label>
          <Input />
        </div>
      </form>
    </aside>
  );
}
