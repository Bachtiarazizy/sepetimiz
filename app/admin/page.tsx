import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserWithRole() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch user from the database to get role information
  const userWithRole = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, userRole: true }, // Fetch userRole
  });

  if (!userWithRole) {
    throw new Error("User not found");
  }

  return userWithRole;
}

// Function to fetch user data
async function getUsers() {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      email: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function UsersRoute() {
  noStore();
  const userWithRole = await getUserWithRole();

  if (userWithRole.userRole !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const data = await getUsers();
  return (
    <>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your users and view their details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile Image</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Image alt="User Profile Image" src={user.profileImage || "/default-profile.png"} height={64} width={64} className="rounded-full object-cover h-16 w-16" />
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Intl.DateTimeFormat("en-US").format(user.createdAt)}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/Admin/users/${user.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/Admin/users/${user.id}/delete`}>Delete</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end mt-6">
        <Button asChild className="flex items-center gap-x-2">
          <Link href="/Dashboard/add-user">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add User</span>
          </Link>
        </Button>
      </div>
    </>
  );
}
